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
    export namespace Seed {
        export const DEFAULT_SEED_NAME = "boot_to_vircadia_world";
    }

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
    }

    export interface I_WorldConnection {
        supabaseClient: SupabaseClient;
        worldUrl: string;
        worldKey: string;
    }

    export interface I_Entity {
        general__uuid: string;
        general__name: string;
        general__type: string;
        general__semantic_version: string;
        general__created_at: string;
        general__updated_at: string;
        general__transform: {
            position: Primitive.I_Vector3;
            rotation: Primitive.I_Vector3;
            scale: Primitive.I_Vector3;
        };
        general__parent_entity_id?: string;

        babylonjs__mesh_is_instance?: boolean;
        babylonjs__mesh_instance_of_id?: string;
        babylonjs__mesh_material_id?: string;
        babylonjs__mesh_gltf_file_path?: string;
        babylonjs__mesh_gltf_data?: any;
        babylonjs__mesh_physics_properties?: any;
        babylonjs__mesh_joints?: any[];
        babylonjs__script_local_scripts?: any[];
        babylonjs__script_persistent_scripts?: any[];
        babylonjs__lod_mode?: string;
        babylonjs__lod_auto?: boolean;
        babylonjs__lod_distance?: number;
        babylonjs__lod_size?: number;
        babylonjs__lod_hide?: number;
        babylonjs__billboard_mode?: number;
        babylonjs__script_agent_script_raw_file_url?: string[];
        babylonjs__script_agent_script_git_file_path?: string[];
        babylonjs__script_agent_script_git_repo_url?: string[];
        babylonjs__script_persistent_script_raw_file_url?: string[];
        babylonjs__script_persistent_script_git_file_path?: string[];
        babylonjs__script_persistent_script_git_repo_url?: string[];

        babylonjs__light_type?: string;
        babylonjs__light_intensity?: number;
        babylonjs__light_range?: number;
        babylonjs__light_radius?: number;
        babylonjs__light_diffuse?: Primitive.I_Color3;
        babylonjs__light_specular?: Primitive.I_Color3;
        babylonjs__light_direction?: Primitive.I_Vector3;
        babylonjs__light_angle?: number;
        babylonjs__light_exponent?: number;
        babylonjs__light_ground_color?: Primitive.I_Color3;
        babylonjs__light_intensity_mode?: string;
        babylonjs__light_falloff_type?: string;
        babylonjs__shadow_enabled?: boolean;
        babylonjs__shadow_bias?: number;
        babylonjs__shadow_blur_kernel?: number;
        babylonjs__shadow_darkness?: number;
        babylonjs__shadow_frustum_size?: number;
        babylonjs__shadow_map_size?: number;
        babylonjs__shadow_quality?: string;
        babylonjs__exclude_mesh_ids?: string[];
        babylonjs__include_only_mesh_ids?: string[];

        zone__properties?: any;
        agent__ai_properties?: any;
        agent__inventory?: any;

        material__type?: string;
        material__ambient?: Primitive.I_Color3;
        material__diffuse?: Primitive.I_Color3;
        material__specular?: Primitive.I_Color3;
        material__emissive?: Primitive.I_Color3;
        material__alpha?: number;
        material__backFaceCulling?: boolean;
        material__wireframe?: boolean;
        material__diffuseTexture?: string;
        material__ambientTexture?: string;
        material__opacityTexture?: string;
        material__reflectionTexture?: string;
        material__emissiveTexture?: string;
        material__specularTexture?: string;
        material__bumpTexture?: string;
        material__lightmapTexture?: string;
        material__refractionTexture?: string;
        material__specularPower?: number;
        material__useAlphaFromDiffuseTexture?: boolean;
        material__useEmissiveAsIllumination?: boolean;
        material__useLightmapAsShadowmap?: boolean;
        material__roughness?: number;
        material__metallic?: number;
        material__useRoughnessFromMetallicTextureAlpha?: boolean;
        material__useRoughnessFromMetallicTextureGreen?: boolean;
        material__useMetallnessFromMetallicTextureBlue?: boolean;
        material__enableSpecularAntiAliasing?: boolean;
        material__environmentIntensity?: number;
        material__indexOfRefraction?: number;
        material__maxSimultaneousLights?: number;
        material__directIntensity?: number;
        material__environmentTexture?: string;
        material__reflectivityTexture?: string;
        material__metallicTexture?: string;
        material__microSurfaceTexture?: string;
        material__ambientTextureStrength?: number;
        material__ambientTextureImpactOnAnalyticalLights?: number;
        material__metallicF0Factor?: number;
        material__metallicReflectanceColor?: Primitive.I_Color3;
        material__reflectionColor?: Primitive.I_Color3;
        material__reflectivityColor?: Primitive.I_Color3;
        material__microSurface?: number;
        material__useMicroSurfaceFromReflectivityMapAlpha?: boolean;
        material__useAutoMicroSurfaceFromReflectivityMap?: boolean;
        material__useRadianceOverAlpha?: boolean;
        material__useSpecularOverAlpha?: boolean;
        material__usePhysicalLightFalloff?: boolean;
        material__useGLTFLightFalloff?: boolean;
        material__forceNormalForward?: boolean;
        material__enableIrradianceMap?: boolean;
        material__shader_code?: string;
        material__shader_parameters?: any;
        material__custom_properties?: any;

        babylonjs__physics_motion_type?: string;
        babylonjs__physics_mass?: number;
        babylonjs__physics_friction?: number;
        babylonjs__physics_restitution?: number;
        babylonjs__physics_linear_velocity?: Primitive.I_Vector3;
        babylonjs__physics_angular_velocity?: Primitive.I_Vector3;
        babylonjs__physics_linear_damping?: number;
        babylonjs__physics_angular_damping?: number;
        babylonjs__physics_collision_filter_group?: number;
        babylonjs__physics_collision_filter_mask?: number;
        babylonjs__physics_shape_type?: string;
        babylonjs__physics_shape_data?: any;
    }

    export interface I_EntityMetadata {
        metadata_id: string;
        entity_id: string;
        key: string;
        values_text?: string[];
        values_numeric?: number[];
        values_boolean?: boolean[];
        values_timestamp?: string[];
        createdat: string;
        updatedat: string;
    }

    export interface I_AgentProfile {
        id: string;
        username: string;
        role: string;
        createdat: string;
        updatedat: string;
    }

    export enum E_Table {
        ENTITIES = "entities",
        ENTITIES_METADATA = "entities_metadata",
        AGENT_PROFILES = "agent_profiles",
    }

    export enum E_Function {
        // Agent Profile Functions
        CREATE_AGENT_PROFILE = "create_agent_profile",
        UPDATE_AGENT_PROFILE = "update_agent_profile",
        DELETE_AGENT_PROFILE = "delete_agent_profile",
        IS_ADMIN = "is_admin",
        IS_MEMBER = "is_member",
        IS_GUEST = "is_guest",
    }
}

export namespace Agent {
    export namespace Profile {
        export enum E_Role {
            ADMIN = "admin",
            GUEST = "guest",
            MEMBER = "member",
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
