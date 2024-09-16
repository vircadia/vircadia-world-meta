import { log } from '../../../general/modules/log.ts';
import { Agent as AgentMeta } from '../../../meta.ts';
import { Agent_Audio } from './agent_helpers_audio.ts';

export namespace Agent_WebRTC {
    export const AGENT_WEBRTC_LOG_PREFIX = '[AGENT WEBRTC]';

    // Helper functions
    export const createPeerConnection = (
        iceServers: RTCIceServer[],
    ): RTCPeerConnection => {
        return new RTCPeerConnection({ iceServers });
    };

    export const createDataChannel = (
        peerConnection: RTCPeerConnection,
        label: string,
    ): RTCDataChannel => {
        return peerConnection.createDataChannel(label);
    };

    export const createOffer = async (
        peerConnection: RTCPeerConnection,
    ): Promise<RTCSessionDescriptionInit> => {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        return offer;
    };

    export const handleOffer = async (
        peerConnection: RTCPeerConnection,
        offer: RTCSessionDescriptionInit,
    ): Promise<RTCSessionDescriptionInit> => {
        await peerConnection.setRemoteDescription(
            new RTCSessionDescription(offer),
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        return answer;
    };

    export const handleAnswer = async (
        peerConnection: RTCPeerConnection,
        answer: RTCSessionDescriptionInit,
    ): Promise<void> => {
        await peerConnection.setRemoteDescription(
            new RTCSessionDescription(answer),
        );
    };

    export const addIceCandidate = async (
        peerConnection: RTCPeerConnection,
        candidate: RTCIceCandidateInit,
    ): Promise<void> => {
        await peerConnection.addIceCandidate(
            new RTCIceCandidate(candidate),
        );
    };

    export const sendWebRTCSignal = async (data: {
        type: AgentMeta.E_SignalType;
        payload:
            | RTCSessionDescriptionInit
            | RTCIceCandidateInit
            | RTCIceCandidate;
        targetAgentId: string;
        world: AgentMeta.I_AgentWorldConnection;
    }) => {
        if (!data.world) return;

        try {
            await data.world.supabaseClient?.channel(
                AgentMeta.E_ChannelType.SIGNALING_CHANNEL,
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

    export const handleIncomingStream = async (data: {
        agentId: string;
        stream: MediaStream;
        world: AgentMeta.I_AgentWorldConnection;
    }) => {
        if (!data.world) {
            throw new Error('World not found');
        }

        const connection = data.world.agentPeerConnections[data.agentId];
        if (!connection) {
            throw new Error('Connection not found');
        }

        if (!data.world.audioContext) {
            throw new Error('Audio context not found');
        }

        await Agent_Audio.resumeAudioContext(data.world.audioContext);
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
                audioContext: data.world.audioContext,
                mediaStream: data.stream,
                pannerOptions: {
                    // TODO: Put this in a config
                    panningModel: 'HRTF',
                    distanceModel: 'inverse',
                    refDistance: 1,
                    maxDistance: 10000,
                },
            });

        log({
            message:
                `${Agent_WebRTC.AGENT_WEBRTC_LOG_PREFIX} Set up incoming audio for agent ${data.agentId}`,
            type: 'info',
        });
    };

    export const handleDataChannelMessage = (
        agentId: string,
        event: MessageEvent,
    ) => {
        log({
            message:
                `${Agent_WebRTC.AGENT_WEBRTC_LOG_PREFIX} Received message from agent ${agentId}: ${event.data}`,
            type: 'info',
        });
        // Implement your logic for handling different types of messages here
    };

    export const setupDataChannelListeners = (
        dataChannel: RTCDataChannel | null,
        onOpen: () => void,
        onClose: () => void,
        onMessage: (event: MessageEvent) => void,
    ) => {
        if (dataChannel) {
            dataChannel.onopen = onOpen;
            dataChannel.onclose = onClose;
            dataChannel.onmessage = onMessage;
        }
    };

    export const setOutgoingAudioStreamOnConnection = (data: {
        rtcConnection: RTCPeerConnection;
        outgoingAudioMediaStream: MediaStream;
    }) => {
        // Remove existing tracks
        const senders = data.rtcConnection.getSenders();
        senders.forEach((sender) => {
            data.rtcConnection.removeTrack(sender);
        });

        // Add new tracks
        data.outgoingAudioMediaStream.getTracks().forEach((track) => {
            data.rtcConnection.addTrack(track, data.outgoingAudioMediaStream);
        });
    };

    export const deinitConnection = (
        connection: AgentMeta.I_AgentPeerConnection,
    ) => {
        if (connection.rtcDataChannel) {
            connection.rtcDataChannel.close();
        }
        if (connection.incomingAudioMediaStream) {
            connection.incomingAudioMediaStream.getTracks().forEach((
                track,
            ) => track.stop());
        }
        if (connection.rtcConnection) {
            connection.rtcConnection.close();
        }
        if (connection.incomingAudioMediaPanner) {
            Agent_Audio.removeIncomingAudioStream(
                connection.incomingAudioMediaPanner,
            );
        }
    };
}
