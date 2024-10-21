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

    interface I_Base_WorldGLTF_Table_Properties {
        vircadia_uuid?: string;
        vircadia_version?: string;
        vircadia_createdat?: string;
        vircadia_updatedat?: string;
        gltf_name?: string;
        gltf_extensions?: Record<string, unknown>;
        gltf_extras?: Record<string, unknown>;
    }

    export interface I_Table_WorldGLTF
        extends I_Base_WorldGLTF_Table_Properties {
        vircadia_name: string;
        vircadia_metadata: any;
        gltf_extensionsUsed?: string[];
        gltf_extensionsRequired?: string[];
        gltf_asset: any;
        gltf_scene?: number;
    }

    export interface I_Table_Scene extends I_Base_WorldGLTF_Table_Properties {
        vircadia_world_uuid: string;
        gltf_nodes?: any[];

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

    export interface I_Table_Node extends I_Base_WorldGLTF_Table_Properties {
        vircadia_world_uuid: string;
        gltf_camera?: string;
        gltf_children?: any[];
        gltf_skin?: string;
        gltf_matrix?: number[];
        gltf_mesh?: string;
        gltf_rotation?: number[];
        gltf_scale?: number[];
        gltf_translation?: number[];
        gltf_weights?: any[];

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
        vircadia_babylonjs_script_agent_script_raw_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_repo_url?: string;
        vircadia_babylonjs_script_persistent_script_raw_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_repo_url?: string;
    }

    export interface I_Table_Mesh extends I_Base_WorldGLTF_Table_Properties {
        vircadia_world_uuid: string;
        gltf_primitives: any[];
        gltf_weights?: any[];

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
        vircadia_babylonjs_script_agent_script_raw_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_repo_url?: string;
        vircadia_babylonjs_script_persistent_script_raw_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_repo_url?: string;
    }

    export interface I_Table_Material
        extends I_Base_WorldGLTF_Table_Properties {
        vircadia_world_uuid: string;
        gltf_pbrMetallicRoughness?: any;
        gltf_normalTexture?: any;
        gltf_occlusionTexture?: any;
        gltf_emissiveTexture?: any;
        gltf_emissiveFactor?: number[];
        gltf_alphaMode?: "OPAQUE" | "MASK" | "BLEND";
        gltf_alphaCutoff?: number;
        gltf_doubleSided?: boolean;

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
        vircadia_babylonjs_script_agent_script_raw_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_repo_url?: string;
        vircadia_babylonjs_script_persistent_script_raw_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_repo_url?: string;
    }

    export interface I_Table_Texture extends I_Base_WorldGLTF_Table_Properties {
        vircadia_world_uuid: string;
        gltf_sampler?: string;
        gltf_source?: string;

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
        vircadia_babylonjs_script_agent_script_raw_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_repo_url?: string;
        vircadia_babylonjs_script_persistent_script_raw_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_repo_url?: string;
    }

    export interface I_Table_Image extends I_Base_WorldGLTF_Table_Properties {
        vircadia_world_uuid: string;
        gltf_uri?: string;
        gltf_mimeType?: string;
        gltf_bufferView?: string;

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
        vircadia_babylonjs_script_agent_script_raw_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_repo_url?: string;
        vircadia_babylonjs_script_persistent_script_raw_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_repo_url?: string;
    }

    export interface I_Table_Sampler extends I_Base_WorldGLTF_Table_Properties {
        vircadia_world_uuid: string;
        gltf_magFilter?: number;
        gltf_minFilter?: number;
        gltf_wrapS?: number;
        gltf_wrapT?: number;

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
        vircadia_babylonjs_script_agent_script_raw_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_repo_url?: string;
        vircadia_babylonjs_script_persistent_script_raw_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_repo_url?: string;
    }

    export interface I_Table_Animation
        extends I_Base_WorldGLTF_Table_Properties {
        vircadia_world_uuid: string;
        gltf_channels: any[];
        gltf_samplers: any[];

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
        vircadia_babylonjs_script_agent_script_raw_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_repo_url?: string;
        vircadia_babylonjs_script_persistent_script_raw_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_repo_url?: string;
    }

    export interface I_Table_Skin extends I_Base_WorldGLTF_Table_Properties {
        vircadia_world_uuid: string;
        gltf_inverseBindMatrices?: string;
        gltf_skeleton?: string;
        gltf_joints: any[];

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
        vircadia_babylonjs_script_agent_script_raw_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_repo_url?: string;
        vircadia_babylonjs_script_persistent_script_raw_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_repo_url?: string;
    }

    export interface I_Table_Camera extends I_Base_WorldGLTF_Table_Properties {
        vircadia_world_uuid: string;
        gltf_type: "perspective" | "orthographic";
        gltf_orthographic?: any;
        gltf_perspective?: any;

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
        vircadia_babylonjs_script_agent_script_raw_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_repo_url?: string;
        vircadia_babylonjs_script_persistent_script_raw_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_repo_url?: string;
    }

    export interface I_Table_Buffer extends I_Base_WorldGLTF_Table_Properties {
        vircadia_world_uuid: string;
        gltf_uri?: string;
        gltf_byteLength: number;

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
        vircadia_babylonjs_script_agent_script_raw_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_repo_url?: string;
        vircadia_babylonjs_script_persistent_script_raw_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_repo_url?: string;
    }

    export interface I_Table_BufferView
        extends I_Base_WorldGLTF_Table_Properties {
        vircadia_world_uuid: string;
        gltf_buffer: string;
        gltf_byteOffset?: number;
        gltf_byteLength: number;
        gltf_byteStride?: number;
        gltf_target?: number;

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
        vircadia_babylonjs_script_agent_script_raw_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_repo_url?: string;
        vircadia_babylonjs_script_persistent_script_raw_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_repo_url?: string;
    }

    export interface I_Table_Accessor
        extends I_Base_WorldGLTF_Table_Properties {
        vircadia_world_uuid: string;
        gltf_bufferView?: string;
        gltf_byteOffset?: number;
        gltf_componentType: number;
        gltf_normalized?: boolean;
        gltf_count: number;
        gltf_type:
            | "SCALAR"
            | "VEC2"
            | "VEC3"
            | "VEC4"
            | "MAT2"
            | "MAT3"
            | "MAT4";
        gltf_max?: any[];
        gltf_min?: any[];
        gltf_sparse?: {
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
        vircadia_babylonjs_script_agent_script_raw_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_file_url?: string;
        vircadia_babylonjs_script_agent_script_git_repo_url?: string;
        vircadia_babylonjs_script_persistent_script_raw_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_file_url?: string;
        vircadia_babylonjs_script_persistent_script_git_repo_url?: string;
    }

    export interface I_Table_UserProfile {
        id: string;
        username: string;
        full_name: string;
        role: Agent.Profile.E_Role;
        created_at: string;
        updated_at: string;
    }

    export interface I_Table_Metadata {
        metadata_id: string;
        key: string;
        values_text?: string[];
        values_numeric?: number[];
        values_boolean?: boolean[];
        values_timestamp?: string[];
        createdat: string;
        updatedat: string;
    }

    export enum E_Table {
        WORLD_GLTF = "world_gltf",
        AGENT_PROFILES = "agent_profiles",
        SCENES = "world_gltf_scenes",
        NODES = "world_gltf_nodes",
        MESHES = "world_gltf_meshes",
        MATERIALS = "world_gltf_materials",
        TEXTURES = "world_gltf_textures",
        IMAGES = "world_gltf_images",
        SAMPLERS = "world_gltf_samplers",
        ANIMATIONS = "world_gltf_animations",
        SKINS = "world_gltf_skins",
        CAMERAS = "world_gltf_cameras",
        BUFFERS = "world_gltf_buffers",
        BUFFER_VIEWS = "world_gltf_buffer_views",
        ACCESSORS = "world_gltf_accessors",
        // Add metadata tables
        WORLD_GLTF_METADATA = "world_gltf_metadata",
        SCENES_METADATA = "world_gltf_scenes_metadata",
        NODES_METADATA = "world_gltf_nodes_metadata",
        MESHES_METADATA = "world_gltf_meshes_metadata",
        MATERIALS_METADATA = "world_gltf_materials_metadata",
        TEXTURES_METADATA = "world_gltf_textures_metadata",
        IMAGES_METADATA = "world_gltf_images_metadata",
        SAMPLERS_METADATA = "world_gltf_samplers_metadata",
        ANIMATIONS_METADATA = "world_gltf_animations_metadata",
        SKINS_METADATA = "world_gltf_skins_metadata",
        CAMERAS_METADATA = "world_gltf_cameras_metadata",
        BUFFERS_METADATA = "world_gltf_buffers_metadata",
        BUFFER_VIEWS_METADATA = "world_gltf_buffer_views_metadata",
        ACCESSORS_METADATA = "world_gltf_accessors_metadata",
    }

    export enum E_Table_Mutation {
        // Agent Mutations
        CREATE_AGENT_PROFILE = "create_agent_profile",
        UPDATE_AGENT_PROFILE = "update_agent_profile",
        DELETE_AGENT_PROFILE = "delete_agent_profile",

        // World GLTF Mutations
        CREATE_WORLD_GLTF = "create_world_gltf",
        UPDATE_WORLD_GLTF = "update_world_gltf",
        DELETE_WORLD_GLTF = "delete_world_gltf",

        // Scene Mutations
        CREATE_SCENE = "create_scene",
        UPDATE_SCENE = "update_scene",
        DELETE_SCENE = "delete_scene",

        // Node Mutations
        CREATE_NODE = "create_node",
        UPDATE_NODE = "update_node",
        DELETE_NODE = "delete_node",

        // Mesh Mutations
        CREATE_MESH = "create_mesh",
        UPDATE_MESH = "update_mesh",
        DELETE_MESH = "delete_mesh",

        // Material Mutations
        CREATE_MATERIAL = "create_material",
        UPDATE_MATERIAL = "update_material",
        DELETE_MATERIAL = "delete_material",

        // Texture Mutations
        CREATE_TEXTURE = "create_texture",
        UPDATE_TEXTURE = "update_texture",
        DELETE_TEXTURE = "delete_texture",

        // Image Mutations
        CREATE_IMAGE = "create_image",
        UPDATE_IMAGE = "update_image",
        DELETE_IMAGE = "delete_image",

        // Sampler Mutations
        CREATE_SAMPLER = "create_sampler",
        UPDATE_SAMPLER = "update_sampler",
        DELETE_SAMPLER = "delete_sampler",

        // Animation Mutations
        CREATE_ANIMATION = "create_animation",
        UPDATE_ANIMATION = "update_animation",
        DELETE_ANIMATION = "delete_animation",

        // Skin Mutations
        CREATE_SKIN = "create_skin",
        UPDATE_SKIN = "update_skin",
        DELETE_SKIN = "delete_skin",

        // Camera Mutations
        CREATE_CAMERA = "create_camera",
        UPDATE_CAMERA = "update_camera",
        DELETE_CAMERA = "delete_camera",

        // Buffer Mutations
        CREATE_BUFFER = "create_buffer",
        UPDATE_BUFFER = "update_buffer",
        DELETE_BUFFER = "delete_buffer",

        // Buffer View Mutations
        CREATE_BUFFER_VIEW = "create_buffer_view",
        UPDATE_BUFFER_VIEW = "update_buffer_view",
        DELETE_BUFFER_VIEW = "delete_buffer_view",

        // Accessor Mutations
        CREATE_ACCESSOR = "create_accessor",
        UPDATE_ACCESSOR = "update_accessor",
        DELETE_ACCESSOR = "delete_accessor",

        // Metadata Mutations
        CREATE_WORLD_GLTF_METADATA = "create_world_gltf_metadata",
        UPDATE_WORLD_GLTF_METADATA = "update_world_gltf_metadata",
        DELETE_WORLD_GLTF_METADATA = "delete_world_gltf_metadata",
        CREATE_SCENE_METADATA = "create_scene_metadata",
        UPDATE_SCENE_METADATA = "update_scene_metadata",
        DELETE_SCENE_METADATA = "delete_scene_metadata",
        CREATE_NODE_METADATA = "create_node_metadata",
        UPDATE_NODE_METADATA = "update_node_metadata",
        DELETE_NODE_METADATA = "delete_node_metadata",
        CREATE_MESH_METADATA = "create_mesh_metadata",
        UPDATE_MESH_METADATA = "update_mesh_metadata",
        DELETE_MESH_METADATA = "delete_mesh_metadata",
        CREATE_MATERIAL_METADATA = "create_material_metadata",
        UPDATE_MATERIAL_METADATA = "update_material_metadata",
        DELETE_MATERIAL_METADATA = "delete_material_metadata",
        CREATE_TEXTURE_METADATA = "create_texture_metadata",
        UPDATE_TEXTURE_METADATA = "update_texture_metadata",
        DELETE_TEXTURE_METADATA = "delete_texture_metadata",
        CREATE_IMAGE_METADATA = "create_image_metadata",
        UPDATE_IMAGE_METADATA = "update_image_metadata",
        DELETE_IMAGE_METADATA = "delete_image_metadata",
        CREATE_SAMPLER_METADATA = "create_sampler_metadata",
        UPDATE_SAMPLER_METADATA = "update_sampler_metadata",
        DELETE_SAMPLER_METADATA = "delete_sampler_metadata",
        CREATE_ANIMATION_METADATA = "create_animation_metadata",
        UPDATE_ANIMATION_METADATA = "update_animation_metadata",
        DELETE_ANIMATION_METADATA = "delete_animation_metadata",
        CREATE_SKIN_METADATA = "create_skin_metadata",
        UPDATE_SKIN_METADATA = "update_skin_metadata",
        DELETE_SKIN_METADATA = "delete_skin_metadata",
        CREATE_CAMERA_METADATA = "create_camera_metadata",
        UPDATE_CAMERA_METADATA = "update_camera_metadata",
        DELETE_CAMERA_METADATA = "delete_camera_metadata",
        CREATE_BUFFER_METADATA = "create_buffer_metadata",
        UPDATE_BUFFER_METADATA = "update_buffer_metadata",
        DELETE_BUFFER_METADATA = "delete_buffer_metadata",
        CREATE_BUFFER_VIEW_METADATA = "create_buffer_view_metadata",
        UPDATE_BUFFER_VIEW_METADATA = "update_buffer_view_metadata",
        DELETE_BUFFER_VIEW_METADATA = "delete_buffer_view_metadata",
        CREATE_ACCESSOR_METADATA = "create_accessor_metadata",
        UPDATE_ACCESSOR_METADATA = "update_accessor_metadata",
        DELETE_ACCESSOR_METADATA = "delete_accessor_metadata",
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