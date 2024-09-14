import { SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import { reaction, runInAction } from 'npm:mobx';
import { log } from '../../../general/modules/log.ts';
import { Agent as AgentMeta, Primitive, Server } from '../../../meta.ts';
import { Supabase } from '../supabase/supabase.ts';
import { Agent_Audio } from './agent_audio.ts';
import { Agent_Store } from './agent_store.ts';

export class Agent_World {
    export static readonly AGENT_WORLD_LOG_PREFIX = '[AGENT_WORLD]';
    private static readonly PRESENCE_UPDATE_INTERVAL = 250;

    static async connectToWorld(data: {
        host: string;
        port: number;
        key: string;
        agentId: string;
        capabilities: {
            useWebRTC: boolean;
        };
    }): Promise<void> {
        if (Agent_Store.worldConnection) {
            log({
                message:
                    `${Agent_World.AGENT_WORLD_LOG_PREFIX} Already connected to a world`,
                type: 'warn',
            });
            return;
        }

        Agent_Store.useWebRTC = data.capabilities.useWebRTC;

        try {
            const serverConfigAndStatus = await Agent_World
                .fetchServerConfigAndStatus(data);
            const supabaseClient = Supabase.initializeSupabaseClient(
                `${data.host}:${data.port}${serverConfigAndStatus.API_URL}`,
                data.key,
            );

            const newWorldConnection: AgentMeta.I_AgentWorldConnection = {
                host: data.host,
                port: data.port,
                supabaseClient,
                agentPeerConnections: {},
                presenceUpdateInterval: null,
                presence: new AgentMeta.C_Metadata({
                    agentId: data.agentId,
                    position: new Primitive.C_Vector3(),
                    orientation: new Primitive.C_Vector3(),
                    onlineAt: new Date().toISOString(),
                }),
                audioContext: Agent_Audio.createAudioContext(),
            }

            runInAction(() => {
                Agent_Store.worldConnection = newWorldConnection;
            });

            if (Agent_Store.worldConnection) {
                await AgentToAgent.SetupSendUpdateIntervals(supabaseClient);
                await AgentToAgent.SetupReceiveUpdateIntervals(supabaseClient);

                if (Agent_Store.useWebRTC) {
                    await AgentToAgent.initializeSignaling(supabaseClient);
                }

                Agent_Store.worldConnection.presenceUpdateInterval =
                    setInterval(
                        () => {
                            void Agent_World.updatePresence(
                                Agent_Store.worldConnection!.presence,
                            );
                        },
                        Agent_World.PRESENCE_UPDATE_INTERVAL,
                    );

                log({
                    message:
                        `${Agent_World.AGENT_WORLD_LOG_PREFIX} Connected to world`,
                    type: 'info',
                });
            }
        } catch (error) {
            log({
                message:
                    `${Agent_World.AGENT_WORLD_LOG_PREFIX} Failed to connect to world: ${error}`,
                type: 'error',
            });
        }
    }

    static async disconnectFromWorld(): Promise<void> {
        const world = Agent_Store.worldConnection;
        if (world) {
            if (world.presenceUpdateInterval) {
                clearInterval(world.presenceUpdateInterval);
            }
            Object.keys(world.agentPeerConnections).forEach((agentId) => {
                Agent_World.removeAgent(agentId);
            });
            await world.supabaseClient?.removeAllChannels();
            if (world.audioContext) {
                await world.audioContext.close();
            }
            runInAction(() => {
                Agent_Store.worldConnection = null;
            });

            await AgentToAgent.deinitializePresence();
            if (Agent_Store.useWebRTC) {
                await AgentToAgent.deinitializeSignaling();
            }

            log({
                message:
                    `${Agent_World.AGENT_WORLD_LOG_PREFIX} Disconnected from world`,
                type: 'info',
            });
        }
    }

    static updateId(agentId: string): void {
        const world = Agent_Store.worldConnection;
        if (world?.presence) {
            runInAction(() => {
                world.presence.agentId = agentId;
            });
            void Agent_World.updatePresence(world.presence);
        }
    }

    static updatePosition(data: {
        newPosition: Primitive.C_Vector3;
    }): void {
        const world = Agent_Store.worldConnection;
        if (world?.presence) {
            runInAction(() => {
                world.presence.position = data.newPosition;
            });
            void Agent_World.updatePresence(world.presence);
        }
    }

    static updateOrientation(data: {
        newOrientation: Primitive.C_Vector3;
    }): void {
        const world = Agent_Store.worldConnection;
        if (world?.presence) {
            runInAction(() => {
                world.presence.orientation = data.newOrientation;
            });
            void Agent_World.updatePresence(world.presence);
        }
    }

    private static async fetchServerConfigAndStatus(
        data: { host: string; port: number },
    ): Promise<Server.I_REQUEST_ConfigAndStatusResponse> {
        const response = await fetch(
            `${data.host}:${data.port}${Server.E_HTTPRequestPath.CONFIG_AND_STATUS}`,
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    private static async updatePresence(
        presence: AgentMeta.C_Metadata,
    ): Promise<void> {
        const world = Agent_Store.worldConnection;
        if (!world || !world.supabaseClient) return;

        const presenceChannel = world.supabaseClient.channel(
            AgentMeta.E_ChannelType.AGENT_METADATA,
        );
        await presenceChannel.track(presence);
    }

    static async createAgent(
        agentId: string,
        metadata: AgentMeta.C_Metadata,
    ): Promise<void> {
        const world = Agent_Store.worldConnection;
        if (!world) {
            return;
        }

        const connection: AgentMeta.I_AgentPeerConnection = {
            rtcConnection: null,
            rtcConnectionOffer: null,
            rtcConnectionAnswer: null,
            rtcConnectionIceCandidate: null,
            rtcDataChannel: null,
            incomingAudioMediaStream: null,
            presence: metadata,
            panner: null,
        }

        if (Agent_Store.useWebRTC) {
            try {
                WebRTC.establishConnection({ connection });
            } catch (error) {
                // lol
            }
        }

        runInAction(() => {
            world.agentPeerConnections[agentId] = connection;
        });

        log({
            message:
                `${Agent_World.AGENT_WORLD_LOG_PREFIX} Created agent ${agentId}`,
            type: 'info',
        });
    }

    static removeAgent(agentId: string): void {
        const world = Agent_Store.worldConnection;
        if (!world) {
            return;
        }

        const connection = world.agentPeerConnections[agentId];
        if (connection) {
            if (connection.rtcConnection) {
                connection.rtcConnection.close();
            }
            runInAction(() => {
                delete world.agentPeerConnections[agentId];
            });
            log({
                message:
                    `${Agent_World.AGENT_WORLD_LOG_PREFIX} Removed agent ${agentId}`,
                type: 'info',
            });
        }
    }

    static WebRTC = class {
        static readonly WEBRTC_LOG_PREFIX = Agent_World.AGENT_WORLD_LOG_PREFIX + '[WEBRTC]';

        static async establishConnection(
            agentId: string,
            metadata: AgentMeta.C_Metadata,
        ): Promise<AgentMeta.I_AgentPeerConnection> {
            const world = Agent_Store.worldConnection;
            if (!world) {
                throw new Error('No world connection available');
            }
        
            let connection = world.agentPeerConnections[agentId];
            if (connection && (connection.rtcConnection || connection.rtcConnectionOffer || connection.rtcConnectionAnswer || connection.rtcConnectionIceCandidate)) {
                log({
                    message: `${this.WEBRTC_LOG_PREFIX} Connection already exists or is pending for agent ${agentId}`,
                    type: 'warn',
                });
                return connection;
            }
        
            const rtcConnection = new RTCPeerConnection({
                iceServers: Agent_Store.iceServers,
            });
            const rtcDataChannel = rtcConnection.createDataChannel('data')
        
            connection = {
                rtcConnection,
                rtcConnectionOffer: null,
                rtcConnectionAnswer: null,
                rtcConnectionIceCandidate: null,
                rtcDataChannel,
                incomingAudioMediaStream: null,
                presence: metadata,
                panner: null,
            };
        
            this.setupRTCEventListeners(agentId, connection);
        
            runInAction(() => {
                world.agentPeerConnections[agentId] = connection;
            });
        
            await this.createAndSendOffer(agentId, connection);
        
            return connection;
        }

        static setupRTCEventListeners(
            agentId: string,
            connection: AgentMeta.I_AgentPeerConnection,
        ) {
            if (!connection || !connection.rtcConnection) return;

            connection.rtcConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    this.sendWebRTCSignal({
                        type: AgentMeta.E_SignalType.AGENT_ICE_Candidate,
                        payload: event.candidate,
                        targetAgentId: agentId,
                    });
                }
            };

            connection.rtcConnection.ontrack = (event) =>
                this.handleIncomingStream(agentId, event.streams[0]);
            connection.rtcConnection.onnegotiationneeded = () =>
                this.createAndSendOffer(agentId, connection);

            this.setupDataChannelListeners(
                connection.rtcDataChannel,
                () =>
                    log({
                        message:
                            `${this.WEBRTC_LOG_PREFIX} Data channel opened with agent ${agentId}`,
                        type: 'info',
                    }),
                () =>
                    log({
                        message:
                            `${this.WEBRTC_LOG_PREFIX} Data channel closed with agent ${agentId}`,
                        type: 'info',
                    }),
                (event) => this.handleDataChannelMessage(agentId, event),
            );
        }

        static async createAndSendOffer(
            agentId: string,
            connection: AgentMeta.I_AgentPeerConnection,
        ) {
            if (!connection || !connection.rtcConnection) return;

            try {
                const offer = await this.createOffer(connection.rtcConnection);
                await this.sendWebRTCSignal({
                    type: AgentMeta.E_SignalType.AGENT_Offer,
                    payload: offer,
                    targetAgentId: agentId,
                });
            } catch (error) {
                log({
                    message:
                        `${this.WEBRTC_LOG_PREFIX} Error creating and sending offer: ${error}`,
                    type: 'error',
                });
            }
        }

        static async createOffer(
            rtcConnection: RTCPeerConnection,
        ): Promise<RTCSessionDescriptionInit> {
            const offer = await rtcConnection.createOffer();
            await rtcConnection.setLocalDescription(offer);
            return offer;
        }

        static async sendWebRTCSignal(signal: {
            type: AgentMeta.E_SignalType;
            payload:
                | RTCSessionDescriptionInit
                | RTCIceCandidateInit
                | RTCIceCandidate;
            targetAgentId: string;
        }) {
            const world = Agent_Store.worldConnection;
            if (!world) return;

            try {
                await world.supabaseClient?.channel(
                    AgentMeta.E_ChannelType.SIGNALING_CHANNEL,
                )
                    .send({
                        type: 'broadcast',
                        event: signal.type,
                        payload: signal,
                    });
            } catch (error) {
                log({
                    message:
                        `${this.WEBRTC_LOG_PREFIX} Error sending WebRTC signal: ${error}`,
                    type: 'error',
                });
            }
        }

        static async handleIncomingStream(
            agentId: string,
            stream: MediaStream,
        ) {
            const world = Agent_Store.worldConnection;
            if (!world || !world.audioContext) return;

            const connection = world.agentPeerConnections[agentId];
            if (!connection) return;

            connection.mediaStream = stream;

            try {
                await Agent_Audio.resumeAudioContext(world.audioContext);
                const panner = Agent_Audio.createPanner(world.audioContext);
                connection.panner = panner;

                Agent_Audio.setupIncomingAudio(world.audioContext, stream, panner);

                connection.audioUpdateInterval = setInterval(() => {
                    Agent_World.updateAgentAudioPosition(agentId);
                }, 100); // Update interval

                log({
                    message:
                        `${this.WEBRTC_LOG_PREFIX} Set up incoming audio for agent ${agentId}`,
                    type: 'info',
                });
            } catch (error) {
                log({
                    message:
                        `${this.WEBRTC_LOG_PREFIX} Error setting up incoming audio: ${error}`,
                    type: 'error',
                });
            }
        }

        static handleDataChannelMessage(agentId: string, event: MessageEvent) {
            // Handle incoming data channel messages
            log({
                message:
                    `${this.WEBRTC_LOG_PREFIX} Received message from agent ${agentId}: ${event.data}`,
                type: 'info',
            });
            // Implement your logic for handling different types of messages here
        }

        static setupDataChannelListeners(
            dataChannel: RTCDataChannel | null,
            onOpen: () => void,
            onClose: () => void,
            onMessage: (event: MessageEvent) => void,
        ) {
            if (dataChannel) {
                dataChannel.onopen = onOpen;
                dataChannel.onclose = onClose;
                dataChannel.onmessage = onMessage;
            }
        }

        static async setAudioStreamToConnection(data: {
            constraints?: MediaStreamConstraints;
            rtcPeerConnnection: RTCPeerConnection;
        }) {
            const mediaStream = await navigator.mediaDevices.getUserMedia(
                data.constraints,
            );

            if (mediaStream) {
                mediaStream.getTracks().forEach((track) => {
                    data.rtcPeerConnnection.addTrack(track, mediaStream);
                });
            }
        }

        static addLocalStreamsToConnection(
            agentId: string,
            connection: AgentMeta.I_AgentPeerConnection,
        ) {
            if (!connection || !connection.rtcConnection) return;

            if (Agent_Store.localAudioMediaStream) {
                this.addStreamToConnection(
                    connection.rtcConnection,
                    Agent_Store.localAudioMediaStream,
                );
            }
            // Add other local streams if needed
        }

        static addStreamToConnection(
            rtcConnection: RTCPeerConnection,
            stream: MediaStream,
        ) {
            stream.getTracks().forEach((track) => {
                rtcConnection.addTrack(track, stream);
            });
        }

        static async createAndSendOffer(
            agentId: string,
            connection: AgentMeta.I_AgentPeerConnection,
        ) {
            if (!connection || !connection.rtcConnection) return;

            try {
                const offer = await this.createOffer(connection.rtcConnection);
                await this.sendWebRTCSignal({
                    type: AgentMeta.E_SignalType.AGENT_Offer,
                    payload: offer,
                    targetAgentId: agentId,
                });
            } catch (error) {
                log({
                    message:
                        `${Agent_World.AGENT_WORLD_LOG_PREFIX} Error creating and sending offer: ${error}`,
                    type: 'error',
                });
            }
        }

        static removeAgentConnection(
            agentId: string,
            connection: AgentMeta.I_AgentPeerConnection,
        ) {
            if (connection.rtcConnection) {
                this.closeRTCConnection(connection.rtcConnection);
            }
            if (connection.rtcDataChannel) {
                connection.rtcDataChannel.close();
            }
            if (connection.mediaStream) {
                connection.mediaStream.getTracks().forEach((track) => track.stop());
            }
            if (connection.panner) {
                Agent_Audio.cleanupAudio(connection.panner);
            }
            if (connection.audioUpdateInterval) {
                clearInterval(connection.audioUpdateInterval);
            }
        }

        static async handleWebRTCOffer(
            data: { offer: RTCSessionDescriptionInit; fromAgentId: string },
            connection: AgentMeta.I_AgentPeerConnection,
        ) {
            const { offer, fromAgentId } = data;
            if (!connection || !connection.rtcConnection) return;

            try {
                const answer = await this.handleOffer(connection.rtcConnection, offer);
                await this.sendWebRTCSignal({
                    type: AgentMeta.E_SignalType.AGENT_Answer,
                    payload: answer,
                    targetAgentId: fromAgentId,
                });
            } catch (error) {
                log({
                    message:
                        `${Agent_World.AGENT_WORLD_LOG_PREFIX} Error handling WebRTC offer: ${error}`,
                    type: 'error',
                });
            }
        }

        static async handleWebRTCAnswer(
            data: { answer: RTCSessionDescriptionInit; fromAgentId: string },
            connection: AgentMeta.I_AgentPeerConnection,
        ) {
            const { answer } = data;
            if (!connection || !connection.rtcConnection) return;

            try {
                await this.handleAnswer(connection.rtcConnection, answer);
            } catch (error) {
                log({
                    message:
                        `${Agent_World.AGENT_WORLD_LOG_PREFIX} Error handling WebRTC answer: ${error}`,
                    type: 'error',
                });
            }
        }

        static async handleWebRTCIceCandidate(
            data: { candidate: RTCIceCandidateInit; fromAgentId: string },
            connection: AgentMeta.I_AgentPeerConnection,
        ) {
            const { candidate } = data;
            if (!connection || !connection.rtcConnection) return;

            try {
                await this.handleIceCandidate(connection.rtcConnection, candidate);
            } catch (error) {
                log({
                    message:
                        `${Agent_World.AGENT_WORLD_LOG_PREFIX} Error handling ICE candidate: ${error}`,
                    type: 'error',
                });
            }
        }

        static async createOffer(
            rtcConnection: RTCPeerConnection,
        ): Promise<RTCSessionDescriptionInit> {
            const offer = await rtcConnection.createOffer();
            await rtcConnection.setLocalDescription(offer);
            return offer;
        }

        static async handleOffer(
            rtcConnection: RTCPeerConnection,
            offer: RTCSessionDescriptionInit,
        ): Promise<RTCSessionDescriptionInit> {
            await rtcConnection.setRemoteDescription(
                new RTCSessionDescription(offer),
            );
            const answer = await rtcConnection.createAnswer();
            await rtcConnection.setLocalDescription(answer);
            return answer;
        }

        static async handleAnswer(
            rtcConnection: RTCPeerConnection,
            answer: RTCSessionDescriptionInit,
        ): Promise<void> {
            await rtcConnection.setRemoteDescription(
                new RTCSessionDescription(answer),
            );
        }

        static async handleIceCandidate(
            rtcConnection: RTCPeerConnection,
            candidate: RTCIceCandidateInit,
        ): Promise<void> {
            await rtcConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }

        static closeRTCConnection(rtcConnection: RTCPeerConnection): void {
            rtcConnection.close();
        }

        static async sendWebRTCSignal(signal: {
            type: AgentMeta.E_SignalType;
            payload:
                | RTCSessionDescriptionInit
                | RTCIceCandidateInit
                | RTCIceCandidate;
            targetAgentId: string;
        }) {
            const world = Agent_Store.worldConnection;
            if (!world) return;

            try {
                await world.supabaseClient?.channel(
                    AgentMeta.E_ChannelType.SIGNALING_CHANNEL,
                )
                    .send({
                        type: 'broadcast',
                        event: signal.type,
                        payload: signal,
                    });
            } catch (error) {
                log({
                    message:
                        `${Agent_World.AGENT_WORLD_LOG_PREFIX} Error sending WebRTC signal: ${error}`,
                    type: 'error',
                });
            }
        }

        static async handleIncomingStream(
            agentId: string,
            stream: MediaStream,
        ) {
            const world = Agent_Store.worldConnection;
            if (!world || !world.audioContext) return;

            const connection = world.agentPeerConnections[agentId];
            if (!connection) return;

            connection.mediaStream = stream;

            try {
                await Agent_Audio.resumeAudioContext(world.audioContext);
                const panner = Agent_Audio.createPanner(world.audioContext);
                connection.panner = panner;

                Agent_Audio.setupIncomingAudio(world.audioContext, stream, panner);

                connection.audioUpdateInterval = setInterval(() => {
                    Agent_World.updateAgentAudioPosition(agentId);
                }, 100); // Update interval

                log({
                    message:
                        `${Agent_World.AGENT_WORLD_LOG_PREFIX} Set up incoming audio for agent ${agentId}`,
                    type: 'info',
                });
            } catch (error) {
                log({
                    message:
                        `${Agent_World.AGENT_WORLD_LOG_PREFIX} Error setting up incoming audio: ${error}`,
                    type: 'error',
                });
            }
        }

        static handleDataChannelMessage(agentId: string, event: MessageEvent) {
            // Handle incoming data channel messages
            log({
                message:
                    `${Agent_World.AGENT_WORLD_LOG_PREFIX} Received message from agent ${agentId}: ${event.data}`,
                type: 'info',
            });
            // Implement your logic for handling different types of messages here
        }
    }
}
    

export namespace AgentToAgent {
    export async function initializePresence(supabaseClient: SupabaseClient) {
        // Placeholder for initializing presence
    }

    export async function initializeSignaling(supabaseClient: SupabaseClient) {
        // Placeholder for initializing signaling
    }

    export async function SetupSendUpdateIntervals(supabaseClient: SupabaseClient) {
        // Placeholder for setting up send update intervals
    }

    export async function SetupReceiveUpdateIntervals(supabaseClient: SupabaseClient) {
        // Placeholder for setting up receive update intervals
    }

    export async function deinitializePresence() {
        // Placeholder for deinitializing presence
    }

    export async function deinitializeSignaling() {
        // Placeholder for deinitializing signaling
    }
}

// Set up reactions
reaction(
    () => Agent_Store.worldConnection,
    (worldConnection) => {
        if (worldConnection) {
            console.log(
                `Connected to world: ${worldConnection.host}:${worldConnection.port}`,
            );
        } else {
            console.log('Disconnected from world');
        }
    },
);

reaction(
    () => {
        const agentCount = Agent_Store.worldConnection
            ? Object.keys(Agent_Store.worldConnection.agentPeerConnections)
                .length
            : 0;
        return agentCount;
    },
    (agentCount) => {
        console.log(`Agent count changed: ${agentCount}`);
    },
);

reaction(
    () => Agent_Store.localAudioMediaStream,
    (stream) => {
        if (stream) {
            console.log('Local audio media stream updated');
        } else {
            console.log('Local audio media stream removed');
        }
    },
);

// TODO: This should be part of a watcher, so if an agent peer connection updates its presence and we have audio on it, we will update the audio panner and such locally so we can spatialize their audio.

// static updateAgentAudioPosition(agentId: string): void {
//     const world = Agent_Store.worldConnection;
//     if (!world || !world.audioContext) {
//         return;
//     }

//     const connection = world.agentPeerConnections[agentId];
//     if (!connection || !connection.panner || !connection.presence) {
//         return;
//     }

//     const agentPosition = connection.presence.position;
//     const agentOrientation = connection.presence.orientation;

//     Agent_Audio.updateAudioPosition(
//         connection.panner,
//         world.audioContext,
//         {
//             x: agentPosition.x - world.presence.position.x,
//             y: agentPosition.y - world.presence.position.y,
//             z: agentPosition.z - world.presence.position.z,
//         },
//         {
//             x: agentOrientation.x - world.presence.orientation.x,
//             y: agentOrientation.y - world.presence.orientation.y,
//             z: agentOrientation.z - world.presence.orientation.z,
//         },
//     );
// }