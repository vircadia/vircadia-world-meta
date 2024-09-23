import { runInAction, reaction } from 'mobx';
import { log } from '../../../general/modules/log.ts';
import { Agent_Store } from './store.ts';
import { Agent_World } from './world.ts';
import { Agent_Script } from './script.ts';

export class Agent {
    static readonly AGENT_LOG_PREFIX = '[AGENT]';

    static World = Agent_World;
    static Store = Agent_Store;
    static Script = Agent_Script;
}

// Set up reactions
reaction(
    () => Agent_Store.world,
    (worldConnection) => {
        if (worldConnection) {
            log({
                message:
                    `Connected to world: ${worldConnection.host}:${worldConnection.port}`,
                type: 'info',
            });
        } else {
            log({
                message: 'Disconnected from world',
                type: 'info',
            });
        }
    },
);

reaction(
    () => {
        const agentCount = Agent_Store.world
            ? Object.keys(Agent_Store.world.agentPeerConnections)
                .length
            : 0;
        return agentCount;
    },
    (agentCount) => {
        log({
            message: `Agent count changed: ${agentCount}`,
            type: 'info',
        });
    },
);

reaction(
    () => Agent_Store.localAudioMediaStream,
    (stream) => {
        if (stream) {
            log({
                message: 'Local audio media stream updated',
                type: 'info',
            });
        } else {
            log({
                message: 'Local audio media stream removed',
                type: 'info',
            });
        }
    },
);
