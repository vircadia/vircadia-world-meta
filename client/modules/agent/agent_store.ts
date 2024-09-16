import { makeAutoObservable } from 'npm:mobx';
import { Agent as AgentMeta } from '../../../meta.ts';

class agentStore {
    world: AgentMeta.I_AgentWorldConnection | null = null;
    localAudioMediaStream: MediaStream | null = null;
    agentId: string | null = null;
    useWebRTC: boolean = false;
    iceServers: RTCIceServer[] = [];

    constructor() {
        makeAutoObservable(this);
    }
}

export const Agent_Store = new agentStore();
