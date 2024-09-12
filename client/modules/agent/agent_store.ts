import { makeAutoObservable, autorun, reaction } from 'npm:mobx';
import { Agent as AgentMeta } from '../../../meta.ts';

export interface SharedState {
    worldConnection: AgentMeta.I_AgentToWorldConnection | null;
    localAudioMediaStream: MediaStream | null;
}

class AgentStore {
    worldConnection: AgentMeta.I_AgentToWorldConnection | null = null;
    localAudioMediaStream: MediaStream | null = null;
    agentId: string | null = null;
    useWebRTC: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
}

export const agentStore = new AgentStore();