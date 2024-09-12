import { Agent, Primitive } from '../../../meta.ts';
import { log } from '../../../general/modules/log.ts';

export namespace AgentToAgent_WebRTC {
    export const WEBRTC_LOG_PREFIX = '[WEBRTC]';

    // FIXME: These should be defined in config.
    const TEMP_ICE_SERVERS = [
        {
            urls: ['stun:stun.l.google.com:19302'],
        },
    ];

    export const createAgentConnection = (agentId: string, metadata: Agent.C_Metadata): Agent.I_AgentToAgentConnection => {
        const rtcConnection = createRTCConnection(agentId);
        const rtcDataChannel = createDataChannel(rtcConnection, 'data');

        return {
            rtcConnection,
            rtcDataChannel,
            mediaStream: null,
            metadata,
            panner: null,
            audioUpdateInterval: null,
        };
    };

    export const createRTCConnection = (agentId: string): RTCPeerConnection => {
        const rtcConnection = new RTCPeerConnection({ iceServers: TEMP_ICE_SERVERS });
        return rtcConnection;
    };

    export const setupRTCEventListeners = (agentId: string, connection: Agent.AgentConnection) => {
        if (!connection || !connection.rtcConnection) return;

        connection.rtcConnection.onicecandidate = (event) => {
            if (event.candidate) {
                sendWebRTCSignal({
                    type: Agent.E_SignalType.AGENT_ICE_Candidate,
                    payload: event.candidate,
                    targetAgentId: agentId,
                });
            }
        };

        connection.rtcConnection.ontrack = (event) => handleIncomingStream(agentId, event.streams[0]);
        connection.rtcConnection.onnegotiationneeded = () => createAndSendOffer(agentId, connection);

        setupDataChannelListeners(
            connection.rtcDataChannel,
            () => log({ message: `${WEBRTC_LOG_PREFIX} Data channel opened with agent ${agentId}`, type: 'info' }),
            () => log({ message: `${WEBRTC_LOG_PREFIX} Data channel closed with agent ${agentId}`, type: 'info' }),
            (event) => handleDataChannelMessage(agentId, event)
        );
    };

    export const createDataChannel = (rtcConnection: RTCPeerConnection, label: string): RTCDataChannel => rtcConnection.createDataChannel(label);

    export const setupDataChannelListeners = (
        dataChannel: RTCDataChannel | null,
        onOpen: () => void,
        onClose: () => void,
        onMessage: (event: MessageEvent) => void
    ) => {
        if (dataChannel) {
            dataChannel.onopen = onOpen;
            dataChannel.onclose = onClose;
            dataChannel.onmessage = onMessage;
        }
    };

    export const setAudioStreamToConnection = async (data: {
        constraints?: MediaStreamConstraints,
        rtcPeerConnnection: RTCPeerConnection
    }) => {
        const mediaStream = await navigator.mediaDevices.getUserMedia(data.constraints);

        if (mediaStream) {
            mediaStream.getTracks().forEach((track) => {
                data.rtcPeerConnnection.addTrack(track, mediaStream);
            });
        }
    }

    export const addLocalStreamsToConnection = (agentId: string, connection: Agent.AgentConnection) => {
        if (!connection || !connection.rtcConnection) return;

        if (Agent.Self.localAudioStream) {
            WebRTC_Media.addStreamToConnection(connection.rtcConnection, Agent.Self.localAudioStream);
        }
        if (Agent.Self.localVideoStream) {
            WebRTC_Media.addStreamToConnection(connection.rtcConnection, Agent.Self.localVideoStream);
        }
    };

    export const createAndSendOffer = async (agentId: string, connection: Agent.AgentConnection) => {
        if (!connection || !connection.rtcConnection) return;

        try {
            const offer = await createOffer(connection.rtcConnection);
            await sendWebRTCSignal({
                type: Agent.E_SignalType.AGENT_Offer,
                payload: offer,
                targetAgentId: agentId,
            });
        } catch (error) {
            log({ message: `${WEBRTC_LOG_PREFIX} Error creating and sending offer: ${error}`, type: 'error' });
        }
    };

    export const removeAgentConnection = (agentId: string, connection: Agent.AgentConnection) => {
        if (connection.rtcConnection) {
            closeRTCConnection(connection.rtcConnection);
        }
        if (connection.rtcDataChannel) {
            connection.rtcDataChannel.close();
        }
        if (connection.mediaStream) {
            connection.mediaStream.getTracks().forEach((track) => track.stop());
        }
        if (connection.panner) {
            WebRTC_Media.cleanupAudio(connection.panner);
        }
        if (connection.audioUpdateInterval) {
            clearInterval(connection.audioUpdateInterval);
        }
    };

    export const handleWebRTCOffer = async (data: { offer: RTCSessionDescriptionInit; fromAgentId: string }, connection: Agent.AgentConnection) => {
        const { offer, fromAgentId } = data;
        if (!connection || !connection.rtcConnection) return;

        try {
            const answer = await handleOffer(connection.rtcConnection, offer);
            await sendWebRTCSignal({
                type: Agent.E_SignalType.AGENT_Answer,
                payload: answer,
                targetAgentId: fromAgentId,
            });
        } catch (error) {
            log({ message: `${WEBRTC_LOG_PREFIX} Error handling WebRTC offer: ${error}`, type: 'error' });
        }
    };

    export const handleWebRTCAnswer = async (data: { answer: RTCSessionDescriptionInit; fromAgentId: string }, connection: Agent.AgentConnection) => {
        const { answer } = data;
        if (!connection || !connection.rtcConnection) return;

        try {
            await handleAnswer(connection.rtcConnection, answer);
        } catch (error) {
            log({ message: `${WEBRTC_LOG_PREFIX} Error handling WebRTC answer: ${error}`, type: 'error' });
        }
    };

    export const handleWebRTCIceCandidate = async (data: { candidate: RTCIceCandidateInit; fromAgentId: string }, connection: Agent.AgentConnection) => {
        const { candidate } = data;
        if (!connection || !connection.rtcConnection) return;

        try {
            await handleIceCandidate(connection.rtcConnection, candidate);
        } catch (error) {
            log({ message: `${WEBRTC_LOG_PREFIX} Error handling ICE candidate: ${error}`, type: 'error' });
        }
    };

    const createOffer = async (rtcConnection: RTCPeerConnection): Promise<RTCSessionDescriptionInit> => {
        const offer = await rtcConnection.createOffer();
        await rtcConnection.setLocalDescription(offer);
        return offer;
    };

    const handleOffer = async (
        rtcConnection: RTCPeerConnection,
        offer: RTCSessionDescriptionInit
    ): Promise<RTCSessionDescriptionInit> => {
        await rtcConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await rtcConnection.createAnswer();
        await rtcConnection.setLocalDescription(answer);
        return answer;
    };

    const handleAnswer = async (
        rtcConnection: RTCPeerConnection,
        answer: RTCSessionDescriptionInit
    ): Promise<void> => {
        await rtcConnection.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const handleIceCandidate = async (
        rtcConnection: RTCPeerConnection,
        candidate: RTCIceCandidateInit
    ): Promise<void> => {
        await rtcConnection.addIceCandidate(new RTCIceCandidate(candidate));
    };

    const closeRTCConnection = (rtcConnection: RTCPeerConnection): void => {
        rtcConnection.close();
    };

    const sendWebRTCSignal = async (signal: {
        type: Agent.E_SignalType;
        payload: RTCSessionDescriptionInit | RTCIceCandidateInit | RTCIceCandidate;
        targetAgentId: string;
    }) => {
        const world = Agent.worldConnections[signal.targetAgentId];
        if (!world) return;

        try {
            await world.supabaseClient?.channel(Agent.E_ChannelType.SIGNALING_CHANNEL)
                .send({
                    type: 'broadcast',
                    event: signal.type,
                    payload: signal,
                });
        } catch (error) {
            log({ message: `${WEBRTC_LOG_PREFIX} Error sending WebRTC signal: ${error}`, type: 'error' });
        }
    };

    const handleIncomingStream = async (agentId: string, stream: MediaStream) => {
        const world = Agent.worldConnections[agentId];
        if (!world || !world.audioContext) return;

        const connection = world.agentConnections[agentId];
        if (!connection) return;

        connection.mediaStream = stream;

        try {
            await WebRTC_Media.resumeAudioContext(world.audioContext);
            const panner = WebRTC_Media.createPanner(world.audioContext);
            connection.panner = panner;

            WebRTC_Media.setupIncomingAudio(world.audioContext, stream, panner);

            connection.audioUpdateInterval = setInterval(() => {
                Agent.updateAgentAudioPosition(agentId);
            }, 100); // Update interval

            log({ message: `${WEBRTC_LOG_PREFIX} Set up incoming audio for agent ${agentId}`, type: 'info' });
        } catch (error) {
            log({ message: `${WEBRTC_LOG_PREFIX} Error setting up incoming audio: ${error}`, type: 'error' });
        }
    };

    const handleDataChannelMessage = (agentId: string, event: MessageEvent) => {
        // Handle incoming data channel messages
        log({ message: `${WEBRTC_LOG_PREFIX} Received message from agent ${agentId}: ${event.data}`, type: 'info' });
        // Implement your logic for handling different types of messages here
    };
}