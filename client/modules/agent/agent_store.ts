import { makeAutoObservable } from 'npm:mobx';
import { Agent as AgentMeta } from '../../../meta.ts';

export interface SharedState {
    worldConnection: AgentMeta.I_AgentWorldConnection | null;
    localAudioMediaStream: MediaStream | null;
}

class agentStore {
    worldConnection: AgentMeta.I_AgentWorldConnection | null = null;
    localAudioMediaStream: MediaStream | null = null;
    agentId: string | null = null;
    useWebRTC: boolean = false;
    iceServers: RTCIceServer[] = [];

    constructor() {
        makeAutoObservable(this);
    }
}

export const Agent_Store = new agentStore();
