import { Supabase } from "../supabase/supabase.ts";
import { REALTIME_LISTEN_TYPES } from "jsr:@supabase/supabase-js@2";
import { Agent as AgentMeta, Primitive, Server } from "../../../meta.ts";
import { log } from "../../../general/modules/log.ts";
import { AgentToAgent_WebRTC } from "./agent_agentToAgent_webRTC.ts";
import { Agent_Audio } from "./agent_audio.ts";
import { agentStore } from "./agent_store.ts";
import { reaction, runInAction } from "npm:mobx";

export namespace Agent {
    export const AGENT_LOG_PREFIX = "[AGENT]";
    const PRESENCE_UPDATE_INTERVAL = 250;
    const AUDIO_METADATA_UPDATE_INTERVAL = 100;

    // Our own agent data
    export namespace Self {
        export const updatePosition = (newPosition: Primitive.C_Vector3) => {
            const world = agentStore.worldConnection;
            if (world?.presence) {
                runInAction(() => {
                    world.presence.position = newPosition;
                });
                void updatePresence();
            }
        };

        export const updateAgentId = (newAgentId: string) => {
            runInAction(() => {
                agentStore.agentId = newAgentId;
            });
        };

        export const updateOrientation = (
            newOrientation: Primitive.C_Vector3,
        ) => {
            const world = agentStore.worldConnection;
            if (world?.presence) {
                runInAction(() => {
                    world.presence.orientation = newOrientation;
                });
                void updatePresence();
            }
        };

        export const updatePresence = async () => {
            const world = agentStore.worldConnection;
            if (!world) {
                return;
            }

            try {
                const presenceChannel = world.supabaseClient?.channel(
                    AgentMeta.E_ChannelType.AGENT_METADATA,
                );
                if (presenceChannel?.state === "joined") {
                    try {
                        const presenceData = new AgentMeta.C_Metadata({
                            agentId: id,
                            position: world.presence?.position ??
                                new Primitive.C_Vector3(),
                            orientation: world.presence?.orientation ??
                                new Primitive.C_Vector3(),
                            onlineAt: new Date().toISOString(),
                        });
                        await presenceChannel.track(presenceData);
                    } catch (error) {
                        log({
                            message:
                                `${AGENT_LOG_PREFIX} Failed to update presence: ${error}`,
                            type: "error",
                        });
                    }
                } else {
                    log({
                        message:
                            `${AGENT_LOG_PREFIX} Presence channel not joined, skipping update`,
                        type: "warn",
                    });
                }
            } catch (error) {
                log({
                    message:
                        `${AGENT_LOG_PREFIX} Error updating presence: ${error}`,
                    type: "error",
                });
            }
        };

        export const initializeLocalAudioMediaStream = async () => {
            try {
                const localAudioMediaStream = await Agent_Audio
                    .createAudioMediaStream({});
                runInAction(() => {
                    agentStore.localAudioMediaStream = localAudioMediaStream;
                });
                log({
                    message: `${AGENT_LOG_PREFIX} Local audio stream created.`,
                    type: "info",
                });
            } catch (error) {
                log({
                    message:
                        `${AGENT_LOG_PREFIX} Error initializing local audio stream: ${error}`,
                    type: "error",
                });
            }
        };
    }

    export const connectToWorld = async (data: {
        host: string;
        port: number;
        key: string;
        agentId: string;
        capabilities: {
            useWebRTC: boolean;
        };
    }) => {
        if (agentStore.worldConnection) {
            log({
                message: `${AGENT_LOG_PREFIX} Already connected to a world`,
                type: "warn",
            });
            return;
        }

        agentStore.useWebRTC = data.capabilities.useWebRTC;
        agentStore.agentId = data.agentId;

        try {
            const response = await fetch(
                `${data.host}:${data.port}${Server.E_HTTPRequestPath.CONFIG_AND_STATUS}`,
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const serverConfigAndStatus:
                Server.I_REQUEST_ConfigAndStatusResponse = await response
                    .json();
            log({
                message: `Server status: ${
                    JSON.stringify(serverConfigAndStatus)
                }`,
                type: "info",
            });

            const url =
                `${data.host}:${data.port}${serverConfigAndStatus.API_URL}`;
            const key = data.key;
            const supabaseClient = Supabase.initializeSupabaseClient(url, key);

            // Double-checked locking
            if (!agentStore.worldConnection) {
                const newWorldConnection: AgentMeta.I_AgentToWorldConnection = {
                    host: data.host,
                    port: data.port,
                    supabaseClient,
                    agentToAgentConnections: {},
                    presenceUpdateInterval: null,
                    presence: new AgentMeta.C_Metadata({
                        agentId: Self.id,
                        position: new Primitive.C_Vector3(),
                        orientation: new Primitive.C_Vector3(),
                        onlineAt: new Date().toISOString(),
                    }),
                    audioContext: Agent_Audio.createAudioContext(),
                };

                runInAction(() => {
                    agentStore.worldConnection = newWorldConnection;
                });

                if (agentStore.worldConnection) {
                    try {
                        agentStore.worldConnection.supabaseClient?.channel(
                            AgentMeta.E_ChannelType.AGENT_METADATA,
                        )
                            .on("presence", { event: "sync" }, () => {
                                const presenceChannel = world.supabaseClient
                                    ?.channel(
                                        AgentMeta.E_ChannelType.AGENT_METADATA,
                                    );
                                const state =
                                    presenceChannel?.presenceState() ?? {};
                                handleAgentMetadataSync(
                                    state as unknown as Record<
                                        string,
                                        AgentMeta.C_Metadata[]
                                    >,
                                );
                            })
                            .subscribe();
                        world.supabaseClient?.channel(
                            AgentMeta.E_ChannelType.SIGNALING_CHANNEL,
                        )
                            .on(REALTIME_LISTEN_TYPES.BROADCAST, {
                                event: AgentMeta.E_SignalType.AGENT_Offer,
                            }, (payload) => {
                                const connection = world
                                    .agentToAgentConnections[
                                        payload.payload.fromAgentId
                                    ];
                                if (connection) {
                                    runInAction(() => {
                                        connection.rtcConnectionOffer =
                                            payload.payload.offer;
                                    });
                                }
                            })
                            .on(REALTIME_LISTEN_TYPES.BROADCAST, {
                                event: AgentMeta.E_SignalType.AGENT_Answer,
                            }, (payload) => {
                                const connection = world
                                    .agentToAgentConnections[
                                        payload.payload.fromAgentId
                                    ];
                                if (connection) {
                                    runInAction(() => {
                                        connection.rtcConnectionAnswer =
                                            payload.payload.answer;
                                    });
                                }
                            })
                            .on(REALTIME_LISTEN_TYPES.BROADCAST, {
                                event:
                                    AgentMeta.E_SignalType.AGENT_ICE_Candidate,
                            }, (payload) => {
                                const connection = world
                                    .agentToAgentConnections[
                                        payload.payload.fromAgentId
                                    ];
                                if (connection) {
                                    runInAction(() => {
                                        connection.rtcConnectionIceCandidate =
                                            payload.payload.candidate;
                                    });
                                }
                            })
                            .subscribe();
                        log({
                            message:
                                `${AGENT_LOG_PREFIX} Successfully connected to Supabase Realtime`,
                            type: "info",
                        });

                        world.presenceUpdateInterval = setInterval(() => {
                            void Self.updatePresence();
                        }, PRESENCE_UPDATE_INTERVAL);
                    } catch (error) {
                        log({
                            message:
                                `${AGENT_LOG_PREFIX} Failed to connect to Supabase Realtime: ${error}`,
                            type: "error",
                        });
                    }
                }
                log({
                    message: `${AGENT_LOG_PREFIX} Connected to world`,
                    type: "info",
                });
            } else {
                log({
                    message:
                        `${AGENT_LOG_PREFIX} World was already connected by another process`,
                    type: "warn",
                });
            }
        } catch (error) {
            log({
                message:
                    `${AGENT_LOG_PREFIX} Failed to connect to world: ${error}`,
                type: "error",
            });
        }
    };

    export const disconnectFromWorld = async () => {
        const world = agentStore.worldConnection;
        if (world) {
            if (world.presenceUpdateInterval) {
                clearInterval(world.presenceUpdateInterval);
            }
            Object.keys(world.agentToAgentConnections).forEach((agentId) => {
                removeAgent(agentId);
            });
            await world.supabaseClient?.removeAllChannels();
            if (world.audioContext) {
                await world.audioContext.close();
            }
            runInAction(() => {
                agentStore.worldConnection = null;
            });
            log({
                message: `${AGENT_LOG_PREFIX} Disconnected from world`,
                type: "info",
            });
        }
    };

    export const createAgent = async (
        agentId: string,
        metadata: AgentMeta.C_Metadata,
    ) => {
        const world = agentStore.worldConnection;
        if (!world) {
            return;
        }

        const connection = WebRTC.createAgentConnection(agentId, metadata);
        runInAction(() => {
            world.agentToAgentConnections[agentId] = connection;
        });

        WebRTC.setupRTCEventListeners(agentId, connection);
        WebRTC.addLocalStreamsToConnection(agentId, connection);

        log({
            message: `${AGENT_LOG_PREFIX} Created agent ${agentId}`,
            type: "info",
        });
        await WebRTC.createAndSendOffer(agentId, connection);
    };

    export const removeAgent = (agentId: string) => {
        const world = agentStore.worldConnection;
        if (!world) {
            return;
        }

        const connection = world.agentToAgentConnections[agentId];
        if (connection) {
            WebRTC.removeAgentConnection(agentId, connection);
            runInAction(() => {
                delete world.agentToAgentConnections[agentId];
            });
            log({
                message: `${AGENT_LOG_PREFIX} Removed agent ${agentId}`,
                type: "info",
            });
        }
    };

    const handleAgentMetadataSync = (
        state: Record<string, AgentMeta.C_Metadata[]>,
    ) => {
        const world = agentStore.worldConnection;
        if (!world) {
            return;
        }

        const currentAgents = Object.keys(state);

        // Handle removals
        Object.keys(world.agentToAgentConnections).forEach((agentId) => {
            if (!currentAgents.includes(agentId)) {
                removeAgent(agentId);
            }
        });

        // Handle additions and updates
        currentAgents.forEach(async (agentId) => {
            if (agentId !== agentStore.agentId) {
                try {
                    const agentData = state[agentId][0];
                    const metadata: AgentMeta.C_Metadata = {
                        agentId: agentData.agentId,
                        position: agentData.position,
                        orientation: agentData.orientation,
                        onlineAt: agentData.onlineAt,
                    };

                    if (!world.agentToAgentConnections[agentId]) {
                        await createAgent(agentId, metadata);
                    } else {
                        updateAgentMetadata(agentId, metadata);
                    }
                } catch (error) {
                    console.error(
                        `Invalid metadata for agent ${agentId}:`,
                        error,
                    );
                }
            }
        });

        log({
            message: `${AGENT_LOG_PREFIX} Updated agent list: ${currentAgents}`,
            type: "info",
        });
    };

    const updateAgentMetadata = (
        agentId: string,
        metadata: AgentMeta.C_Metadata,
    ) => {
        const world = agentStore.worldConnection;
        if (!world) {
            return;
        }

        if (world.agentToAgentConnections[agentId]) {
            runInAction(() => {
                world.agentToAgentConnections[agentId].presence = metadata;
            });
            log({
                message:
                    `${AGENT_LOG_PREFIX} Updated metadata for agent ${agentId}`,
                type: "info",
            });
        }
    };

    export const updateAgentAudioPosition = (agentId: string) => {
        const world = agentStore.worldConnection;
        if (!world || !world.audioContext) {
            return;
        }

        const connection = world.agentToAgentConnections[agentId];
        if (!connection || !connection.panner || !connection.presence) {
            return;
        }

        const agentPosition = connection.presence.position;
        const agentOrientation = connection.presence.orientation;

        WebRTC_Media.updateAudioPosition(
            connection.panner,
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
    };
}

// Set up reactions
reaction(
    () => agentStore.worldConnection,
    (worldConnection) => {
        if (worldConnection) {
            console.log(
                `Connected to world: ${worldConnection.host}:${worldConnection.port}`,
            );
        } else {
            console.log("Disconnected from world");
        }
    },
);

reaction(
    () => {
        const agentCount = agentStore.worldConnection
            ? Object.keys(agentStore.worldConnection.agentToAgentConnections)
                .length
            : 0;
        return agentCount;
    },
    (agentCount) => {
        console.log(`Agent count changed: ${agentCount}`);
    },
);

// Optional: Add a reaction for localAudioMediaStream changes
reaction(
    () => agentStore.localAudioMediaStream,
    (stream) => {
        if (stream) {
            console.log("Local audio media stream updated");
            // Perform any necessary actions when the local audio stream changes
        } else {
            console.log("Local audio media stream removed");
        }
    },
);
