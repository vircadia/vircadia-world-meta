import { SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import { reaction, runInAction } from 'npm:mobx';
import { log } from '../../../general/modules/log.ts';
import { Agent as AgentMeta, Primitive, Server } from '../../../meta.ts';
import { Supabase } from '../supabase/supabase.ts';
import { Agent_Store } from './agent_store.ts';
import { Agent_Audio } from './helpers/agent_helpers_audio.ts';
import { Agent_WebRTC } from './helpers/agent_helpers_webRTC.ts';

export class Agent_World {
    static readonly AGENT_WORLD_LOG_PREFIX = '[AGENT_WORLD]';

    static readonly worldConnected = () => Agent_Store.world !== null;

    static async connectToWorld(data: {
        host: string;
        port: number;
        key: string;
        agentId: string;
        capabilities: {
            useWebRTC: boolean;
            useWebAudio: boolean;
        };
    }): Promise<void> {
        if (Agent_Store.world) {
            throw new Error(`${Agent_World.AGENT_WORLD_LOG_PREFIX} Already connected to a world`);
        }

        Agent_Store.useWebRTC = data.capabilities.useWebRTC;
        Agent_Store.useWebAudio = data.capabilities.useWebAudio;

        let serverConfigAndStatus: Server.I_REQUEST_ConfigAndStatusResponse;
        try {
            serverConfigAndStatus = await Agent_World
                .getStatus({
                    host: data.host,
                    port: data.port,
                });
        } catch (error) {
            throw new Error(
                `Failed to get server status: ${error}`,
            );
        }

        let supabaseClient: SupabaseClient | null = null;
        try {
            supabaseClient = Supabase.createClient(
                `${data.host}:${data.port}${serverConfigAndStatus.API_URL}`,
                data.key,
            );
        } catch (error) {
            throw new Error(
                `Failed to initialize Supabase client: ${error}`,
            );
        }

        runInAction(() => {
            Agent_Store.world = {
                host: data.host,
                port: data.port,
                supabaseClient,
                agentPeerConnections: {},
                presence: new AgentMeta.C_Presence({
                    agentId: data.agentId,
                    position: new Primitive.C_Vector3(),
                    orientation: new Primitive.C_Vector3(),
                    lastUpdated: new Date().toISOString(),
                }),
                audioContext: Agent_Store.useWebAudio ? null : Agent_Audio.createAudioContext(),
            };
        });

        if (Agent_Store.world) {
            Agent_World.subscribeToWorld();
        } else {
            throw new Error(
                'No world connection available, failed to create object in store.',
            );
        }

        log({
            message: `${Agent_World.AGENT_WORLD_LOG_PREFIX} Connected to world`,
            type: 'info',
        });
    }

    static async disconnectFromWorld(): Promise<void> {
        const world = Agent_Store.world;
        if (world) {
            Object.keys(world.agentPeerConnections).forEach((agentId) => {
                Agent_World.Peer.removeAgent({
                    agentId,
                });
            });
            if (world.supabaseClient) {
                world.supabaseClient = Supabase.destroyClient(world.supabaseClient);
            }
            if (world.audioContext) {
                await Agent_Audio.destroyAudioContext(world.audioContext);
            }
            runInAction(() => {
                Agent_Store.world = null;
            });

            Agent_Store.world = null;

            log({
                message:
                    `${Agent_World.AGENT_WORLD_LOG_PREFIX} Disconnected from world`,
                type: 'info',
            });
        }
    }

    static subscribeToWorld(): void {
        if (!Agent_Store.world?.supabaseClient) {
            console.error('Supabase client not initialized');
            return;
        }

        const supabase = Agent_Store.world.supabaseClient;

        // Subscribe to Postgres Changes
        Object.values(AgentMeta.E_Realtime_Postgres_TableChannel).forEach(
            (table) => {
                supabase.channel(`postgres_changes:${table}`)
                    .on(
                        'postgres_changes',
                        { event: '*', schema: 'public', table: table },
                        (payload) => {
                            console.log(`${table} change:`, payload);
                            // Handle table changes
                        },
                    )
                    .subscribe();
            },
        );

        // Subscribe to Presence
        supabase.channel(AgentMeta.E_Realtime_PresenceChannel.AGENT_PRESENCE)
            .on('presence', { event: 'sync' }, () => {
                // FIXME: This probably won't work as-is, check it later.
                const state = supabase.channel(
                    AgentMeta.E_Realtime_PresenceChannel.AGENT_PRESENCE,
                ).presenceState();
                const currentTimestamp = new Date().toISOString();
                Object.entries(state).forEach(([agentId, presenceData]) => {
                    if (Agent_Store.world?.agentPeerConnections[agentId]) {
                        const meta = presenceData.metas[0]; // Assuming we use the first meta entry
                        Agent_Store.world.agentPeerConnections[agentId].presence = new AgentMeta.C_Presence({
                            agentId,
                            position: meta.position || new Primitive.C_Vector3(),
                            orientation: meta.orientation || new Primitive.C_Vector3(),
                            lastUpdated: currentTimestamp
                        });
                    }
                });
                console.log('Presence sync event data:', event);
                console.log('Presence state updated at:', currentTimestamp);
            })
            .on('presence', { event: 'join' }, ({ key, newPresences }) => {
                newPresences.forEach((presence) => {
                    log({
                        message: `${Agent_World.AGENT_WORLD_LOG_PREFIX} Agent joined: ${presence.agentId}`,
                        type: 'info',
                    });
                    Agent_World.Peer.createAgent({
                        agentId: presence.agentId,
                    });
                });
            })
            .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
                leftPresences.forEach((presence) => {
                    log({
                        message: `${Agent_World.AGENT_WORLD_LOG_PREFIX} Agent left: ${presence.agentId}`,
                        type: 'info',
                    });
                    Agent_World.Peer.removeAgent({
                        agentId: presence.agentId,
                    });
                });
            })
            .subscribe();

        console.log(`${Agent_World.AGENT_WORLD_LOG_PREFIX} Subscribed to world channels`);
    }

    private static async getStatus(
        data: { host: string; port: number },
    ): Promise<Server.I_REQUEST_ConfigAndStatusResponse> {
        log({
            message: `${Agent_World.AGENT_WORLD_LOG_PREFIX} Getting status ${data.host}:${data.port}`,
            type: 'info',
        });
        const response = await fetch(
            `${data.host}:${data.port}${Server.E_HTTPRequestPath.CONFIG_AND_STATUS}`,
        );
        log({
            message: `${Agent_World.AGENT_WORLD_LOG_PREFIX} Status response: ${response}`,
            type: 'debug',
        });
        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
        return await response.json();
    }

    static updateAudioPanners(agentId?: string): void {
        const world = Agent_Store.world;
        if (!world) return;

        if (agentId) {
            // Update specific agent's audio panner
            const connection = world.agentPeerConnections[agentId];
            if (connection && connection.incomingAudioMediaPanner && connection.presence && world.audioContext) {
                const agentPosition = connection.presence.position;
                const agentOrientation = connection.presence.orientation;
                Agent_Audio.updateAudioPannerPosition(
                    connection.incomingAudioMediaPanner,
                    world.audioContext,
                    {
                        x: agentPosition.x - world.presence.position.x,
                        y: agentPosition.y - world.presence.position.y,
                        z: agentPosition.z - world.presence.position.z,
                    },
                    {
                        x: agentOrientation.x - world.presence.orientation.x,
                        y: agentOrientation.y - world.presence.orientation.y,
                        z: agentOrientation.z - world.presence.orientation.z,
                    },
                );
            }
        } else {
            // Update all agents' audio panners relative to the local agent
            Object.keys(world.agentPeerConnections).forEach((id) => {
                const connection = world.agentPeerConnections[id];
                if (connection && connection.incomingAudioMediaPanner && connection.presence && world.audioContext) {
                    const agentPosition = connection.presence.position;
                    const agentOrientation = connection.presence.orientation;
                    Agent_Audio.updateAudioPannerPosition(
                        connection.incomingAudioMediaPanner,
                        world.audioContext,
                        {
                            x: agentPosition.x - world.presence.position.x,
                            y: agentPosition.y - world.presence.position.y,
                            z: agentPosition.z - world.presence.position.z,
                        },
                        {
                            x: agentOrientation.x - world.presence.orientation.x,
                            y: agentOrientation.y - world.presence.orientation.y,
                            z: agentOrientation.z - world.presence.orientation.z,
                        },
                    );
                }
            });
        }
    }

    static updateId(agentId: string): void {
        const world = Agent_Store.world;
        if (world?.presence) {
            runInAction(() => {
                world.presence.agentId = agentId;
            });
            void this.pushPresence();
        }
    }

    static updatePosition(data: {
        newPosition: Primitive.C_Vector3;
    }): void {
        const world = Agent_Store.world;
        if (world?.presence) {
            runInAction(() => {
                world.presence.position = data.newPosition;
            });
            void this.pushPresence();
        }
    }

    static updateOrientation(data: {
        newOrientation: Primitive.C_Vector3;
    }): void {
        const world = Agent_Store.world;
        if (world?.presence) {
            runInAction(() => {
                world.presence.orientation = data.newOrientation;
            });
            void this.pushPresence();
        }
    }

    private static async pushPresence(): Promise<void> {
        const world = Agent_Store.world;
        try {
            if (world?.presence) {
                await world.supabaseClient?.channel(
                    AgentMeta.E_Realtime_PresenceChannel.AGENT_PRESENCE,
                )?.send({
                    type: 'presence',
                    event: JSON.stringify(world.presence),
                });
            } else {
                log({
                    message:
                        `${Agent_World.AGENT_WORLD_LOG_PREFIX} No presence to push`,
                    type: 'warn',
                });
            }
        } catch (error) {
            log({
                message:
                    `${Agent_World.AGENT_WORLD_LOG_PREFIX} Failed to push presence: ${error}`,
                type: 'error',
            });
        }
    }

    static Peer = class {
        static createAgent(data: {
            agentId: string;
            presence?: AgentMeta.C_Presence;
        }): void {
            const world = Agent_Store.world;
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
                presence: data.presence ?? new AgentMeta.C_Presence({
                    agentId: data.agentId,
                    position: new Primitive.C_Vector3(),
                    orientation: new Primitive.C_Vector3(),
                    lastUpdated: new Date().toISOString(),
                }),
                incomingAudioMediaPanner: null,
            };
    
            if (Agent_Store.useWebRTC) {
                try {
                    Agent_World.Peer.establishWebRTCPeerConnection(data.agentId);
                } catch (error) {
                    log({
                        message:
                            `${Agent_World.AGENT_WORLD_LOG_PREFIX} Failed to establish WebRTC peer connection for agent ${data.agentId}: ${error}`,
                        type: 'error',
                    });
                }
            }
    
            runInAction(() => {
                world.agentPeerConnections[data.agentId] = connection;
            });
    
            log({
                message:
                    `${Agent_World.AGENT_WORLD_LOG_PREFIX} Created agent ${data.agentId}`,
                type: 'info',
            });
        }
    
        static removeAgent(data: {
            agentId: string;
        }): void {
            const world = Agent_Store.world;
            if (!world) {
                return;
            }
    
            const connection = world.agentPeerConnections[data.agentId];
            if (connection) {
                if (connection.rtcConnection) {
                    Agent_WebRTC.deinitConnection(connection);
                }
                runInAction(() => {
                    delete world.agentPeerConnections[data.agentId];
                });
                log({
                    message:
                        `${Agent_World.AGENT_WORLD_LOG_PREFIX} Removed agent ${data.agentId}`,
                    type: 'info',
                });
            }
        }

        static sendWebRTCSignal = async (data: {
            type: AgentMeta.WebRTC.E_SignalType;
            payload:
                | RTCSessionDescriptionInit
                | RTCIceCandidateInit
                | RTCIceCandidate;
            targetAgentId: string;
        }) => {
            const world = Agent_Store.world;
            if (!world) return;

            try {
                await world.supabaseClient?.channel(
                    AgentMeta.E_Realtime_BroadcastChannel.AGENT_SIGNAL,
                )
                    .send({
                        type: 'broadcast',
                        event: data.type,
                        payload: data.payload,
                    });
            } catch (error) {
                log({
                    message:
                        `${Agent_WebRTC.AGENT_WEBRTC_LOG_PREFIX} Error sending WebRTC signal: ${error}`,
                    type: 'error',
                });
            }
        };

        static updateAudioPosition(agentId: string): void {
            if (!Agent_Store.useWebAudio) {
                return;
            }

            const world = Agent_Store.world;
            if (!world || !world.audioContext) {
                return;
            }

            const connection = world.agentPeerConnections[agentId];
            if (
                !connection || !connection.incomingAudioMediaPanner ||
                !connection.presence
            ) {
                return;
            }

            const agentPosition = connection.presence.position;
            const agentOrientation = connection.presence.orientation;


            Agent_Audio.updateAudioPannerPosition(
                connection.incomingAudioMediaPanner,
                world.audioContext,
                {
                    x: agentPosition.x - world.presence.position.x,
                    y: agentPosition.y - world.presence.position.y,
                    z: agentPosition.z - world.presence.position.z,
                },
                {
                    x: agentOrientation.x - world.presence.orientation.x,
                    y: agentOrientation.y - world.presence.orientation.y,
                    z: agentOrientation.z - world.presence.orientation.z,
                },
            );
        }

        static async attachIncomingAudioMediaStream(data: {
            agentId: string;
            stream: MediaStream;
        }): Promise<void> {
            const world = Agent_Store.world;
            if (!world) {
                throw new Error('World not found');
            }

            const connection = world.agentPeerConnections[data.agentId];
            if (!connection) {
                throw new Error('Connection not found');
            }

            if (!world.audioContext) {
                throw new Error('Audio context not found');
            } else if (world.audioContext.state === 'closed') {
                throw new Error('Audio context is closed');
            }

            if (world.audioContext.state === 'suspended') {
                await Agent_Audio.resumeAudioContext(world.audioContext);
            }

            if (connection.incomingAudioMediaPanner) {
                Agent_Audio.removeIncomingAudioStream(
                    connection.incomingAudioMediaPanner,
                );
                log({
                    message:
                        `${Agent_WebRTC.AGENT_WEBRTC_LOG_PREFIX} Removed incoming audio stream for agent ${data.agentId} because a new stream was received and is being added now.`,
                    type: 'debug',
                });
            }
            connection.incomingAudioMediaPanner = Agent_Audio
                .addIncomingAudioStream({
                    audioContext: world.audioContext,
                    mediaStream: data.stream,
                    pannerOptions: AgentMeta.Audio.DEFAULT_PANNER_OPTIONS,
                });

            log({
                message:
                    `${Agent_WebRTC.AGENT_WEBRTC_LOG_PREFIX} Set up incoming audio for agent ${data.agentId}`,
                type: 'info',
            });
        }

        static establishWebRTCPeerConnection(agentId: string): void {
            const world = Agent_Store.world;
            if (!world) {
                throw new Error('No world connection available');
            }

            const connection = world.agentPeerConnections[agentId];

            if (!connection.rtcConnection) {
                connection.rtcConnection = Agent_WebRTC.createPeerConnection(
                    Agent_Store.iceServers,
                );
            }

            connection.rtcConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    this.sendWebRTCSignal({
                        type: AgentMeta.WebRTC.E_SignalType.AGENT_ICE_Candidate,
                        payload: event.candidate,
                        targetAgentId: agentId,
                    });
                }
            };

            connection.rtcConnection.ontrack = (event) => {
                this.attachIncomingAudioMediaStream({
                    agentId,
                    stream: event.streams[0],
                });
            };

            connection.rtcConnection.onnegotiationneeded = async () => {
                try {
                    const offer = await Agent_WebRTC.createOffer(
                        connection.rtcConnection!,
                    );
                    await this.sendWebRTCSignal({
                        type: AgentMeta.WebRTC.E_SignalType.AGENT_Offer,
                        payload: offer,
                        targetAgentId: agentId,
                    });
                } catch (error) {
                    console.error('Error during negotiation:', error);
                }
            };

            if (!connection.rtcDataChannel) {
                connection.rtcDataChannel = Agent_WebRTC.createDataChannel(
                    connection.rtcConnection,
                    'data',
                );
                Agent_WebRTC.setupDataChannelListeners(
                    connection.rtcDataChannel,
                    () =>
                        console.log(
                            `Data channel opened with agent ${agentId}`,
                        ),
                    () =>
                        console.log(
                            `Data channel closed with agent ${agentId}`,
                        ),
                    (event) =>
                        Agent_WebRTC.handleDataChannelMessage(agentId, event),
                );
            }

            // Initiate the connection if we haven't already
            if (
                !connection.rtcConnectionOffer &&
                !connection.rtcConnectionAnswer
            ) {
                connection.rtcConnection.onnegotiationneeded(
                    new Event('negotiationneeded'),
                );
            }
        }

        static async handleWebRTCSignal(signal: {
            type: AgentMeta.WebRTC.E_SignalType;
            payload: RTCSessionDescriptionInit | RTCIceCandidateInit;
            fromAgentId: string;
        }): Promise<void> {
            const world = Agent_Store.world;
            if (!world) {
                throw new Error('No world connection available');
            }

            const connection = world.agentPeerConnections[signal.fromAgentId];
            if (!connection || !connection.rtcConnection) {
                throw new Error('No RTC connection available for agent');
            }

            switch (signal.type) {
                case AgentMeta.WebRTC.E_SignalType.AGENT_Offer: {
                    const answer = await Agent_WebRTC.handleOffer(
                        connection.rtcConnection,
                        signal.payload as RTCSessionDescriptionInit,
                    );
                    await this.sendWebRTCSignal({
                        type: AgentMeta.WebRTC.E_SignalType.AGENT_Answer,
                        payload: answer,
                        targetAgentId: signal.fromAgentId,
                    });
                    break;
                }
                case AgentMeta.WebRTC.E_SignalType.AGENT_Answer:
                    await Agent_WebRTC.handleAnswer(
                        connection.rtcConnection,
                        signal.payload as RTCSessionDescriptionInit,
                    );
                    break;
                case AgentMeta.WebRTC.E_SignalType.AGENT_ICE_Candidate:
                    await Agent_WebRTC.addIceCandidate(
                        connection.rtcConnection,
                        signal.payload as RTCIceCandidateInit,
                    );
                    break;
                default:
                    console.error('Unknown signal type:', signal.type);
            }
        }
    };
}

reaction(
    () => Agent_Store.world?.presence.position,
    (position) => {
        Agent_World.updateAudioPanners();
        console.log(`Local agent position updated: ${position}`);
    },
);

reaction(
    () => Agent_Store.world?.presence.orientation,
    (orientation) => {
        Agent_World.updateAudioPanners();
        console.log(`Local agent orientation updated: ${orientation}`);
    },
);

reaction(
    () => {
        const world = Agent_Store.world;
        return world ? Object.values(world.agentPeerConnections).map(conn => conn.presence?.position) : [];
    },
    (positions) => {
        positions.forEach((position, index) => {
            if (position) {
                const agentId = Object.keys(Agent_Store.world!.agentPeerConnections)[index];
                Agent_World.updateAudioPanners(agentId);
                console.log(`Peer agent ${agentId} position updated: ${position}`);
            }
        });
    },
);

reaction(
    () => {
        const world = Agent_Store.world;
        return world ? Object.values(world.agentPeerConnections).map(conn => conn.presence?.orientation) : [];
    },
    (orientations) => {
        orientations.forEach((orientation, index) => {
            if (orientation) {
                const agentId = Object.keys(Agent_Store.world!.agentPeerConnections)[index];
                Agent_World.updateAudioPanners(agentId);
                console.log(`Peer agent ${agentId} orientation updated: ${orientation}`);
            }
        });
    },
);