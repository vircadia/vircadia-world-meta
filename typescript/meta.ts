/// <reference lib="dom" />
// deno-lint-ignore-file no-namespace
import { z } from "zod";

export namespace Primitive {
    export const S_Vector3 = z.object({
        x: z.number(),
        y: z.number(),
        z: z.number(),
    });

    export type I_Vector3 = z.infer<typeof S_Vector3>;

    export class C_Vector3 {
        public x: number;
        public y: number;
        public z: number;

        constructor(_x?: number, _y?: number, _z?: number) {
            this.x = _x ?? 0;
            this.y = _y ?? 0;
            this.z = _z ?? 0;
        }

        static parse(obj: {
            x: number | any;
            y: number | any;
            z: number | any;
        }): C_Vector3 {
            const parsedData = S_Vector3.parse(obj);
            return new C_Vector3(parsedData.x, parsedData.y, parsedData.z);
        }
    }

    export const S_Color3 = z.object({
        r: z.number(),
        g: z.number(),
        b: z.number(),
    });

    export type I_Color3 = z.infer<typeof S_Color3>;

    export class C_Color3 {
        public r: number;
        public g: number;
        public b: number;

        constructor(_r?: number, _g?: number, _b?: number) {
            this.r = _r ?? 0;
            this.g = _g ?? 0;
            this.b = _b ?? 0;
        }

        static parse(obj: {
            r: number | any;
            g: number | any;
            b: number | any;
        }): C_Color3 {
            const parsedData = S_Color3.parse(obj);
            return new C_Color3(parsedData.r, parsedData.g, parsedData.b);
        }
    }
}

export namespace World {
    export namespace Babylon {
        export namespace LOD {
            export enum E_Mode {
                DISTANCE = "distance",
                SIZE = "size",
            }

            export enum E_Level {
                LOD0 = "LOD0",
                LOD1 = "LOD1",
                LOD2 = "LOD2",
                LOD3 = "LOD3",
                LOD4 = "LOD4",
            }
        }

        export namespace Billboard {
            export enum E_Mode {
                BILLBOARDMODE_NONE = 0,
                BILLBOARDMODE_X = 1,
                BILLBOARDMODE_Y = 2,
                BILLBOARDMODE_Z = 4,
                BILLBOARDMODE_ALL = 7,
            }
        }

        export namespace Texture {
            export enum E_ColorSpace {
                LINEAR = "linear",
                SRGB = "sRGB",
                GAMMA = "gamma",
            }
        }

        export namespace Light {
            export const LIGHTMAP_DATA_MESH_NAME = "vircadia_lightmapData";

            export enum E_Mode {
                DEFAULT = "default",
                SHADOWSONLY = "shadowsOnly",
                SPECULAR = "specular",
            }
        }

        export namespace Script {
            export interface I_AgentScript {
                script: string;
                unitTest: string;
            }

            export interface I_PersistentScript {
                runnerAgentId: string;
                script: string;
                unitTest: string;
            }
        }
    }

    export interface I_WorldGLTF {
        vircadia_uuid: string;
        name: string;
        version: string;
        metadata: any; // Consider creating a more specific type for metadata
        defaultScene?: string;
        extensionsUsed?: string[];
        extensionsRequired?: string[];
        extensions?: Record<string, unknown>;
        asset: any; // Consider creating a more specific type for asset
        extras?: {
            [key: string]: unknown;
        };
        // Vircadia World properties

        vircadia_version?: string;
        vircadia_createdat?: string;
        vircadia_updatedat?: string;
    }

    export interface I_Scene {
        vircadia_uuid: string;
        vircadia_world_uuid: string;
        name?: string;
        nodes?: any[]; // Consider using a more specific type
        extensions?: Record<string, unknown>;
        extras?: {
            [key: string]: unknown;
        };

        // Vircadia Scene properties

        vircadia_version?: string;
        vircadia_createdat?: string;
        vircadia_updatedat?: string;

        // Babylon.js Scene properties
        vircadia_babylonjs_scene_clearColor?: Primitive.I_Color3;
        vircadia_babylonjs_scene_ambientColor?: Primitive.I_Color3;
        vircadia_babylonjs_scene_gravity?: Primitive.I_Vector3;
        vircadia_babylonjs_scene_activeCamera?: string;
        vircadia_babylonjs_scene_collisionsEnabled?: boolean;
        vircadia_babylonjs_scene_physicsEnabled?: boolean;
        vircadia_babylonjs_scene_physicsGravity?: Primitive.I_Vector3;
        vircadia_babylonjs_scene_physicsEngine?: string;
        vircadia_babylonjs_scene_autoAnimate?: boolean;
        vircadia_babylonjs_scene_autoAnimateFrom?: number;
        vircadia_babylonjs_scene_autoAnimateTo?: number;
        vircadia_babylonjs_scene_autoAnimateLoop?: boolean;
        vircadia_babylonjs_scene_autoAnimateSpeed?: number;
    }

    export interface I_Node {
        vircadia_uuid: string;
        vircadia_world_uuid: string;
        name?: string;
        camera?: string;
        children?: any[]; // Consider using a more specific type
        skin?: string;
        matrix?: number[];
        mesh?: string;
        rotation?: number[];
        scale?: number[];
        translation?: number[];
        weights?: any[];
        extensions?: Record<string, unknown>;
        extras?: {
            [key: string]: unknown;
        };

        // Vircadia Node properties

        vircadia_version?: string;
        vircadia_createdat?: string;
        vircadia_updatedat?: string;

        // Babylon.js LOD properties
        vircadia_babylonjs_lod_mode?: Babylon.LOD.E_Mode;
        vircadia_babylonjs_lod_auto?: boolean;
        vircadia_babylonjs_lod_distance?: number;
        vircadia_babylonjs_lod_size?: number;
        vircadia_babylonjs_lod_hide?: number;

        // Babylon.js Billboard properties
        vircadia_babylonjs_billboard_mode?: Babylon.Billboard.E_Mode;

        // Babylon.js Light properties
        vircadia_babylonjs_light_lightmap?: string;
        vircadia_babylonjs_light_level?: number;
        vircadia_babylonjs_light_color_space?: Babylon.Texture.E_ColorSpace;
        vircadia_babylonjs_light_texcoord?: number;
        vircadia_babylonjs_light_use_as_shadowmap?: boolean;
        vircadia_babylonjs_light_mode?: Babylon.Light.E_Mode;

        // Babylon.js Script properties
        vircadia_babylonjs_script_agent_scripts?: {
            script: string;
            unitTest: string;
        }[];
        vircadia_babylonjs_script_persistent_scripts?: {
            runnerAgentId: string;
            script: string;
            unitTest: string;
        }[];
    }

    export interface I_Mesh {
        vircadia_uuid: string;
        vircadia_world_uuid: string;
        name?: string;
        primitives: any[]; // Consider using a more specific type
        weights?: any[];
        extensions?: Record<string, unknown>;

        // Base properties

        vircadia_version?: string;
        vircadia_createdat?: string;
        vircadia_updatedat?: string;

        // Babylon.js properties
        vircadia_babylonjs_lod_mode?: Babylon.LOD.E_Mode;
        vircadia_babylonjs_lod_auto?: boolean;
        vircadia_babylonjs_lod_distance?: number;
        vircadia_babylonjs_lod_size?: number;
        vircadia_babylonjs_lod_hide?: number;
        vircadia_babylonjs_billboard_mode?: Babylon.Billboard.E_Mode;
        vircadia_babylonjs_light_lightmap?: string;
        vircadia_babylonjs_light_level?: number;
        vircadia_babylonjs_light_color_space?: Babylon.Texture.E_ColorSpace;
        vircadia_babylonjs_light_texcoord?: number;
        vircadia_babylonjs_light_use_as_shadowmap?: boolean;
        vircadia_babylonjs_light_mode?: Babylon.Light.E_Mode;
        vircadia_babylonjs_script_agent_scripts?:
            Babylon.Script.I_AgentScript[];
        vircadia_babylonjs_script_persistent_scripts?:
            Babylon.Script.I_PersistentScript[];

        extras?: Record<string, unknown>;
    }

    export interface I_Material {
        vircadia_uuid: string;
        vircadia_world_uuid: string;
        name?: string;
        pbrMetallicRoughness?: any; // Consider using a more specific type
        normalTexture?: any;
        occlusionTexture?: any;
        emissiveTexture?: any;
        emissiveFactor?: number[];
        alphaMode?: "OPAQUE" | "MASK" | "BLEND";
        alphaCutoff?: number;
        doubleSided?: boolean;
        extensions?: Record<string, unknown>;

        // Base properties

        vircadia_version?: string;
        vircadia_createdat?: string;
        vircadia_updatedat?: string;

        // Babylon.js properties
        vircadia_babylonjs_lod_mode?: Babylon.LOD.E_Mode;
        vircadia_babylonjs_lod_auto?: boolean;
        vircadia_babylonjs_lod_distance?: number;
        vircadia_babylonjs_lod_size?: number;
        vircadia_babylonjs_lod_hide?: number;
        vircadia_babylonjs_billboard_mode?: Babylon.Billboard.E_Mode;
        vircadia_babylonjs_light_lightmap?: string;
        vircadia_babylonjs_light_level?: number;
        vircadia_babylonjs_light_color_space?: Babylon.Texture.E_ColorSpace;
        vircadia_babylonjs_light_texcoord?: number;
        vircadia_babylonjs_light_use_as_shadowmap?: boolean;
        vircadia_babylonjs_light_mode?: Babylon.Light.E_Mode;
        vircadia_babylonjs_script_agent_scripts?:
            Babylon.Script.I_AgentScript[];
        vircadia_babylonjs_script_persistent_scripts?:
            Babylon.Script.I_PersistentScript[];

        extras?: Record<string, unknown>;
    }

    export interface I_Texture {
        vircadia_uuid: string;
        vircadia_world_uuid: string;
        name?: string;
        sampler?: string;
        source?: string;
        extensions?: Record<string, unknown>;

        // Base properties

        vircadia_version?: string;
        vircadia_createdat?: string;
        vircadia_updatedat?: string;

        // Babylon.js properties
        vircadia_babylonjs_lod_mode?: Babylon.LOD.E_Mode;
        vircadia_babylonjs_lod_auto?: boolean;
        vircadia_babylonjs_lod_distance?: number;
        vircadia_babylonjs_lod_size?: number;
        vircadia_babylonjs_lod_hide?: number;
        vircadia_babylonjs_billboard_mode?: Babylon.Billboard.E_Mode;
        vircadia_babylonjs_light_lightmap?: string;
        vircadia_babylonjs_light_level?: number;
        vircadia_babylonjs_light_color_space?: Babylon.Texture.E_ColorSpace;
        vircadia_babylonjs_light_texcoord?: number;
        vircadia_babylonjs_light_use_as_shadowmap?: boolean;
        vircadia_babylonjs_light_mode?: Babylon.Light.E_Mode;
        vircadia_babylonjs_script_agent_scripts?:
            Babylon.Script.I_AgentScript[];
        vircadia_babylonjs_script_persistent_scripts?:
            Babylon.Script.I_PersistentScript[];

        extras?: Record<string, unknown>;
    }

    export interface I_Image {
        vircadia_uuid: string;
        vircadia_world_uuid: string;
        name?: string;
        uri?: string;
        mimeType?: string;
        bufferView?: string;
        extensions?: Record<string, unknown>;

        // Base properties

        vircadia_version?: string;
        vircadia_createdat?: string;
        vircadia_updatedat?: string;

        // Babylon.js properties
        vircadia_babylonjs_lod_mode?: Babylon.LOD.E_Mode;
        vircadia_babylonjs_lod_auto?: boolean;
        vircadia_babylonjs_lod_distance?: number;
        vircadia_babylonjs_lod_size?: number;
        vircadia_babylonjs_lod_hide?: number;
        vircadia_babylonjs_billboard_mode?: Babylon.Billboard.E_Mode;
        vircadia_babylonjs_light_lightmap?: string;
        vircadia_babylonjs_light_level?: number;
        vircadia_babylonjs_light_color_space?: Babylon.Texture.E_ColorSpace;
        vircadia_babylonjs_light_texcoord?: number;
        vircadia_babylonjs_light_use_as_shadowmap?: boolean;
        vircadia_babylonjs_light_mode?: Babylon.Light.E_Mode;
        vircadia_babylonjs_script_agent_scripts?:
            Babylon.Script.I_AgentScript[];
        vircadia_babylonjs_script_persistent_scripts?:
            Babylon.Script.I_PersistentScript[];

        extras?: Record<string, unknown>;
    }

    export interface I_Sampler {
        vircadia_uuid: string;
        vircadia_world_uuid: string;
        name?: string;
        magFilter?: number;
        minFilter?: number;
        wrapS?: number;
        wrapT?: number;
        extensions?: Record<string, unknown>;

        // Base properties

        vircadia_version?: string;
        vircadia_createdat?: string;
        vircadia_updatedat?: string;

        // Babylon.js properties
        vircadia_babylonjs_lod_mode?: Babylon.LOD.E_Mode;
        vircadia_babylonjs_lod_auto?: boolean;
        vircadia_babylonjs_lod_distance?: number;
        vircadia_babylonjs_lod_size?: number;
        vircadia_babylonjs_lod_hide?: number;
        vircadia_babylonjs_billboard_mode?: Babylon.Billboard.E_Mode;
        vircadia_babylonjs_light_lightmap?: string;
        vircadia_babylonjs_light_level?: number;
        vircadia_babylonjs_light_color_space?: Babylon.Texture.E_ColorSpace;
        vircadia_babylonjs_light_texcoord?: number;
        vircadia_babylonjs_light_use_as_shadowmap?: boolean;
        vircadia_babylonjs_light_mode?: Babylon.Light.E_Mode;
        vircadia_babylonjs_script_agent_scripts?:
            Babylon.Script.I_AgentScript[];
        vircadia_babylonjs_script_persistent_scripts?:
            Babylon.Script.I_PersistentScript[];

        extras?: Record<string, unknown>;
    }

    export interface I_Animation {
        vircadia_uuid: string;
        vircadia_world_uuid: string;
        name?: string;
        channels: any[]; // Consider using a more specific type
        samplers: any[]; // Consider using a more specific type
        extensions?: Record<string, unknown>;

        // Base properties

        vircadia_version?: string;
        vircadia_createdat?: string;
        vircadia_updatedat?: string;

        // Babylon.js properties
        vircadia_babylonjs_lod_mode?: Babylon.LOD.E_Mode;
        vircadia_babylonjs_lod_auto?: boolean;
        vircadia_babylonjs_lod_distance?: number;
        vircadia_babylonjs_lod_size?: number;
        vircadia_babylonjs_lod_hide?: number;
        vircadia_babylonjs_billboard_mode?: Babylon.Billboard.E_Mode;
        vircadia_babylonjs_light_lightmap?: string;
        vircadia_babylonjs_light_level?: number;
        vircadia_babylonjs_light_color_space?: Babylon.Texture.E_ColorSpace;
        vircadia_babylonjs_light_texcoord?: number;
        vircadia_babylonjs_light_use_as_shadowmap?: boolean;
        vircadia_babylonjs_light_mode?: Babylon.Light.E_Mode;
        vircadia_babylonjs_script_agent_scripts?:
            Babylon.Script.I_AgentScript[];
        vircadia_babylonjs_script_persistent_scripts?:
            Babylon.Script.I_PersistentScript[];

        extras?: Record<string, unknown>;
    }

    export interface I_Skin {
        vircadia_uuid: string;
        vircadia_world_uuid: string;
        name?: string;
        inverseBindMatrices?: string;
        skeleton?: string;
        joints: any[]; // Consider using a more specific type
        extensions?: Record<string, unknown>;

        // Base properties

        vircadia_version?: string;
        vircadia_createdat?: string;
        vircadia_updatedat?: string;

        // Babylon.js properties
        vircadia_babylonjs_lod_mode?: Babylon.LOD.E_Mode;
        vircadia_babylonjs_lod_auto?: boolean;
        vircadia_babylonjs_lod_distance?: number;
        vircadia_babylonjs_lod_size?: number;
        vircadia_babylonjs_lod_hide?: number;
        vircadia_babylonjs_billboard_mode?: Babylon.Billboard.E_Mode;
        vircadia_babylonjs_light_lightmap?: string;
        vircadia_babylonjs_light_level?: number;
        vircadia_babylonjs_light_color_space?: Babylon.Texture.E_ColorSpace;
        vircadia_babylonjs_light_texcoord?: number;
        vircadia_babylonjs_light_use_as_shadowmap?: boolean;
        vircadia_babylonjs_light_mode?: Babylon.Light.E_Mode;
        vircadia_babylonjs_script_agent_scripts?:
            Babylon.Script.I_AgentScript[];
        vircadia_babylonjs_script_persistent_scripts?:
            Babylon.Script.I_PersistentScript[];

        extras?: Record<string, unknown>;
    }

    export interface I_Camera {
        vircadia_uuid: string;
        vircadia_world_uuid: string;
        name?: string;
        type: "perspective" | "orthographic";
        orthographic?: any; // Consider using a more specific type
        perspective?: any; // Consider using a more specific type
        extensions?: Record<string, unknown>;

        // Base properties

        vircadia_version?: string;
        vircadia_createdat?: string;
        vircadia_updatedat?: string;

        // Babylon.js properties
        vircadia_babylonjs_lod_mode?: Babylon.LOD.E_Mode;
        vircadia_babylonjs_lod_auto?: boolean;
        vircadia_babylonjs_lod_distance?: number;
        vircadia_babylonjs_lod_size?: number;
        vircadia_babylonjs_lod_hide?: number;
        vircadia_babylonjs_billboard_mode?: Babylon.Billboard.E_Mode;
        vircadia_babylonjs_light_lightmap?: string;
        vircadia_babylonjs_light_level?: number;
        vircadia_babylonjs_light_color_space?: Babylon.Texture.E_ColorSpace;
        vircadia_babylonjs_light_texcoord?: number;
        vircadia_babylonjs_light_use_as_shadowmap?: boolean;
        vircadia_babylonjs_light_mode?: Babylon.Light.E_Mode;
        vircadia_babylonjs_script_agent_scripts?:
            Babylon.Script.I_AgentScript[];
        vircadia_babylonjs_script_persistent_scripts?:
            Babylon.Script.I_PersistentScript[];

        extras?: Record<string, unknown>;
    }

    export interface I_Buffer {
        vircadia_uuid: string;
        vircadia_world_uuid: string;
        name?: string;
        uri?: string;
        byteLength: number;
        data?: Uint8Array; // Assuming BYTEA is represented as Uint8Array in TypeScript
        extensions?: Record<string, unknown>;

        // Base properties

        vircadia_version?: string;
        vircadia_createdat?: string;
        vircadia_updatedat?: string;

        // Babylon.js properties
        vircadia_babylonjs_lod_mode?: Babylon.LOD.E_Mode;
        vircadia_babylonjs_lod_auto?: boolean;
        vircadia_babylonjs_lod_distance?: number;
        vircadia_babylonjs_lod_size?: number;
        vircadia_babylonjs_lod_hide?: number;
        vircadia_babylonjs_billboard_mode?: Babylon.Billboard.E_Mode;
        vircadia_babylonjs_light_lightmap?: string;
        vircadia_babylonjs_light_level?: number;
        vircadia_babylonjs_light_color_space?: Babylon.Texture.E_ColorSpace;
        vircadia_babylonjs_light_texcoord?: number;
        vircadia_babylonjs_light_use_as_shadowmap?: boolean;
        vircadia_babylonjs_light_mode?: Babylon.Light.E_Mode;
        vircadia_babylonjs_script_agent_scripts?:
            Babylon.Script.I_AgentScript[];
        vircadia_babylonjs_script_persistent_scripts?:
            Babylon.Script.I_PersistentScript[];

        extras?: Record<string, unknown>;
    }

    export interface I_BufferView {
        vircadia_uuid: string;
        vircadia_world_uuid: string;
        name?: string;
        buffer: string;
        byteOffset?: number;
        byteLength: number;
        byteStride?: number;
        target?: number;
        extensions?: Record<string, unknown>;

        // Base properties

        vircadia_version?: string;
        vircadia_createdat?: string;
        vircadia_updatedat?: string;

        // Babylon.js properties
        vircadia_babylonjs_lod_mode?: Babylon.LOD.E_Mode;
        vircadia_babylonjs_lod_auto?: boolean;
        vircadia_babylonjs_lod_distance?: number;
        vircadia_babylonjs_lod_size?: number;
        vircadia_babylonjs_lod_hide?: number;
        vircadia_babylonjs_billboard_mode?: Babylon.Billboard.E_Mode;
        vircadia_babylonjs_light_lightmap?: string;
        vircadia_babylonjs_light_level?: number;
        vircadia_babylonjs_light_color_space?: Babylon.Texture.E_ColorSpace;
        vircadia_babylonjs_light_texcoord?: number;
        vircadia_babylonjs_light_use_as_shadowmap?: boolean;
        vircadia_babylonjs_light_mode?: Babylon.Light.E_Mode;
        vircadia_babylonjs_script_agent_scripts?:
            Babylon.Script.I_AgentScript[];
        vircadia_babylonjs_script_persistent_scripts?:
            Babylon.Script.I_PersistentScript[];

        extras?: Record<string, unknown>;
    }

    export interface I_Accessor {
        vircadia_uuid: string;
        vircadia_world_uuid: string;
        name?: string;
        bufferView?: string;
        byteOffset?: number;
        componentType: number;
        normalized?: boolean;
        count: number;
        type: "SCALAR" | "VEC2" | "VEC3" | "VEC4" | "MAT2" | "MAT3" | "MAT4";
        max?: any[];
        min?: any[];
        sparse?: {
            count: number;
            indices: {
                bufferView: string;
                byteOffset?: number;
                componentType: number;
            };
            values: {
                bufferView: string;
                byteOffset?: number;
            };
        };
        extensions?: Record<string, unknown>;

        // Base properties

        vircadia_version?: string;
        vircadia_createdat?: string;
        vircadia_updatedat?: string;

        // Babylon.js properties
        vircadia_babylonjs_lod_mode?: Babylon.LOD.E_Mode;
        vircadia_babylonjs_lod_auto?: boolean;
        vircadia_babylonjs_lod_distance?: number;
        vircadia_babylonjs_lod_size?: number;
        vircadia_babylonjs_lod_hide?: number;
        vircadia_babylonjs_billboard_mode?: Babylon.Billboard.E_Mode;
        vircadia_babylonjs_light_lightmap?: string;
        vircadia_babylonjs_light_level?: number;
        vircadia_babylonjs_light_color_space?: Babylon.Texture.E_ColorSpace;
        vircadia_babylonjs_light_texcoord?: number;
        vircadia_babylonjs_light_use_as_shadowmap?: boolean;
        vircadia_babylonjs_light_mode?: Babylon.Light.E_Mode;
        vircadia_babylonjs_script_agent_scripts?:
            Babylon.Script.I_AgentScript[];
        vircadia_babylonjs_script_persistent_scripts?:
            Babylon.Script.I_PersistentScript[];

        extras?: Record<string, unknown>;
    }

    export interface I_UserProfile {
        id: string;
        username: string;
        full_name: string;
        role: Agent.Profile.E_Role;
        created_at: string;
        updated_at: string;
    }

    export enum E_Table {
        WORLD_GLTF = "world_gltf",
        AGENT_PROFILES = "agent_profiles",
        SCENES = "scenes",
        NODES = "nodes",
        MESHES = "meshes",
        MATERIALS = "materials",
        TEXTURES = "textures",
        IMAGES = "images",
        SAMPLERS = "samplers",
        ANIMATIONS = "animations",
        SKINS = "skins",
        CAMERAS = "cameras",
        BUFFERS = "buffers",
        BUFFER_VIEWS = "buffer_views",
        ACCESSORS = "accessors",
    }

    export enum E_Realtime_BroadcastChannel {
        AGENT_SIGNAL = "agent_signal",
    }

    export enum E_Realtime_PresenceChannel {
        AGENT_PRESENCE = "agent_presence",
    }
}

export namespace Agent {
    export namespace Profile {
        export enum E_Role {
            GUEST = "guest",
            MEMBER = "member",
            ADMIN = "admin",
        }
    }

    export namespace WebRTC {
        export enum E_SignalType {
            AGENT_Offer = "agent-agent-offer-packet",
            AGENT_Answer = "agent-agent-answer-packet",
            AGENT_ICE_Candidate = "agent-agent-ice-candidate-packet",
        }
    }

    export namespace Audio {
        export const DEFAULT_PANNER_OPTIONS: PannerOptions = {
            panningModel: "HRTF",
            distanceModel: "inverse",
            refDistance: 1,
            maxDistance: 10000,
        };
    }

    const MetadataSchema = z.object({
        agentId: z.string(),
        position: Primitive.S_Vector3,
        orientation: Primitive.S_Vector3,
        lastUpdated: z.string(),
    });

    export class C_Presence {
        agentId: string;
        position: Primitive.C_Vector3;
        orientation: Primitive.C_Vector3;
        lastUpdated: string;

        constructor(data: z.infer<typeof MetadataSchema>) {
            this.agentId = data.agentId;
            this.position = new Primitive.C_Vector3(
                data.position.x,
                data.position.y,
                data.position.z,
            );
            this.orientation = new Primitive.C_Vector3(
                data.orientation.x,
                data.orientation.y,
                data.orientation.z,
            );
            this.lastUpdated = data.lastUpdated;
        }

        static parse(obj: {
            agentId: string | any;
            position: { x: number; y: number; z: number } | any;
            orientation: { x: number; y: number; z: number } | any;
            lastUpdated: string | any;
        }): C_Presence {
            const parsedData = MetadataSchema.parse(obj);
            return new C_Presence(parsedData);
        }
    }
}

export namespace Server {
    export enum E_ProxySubdomain {
        SUPABASE_API = "supabase-api",
        SUPABASE_STORAGE = "supabase-storage",
        SUPABASE_GRAPHQL = "supabase-graphql",
        SUPABASE_INBUCKET = "supabase-inbucket",
        SUPABASE_STUDIO = "supabase-studio",
    }
}
