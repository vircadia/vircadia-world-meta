/// <reference lib="dom" />

import { reaction, runInAction } from 'npm:mobx';
import { log } from '../../../general/modules/log.ts';
import { Agent as AgentMeta } from '../../../meta.ts';
import { Agent_Audio } from './agent_audio.ts';
import { Agent_Store } from './agent_store.ts';
import { Agent_World } from './agent_world.ts';

export interface SharedState {
    worldConnection: AgentMeta.I_AgentWorldConnection | null;
    localAudioMediaStream: MediaStream | null;
}

// Removed local agentStore definition

export class Agent {
    static readonly AGENT_LOG_PREFIX = '[AGENT]';

    static initialize(data: {
        iceServers?: RTCIceServer[];
    }) {
        Agent_Store.iceServers = data.iceServers ?? [];
    }

    static async initializeLocalAudioMediaStream(): Promise<void> {
        try {
            const localAudioMediaStream = await Agent_Audio
                .createAudioMediaStream({});
            runInAction(() => {
                Agent_Store.localAudioMediaStream = localAudioMediaStream;
            });
            log({
                message:
                    `${Agent.AGENT_LOG_PREFIX} Local audio stream created.`,
                type: 'info',
            });
        } catch (error) {
            log({
                message:
                    `${Agent.AGENT_LOG_PREFIX} Error initializing local audio stream: ${error}`,
                type: 'error',
            });
        }
    }

    static updateAgentAudioPosition(agentId: string): void {
        Agent_World.updateAgentAudioPosition(agentId);
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
