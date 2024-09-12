import { Agent as AgentMeta } from '../../../meta.ts';
import * as WebRTC from './agent_agentToAgent_webRTC.ts';

export const createAgentConnection = (
    agentId: string,
    metadata: AgentMeta.C_Metadata,
    useWebRTC: boolean,
) => {
    if (useWebRTC) {
        return WebRTC.createAgentConnection(agentId, metadata);
    } else {
        // Implement non-WebRTC fallback
    }
};

export const removeAgentConnection = (
    agentId: string,
    connection: AgentMeta.I_AgentToAgentConnection,
    useWebRTC: boolean,
) => {
    if (useWebRTC) {
        WebRTC.removeAgentConnection(agentId, connection);
    } else {
        // Implement non-WebRTC fallback
    }
};

// Other agent-to-agent communication functions
