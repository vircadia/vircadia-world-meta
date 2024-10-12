from enum import Enum, IntEnum
from typing import List, Dict, Any, Optional, Union
from datetime import datetime
from dataclasses import dataclass, field
from .primitive import Vector3, Color3

class Babylon:
    class LOD:
        class Mode(str, Enum):
            DISTANCE = "distance"
            SIZE = "size"

        class Level(str, Enum):
            LOD0 = "LOD0"
            LOD1 = "LOD1"
            LOD2 = "LOD2"
            LOD3 = "LOD3"
            LOD4 = "LOD4"

    class Billboard:
        class Mode(IntEnum):
            BILLBOARDMODE_NONE = 0
            BILLBOARDMODE_X = 1
            BILLBOARDMODE_Y = 2
            BILLBOARDMODE_Z = 4
            BILLBOARDMODE_ALL = 7

    class Texture:
        class ColorSpace(str, Enum):
            LINEAR = "linear"
            SRGB = "sRGB"
            GAMMA = "gamma"

    class Light:
        LIGHTMAP_DATA_MESH_NAME = "vircadia_lightmapData"

        class Mode(str, Enum):
            DEFAULT = "default"
            SHADOWSONLY = "shadowsOnly"
            SPECULAR = "specular"

@dataclass
class BaseWorldGLTFTableProperties:
    vircadia_uuid: Optional[str] = None
    vircadia_version: Optional[str] = None
    vircadia_createdat: Optional[datetime] = None
    vircadia_updatedat: Optional[datetime] = None
    gltf_name: Optional[str] = None
    gltf_extensions: Optional[Dict[str, Any]] = None
    gltf_extras: Optional[Dict[str, Any]] = None

@dataclass
class TableWorldGLTF(BaseWorldGLTFTableProperties):
    vircadia_name: Optional[str] = None
    vircadia_metadata: Optional[Any] = None
    gltf_asset: Optional[Any] = None
    gltf_extensionsUsed: Optional[List[str]] = None
    gltf_extensionsRequired: Optional[List[str]] = None
    gltf_scene: Optional[int] = None

@dataclass
class TableScene(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: Optional[str] = None
    gltf_nodes: Optional[List[Any]] = None
    vircadia_babylonjs_scene_clearColor: Optional[Color3] = None
    vircadia_babylonjs_scene_ambientColor: Optional[Color3] = None
    vircadia_babylonjs_scene_gravity: Optional[Vector3] = None
    vircadia_babylonjs_scene_activeCamera: Optional[str] = None
    vircadia_babylonjs_scene_collisionsEnabled: Optional[bool] = None
    vircadia_babylonjs_scene_physicsEnabled: Optional[bool] = None
    vircadia_babylonjs_scene_physicsGravity: Optional[Vector3] = None
    vircadia_babylonjs_scene_physicsEngine: Optional[str] = None
    vircadia_babylonjs_scene_autoAnimate: Optional[bool] = None
    vircadia_babylonjs_scene_autoAnimateFrom: Optional[float] = None
    vircadia_babylonjs_scene_autoAnimateTo: Optional[float] = None
    vircadia_babylonjs_scene_autoAnimateLoop: Optional[bool] = None
    vircadia_babylonjs_scene_autoAnimateSpeed: Optional[float] = None

@dataclass
class TableNode(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: Optional[str] = None
    gltf_camera: Optional[str] = None
    gltf_children: Optional[List[Any]] = None
    gltf_skin: Optional[str] = None
    gltf_matrix: Optional[List[float]] = None
    gltf_mesh: Optional[str] = None
    gltf_rotation: Optional[List[float]] = None
    gltf_scale: Optional[List[float]] = None
    gltf_translation: Optional[List[float]] = None
    gltf_weights: Optional[List[Any]] = None
    vircadia_babylonjs_lod_mode: Optional[Babylon.LOD.Mode] = None
    vircadia_babylonjs_lod_auto: Optional[bool] = None
    vircadia_babylonjs_lod_distance: Optional[float] = None
    vircadia_babylonjs_lod_size: Optional[float] = None
    vircadia_babylonjs_lod_hide: Optional[float] = None
    vircadia_babylonjs_billboard_mode: Optional[Babylon.Billboard.Mode] = None
    vircadia_babylonjs_light_lightmap: Optional[str] = None
    vircadia_babylonjs_light_level: Optional[float] = None
    vircadia_babylonjs_light_color_space: Optional[Babylon.Texture.ColorSpace] = None
    vircadia_babylonjs_light_texcoord: Optional[int] = None
    vircadia_babylonjs_light_use_as_shadowmap: Optional[bool] = None
    vircadia_babylonjs_light_mode: Optional[Babylon.Light.Mode] = None
    vircadia_babylonjs_script_agent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_repo_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_repo_url: Optional[str] = None

@dataclass
class TableMesh(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: Optional[str] = None
    gltf_primitives: Optional[List[Any]] = None
    gltf_weights: Optional[List[Any]] = None
    vircadia_babylonjs_lod_mode: Optional[Babylon.LOD.Mode] = None
    vircadia_babylonjs_lod_auto: Optional[bool] = None
    vircadia_babylonjs_lod_distance: Optional[float] = None
    vircadia_babylonjs_lod_size: Optional[float] = None
    vircadia_babylonjs_lod_hide: Optional[float] = None
    vircadia_babylonjs_billboard_mode: Optional[Babylon.Billboard.Mode] = None
    vircadia_babylonjs_light_lightmap: Optional[str] = None
    vircadia_babylonjs_light_level: Optional[float] = None
    vircadia_babylonjs_light_color_space: Optional[Babylon.Texture.ColorSpace] = None
    vircadia_babylonjs_light_texcoord: Optional[int] = None
    vircadia_babylonjs_light_use_as_shadowmap: Optional[bool] = None
    vircadia_babylonjs_light_mode: Optional[Babylon.Light.Mode] = None
    vircadia_babylonjs_script_agent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_repo_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_repo_url: Optional[str] = None

@dataclass
class TableMaterial(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: Optional[str] = None
    gltf_pbrMetallicRoughness: Optional[Any] = None
    gltf_normalTexture: Optional[Any] = None
    gltf_occlusionTexture: Optional[Any] = None
    gltf_emissiveTexture: Optional[Any] = None
    gltf_emissiveFactor: Optional[List[float]] = None
    gltf_alphaMode: Optional[str] = None
    gltf_alphaCutoff: Optional[float] = None
    gltf_doubleSided: Optional[bool] = None
    vircadia_babylonjs_lod_mode: Optional[Babylon.LOD.Mode] = None
    vircadia_babylonjs_lod_auto: Optional[bool] = None
    vircadia_babylonjs_lod_distance: Optional[float] = None
    vircadia_babylonjs_lod_size: Optional[float] = None
    vircadia_babylonjs_lod_hide: Optional[float] = None
    vircadia_babylonjs_billboard_mode: Optional[Babylon.Billboard.Mode] = None
    vircadia_babylonjs_light_lightmap: Optional[str] = None
    vircadia_babylonjs_light_level: Optional[float] = None
    vircadia_babylonjs_light_color_space: Optional[Babylon.Texture.ColorSpace] = None
    vircadia_babylonjs_light_texcoord: Optional[int] = None
    vircadia_babylonjs_light_use_as_shadowmap: Optional[bool] = None
    vircadia_babylonjs_light_mode: Optional[Babylon.Light.Mode] = None
    vircadia_babylonjs_script_agent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_repo_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_repo_url: Optional[str] = None

@dataclass
class TableTexture(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: Optional[str] = None
    gltf_sampler: Optional[str] = None
    gltf_source: Optional[str] = None
    vircadia_babylonjs_lod_mode: Optional[Babylon.LOD.Mode] = None
    vircadia_babylonjs_lod_auto: Optional[bool] = None
    vircadia_babylonjs_lod_distance: Optional[float] = None
    vircadia_babylonjs_lod_size: Optional[float] = None
    vircadia_babylonjs_lod_hide: Optional[float] = None
    vircadia_babylonjs_billboard_mode: Optional[Babylon.Billboard.Mode] = None
    vircadia_babylonjs_light_lightmap: Optional[str] = None
    vircadia_babylonjs_light_level: Optional[float] = None
    vircadia_babylonjs_light_color_space: Optional[Babylon.Texture.ColorSpace] = None
    vircadia_babylonjs_light_texcoord: Optional[int] = None
    vircadia_babylonjs_light_use_as_shadowmap: Optional[bool] = None
    vircadia_babylonjs_light_mode: Optional[Babylon.Light.Mode] = None
    vircadia_babylonjs_script_agent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_repo_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_repo_url: Optional[str] = None

@dataclass
class TableImage(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: Optional[str] = None
    gltf_uri: Optional[str] = None
    gltf_mimeType: Optional[str] = None
    gltf_bufferView: Optional[str] = None
    vircadia_babylonjs_lod_mode: Optional[Babylon.LOD.Mode] = None
    vircadia_babylonjs_lod_auto: Optional[bool] = None
    vircadia_babylonjs_lod_distance: Optional[float] = None
    vircadia_babylonjs_lod_size: Optional[float] = None
    vircadia_babylonjs_lod_hide: Optional[float] = None
    vircadia_babylonjs_billboard_mode: Optional[Babylon.Billboard.Mode] = None
    vircadia_babylonjs_light_lightmap: Optional[str] = None
    vircadia_babylonjs_light_level: Optional[float] = None
    vircadia_babylonjs_light_color_space: Optional[Babylon.Texture.ColorSpace] = None
    vircadia_babylonjs_light_texcoord: Optional[int] = None
    vircadia_babylonjs_light_use_as_shadowmap: Optional[bool] = None
    vircadia_babylonjs_light_mode: Optional[Babylon.Light.Mode] = None
    vircadia_babylonjs_script_agent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_repo_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_repo_url: Optional[str] = None

@dataclass
class TableSampler(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: Optional[str] = None
    gltf_magFilter: Optional[int] = None
    gltf_minFilter: Optional[int] = None
    gltf_wrapS: Optional[int] = None
    gltf_wrapT: Optional[int] = None
    vircadia_babylonjs_lod_mode: Optional[Babylon.LOD.Mode] = None
    vircadia_babylonjs_lod_auto: Optional[bool] = None
    vircadia_babylonjs_lod_distance: Optional[float] = None
    vircadia_babylonjs_lod_size: Optional[float] = None
    vircadia_babylonjs_lod_hide: Optional[float] = None
    vircadia_babylonjs_billboard_mode: Optional[Babylon.Billboard.Mode] = None
    vircadia_babylonjs_light_lightmap: Optional[str] = None
    vircadia_babylonjs_light_level: Optional[float] = None
    vircadia_babylonjs_light_color_space: Optional[Babylon.Texture.ColorSpace] = None
    vircadia_babylonjs_light_texcoord: Optional[int] = None
    vircadia_babylonjs_light_use_as_shadowmap: Optional[bool] = None
    vircadia_babylonjs_light_mode: Optional[Babylon.Light.Mode] = None
    vircadia_babylonjs_script_agent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_repo_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_repo_url: Optional[str] = None

@dataclass
class TableAnimation(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: Optional[str] = None
    gltf_channels: Optional[List[Any]] = None
    gltf_samplers: Optional[List[Any]] = None
    vircadia_babylonjs_lod_mode: Optional[Babylon.LOD.Mode] = None
    vircadia_babylonjs_lod_auto: Optional[bool] = None
    vircadia_babylonjs_lod_distance: Optional[float] = None
    vircadia_babylonjs_lod_size: Optional[float] = None
    vircadia_babylonjs_lod_hide: Optional[float] = None
    vircadia_babylonjs_billboard_mode: Optional[Babylon.Billboard.Mode] = None
    vircadia_babylonjs_light_lightmap: Optional[str] = None
    vircadia_babylonjs_light_level: Optional[float] = None
    vircadia_babylonjs_light_color_space: Optional[Babylon.Texture.ColorSpace] = None
    vircadia_babylonjs_light_texcoord: Optional[int] = None
    vircadia_babylonjs_light_use_as_shadowmap: Optional[bool] = None
    vircadia_babylonjs_light_mode: Optional[Babylon.Light.Mode] = None
    vircadia_babylonjs_script_agent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_repo_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_repo_url: Optional[str] = None

@dataclass
class TableSkin(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: Optional[str] = None
    gltf_inverseBindMatrices: Optional[str] = None
    gltf_skeleton: Optional[str] = None
    gltf_joints: Optional[List[Any]] = None
    vircadia_babylonjs_lod_mode: Optional[Babylon.LOD.Mode] = None
    vircadia_babylonjs_lod_auto: Optional[bool] = None
    vircadia_babylonjs_lod_distance: Optional[float] = None
    vircadia_babylonjs_lod_size: Optional[float] = None
    vircadia_babylonjs_lod_hide: Optional[float] = None
    vircadia_babylonjs_billboard_mode: Optional[Babylon.Billboard.Mode] = None
    vircadia_babylonjs_light_lightmap: Optional[str] = None
    vircadia_babylonjs_light_level: Optional[float] = None
    vircadia_babylonjs_light_color_space: Optional[Babylon.Texture.ColorSpace] = None
    vircadia_babylonjs_light_texcoord: Optional[int] = None
    vircadia_babylonjs_light_use_as_shadowmap: Optional[bool] = None
    vircadia_babylonjs_light_mode: Optional[Babylon.Light.Mode] = None
    vircadia_babylonjs_script_agent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_repo_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_repo_url: Optional[str] = None

@dataclass
class TableCamera(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: Optional[str] = None
    gltf_type: Optional[str] = None
    gltf_orthographic: Optional[Any] = None
    gltf_perspective: Optional[Any] = None
    vircadia_babylonjs_lod_mode: Optional[Babylon.LOD.Mode] = None
    vircadia_babylonjs_lod_auto: Optional[bool] = None
    vircadia_babylonjs_lod_distance: Optional[float] = None
    vircadia_babylonjs_lod_size: Optional[float] = None
    vircadia_babylonjs_lod_hide: Optional[float] = None
    vircadia_babylonjs_billboard_mode: Optional[Babylon.Billboard.Mode] = None
    vircadia_babylonjs_light_lightmap: Optional[str] = None
    vircadia_babylonjs_light_level: Optional[float] = None
    vircadia_babylonjs_light_color_space: Optional[Babylon.Texture.ColorSpace] = None
    vircadia_babylonjs_light_texcoord: Optional[int] = None
    vircadia_babylonjs_light_use_as_shadowmap: Optional[bool] = None
    vircadia_babylonjs_light_mode: Optional[Babylon.Light.Mode] = None
    vircadia_babylonjs_script_agent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_repo_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_repo_url: Optional[str] = None

@dataclass
class TableBuffer(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: Optional[str] = None
    gltf_uri: Optional[str] = None
    gltf_byteLength: Optional[int] = None
    vircadia_babylonjs_lod_mode: Optional[Babylon.LOD.Mode] = None
    vircadia_babylonjs_lod_auto: Optional[bool] = None
    vircadia_babylonjs_lod_distance: Optional[float] = None
    vircadia_babylonjs_lod_size: Optional[float] = None
    vircadia_babylonjs_lod_hide: Optional[float] = None
    vircadia_babylonjs_billboard_mode: Optional[Babylon.Billboard.Mode] = None
    vircadia_babylonjs_light_lightmap: Optional[str] = None
    vircadia_babylonjs_light_level: Optional[float] = None
    vircadia_babylonjs_light_color_space: Optional[Babylon.Texture.ColorSpace] = None
    vircadia_babylonjs_light_texcoord: Optional[int] = None
    vircadia_babylonjs_light_use_as_shadowmap: Optional[bool] = None
    vircadia_babylonjs_light_mode: Optional[Babylon.Light.Mode] = None
    vircadia_babylonjs_script_agent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_repo_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_repo_url: Optional[str] = None

@dataclass
class TableBufferView(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: Optional[str] = None
    gltf_buffer: Optional[str] = None
    gltf_byteOffset: Optional[int] = None
    gltf_byteLength: Optional[int] = None
    gltf_byteStride: Optional[int] = None
    gltf_target: Optional[int] = None
    vircadia_babylonjs_lod_mode: Optional[Babylon.LOD.Mode] = None
    vircadia_babylonjs_lod_auto: Optional[bool] = None
    vircadia_babylonjs_lod_distance: Optional[float] = None
    vircadia_babylonjs_lod_size: Optional[float] = None
    vircadia_babylonjs_lod_hide: Optional[float] = None
    vircadia_babylonjs_billboard_mode: Optional[Babylon.Billboard.Mode] = None
    vircadia_babylonjs_light_lightmap: Optional[str] = None
    vircadia_babylonjs_light_level: Optional[float] = None
    vircadia_babylonjs_light_color_space: Optional[Babylon.Texture.ColorSpace] = None
    vircadia_babylonjs_light_texcoord: Optional[int] = None
    vircadia_babylonjs_light_use_as_shadowmap: Optional[bool] = None
    vircadia_babylonjs_light_mode: Optional[Babylon.Light.Mode] = None
    vircadia_babylonjs_script_agent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_repo_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_repo_url: Optional[str] = None

@dataclass
class TableAccessor(BaseWorldGLTFTableProperties):
    gltf_bufferView: Optional[str] = None
    gltf_byteOffset: Optional[int] = None
    gltf_componentType: Optional[int] = None
    gltf_normalized: Optional[bool] = None
    gltf_count: Optional[int] = None
    gltf_type: Optional[str] = None
    gltf_max: Optional[List[Any]] = None
    gltf_min: Optional[List[Any]] = None
    gltf_sparse: Optional[Dict[str, Any]] = None
    vircadia_babylonjs_lod_mode: Optional[Babylon.LOD.Mode] = None
    vircadia_babylonjs_lod_auto: Optional[bool] = None
    vircadia_babylonjs_lod_distance: Optional[float] = None
    vircadia_babylonjs_lod_size: Optional[float] = None
    vircadia_babylonjs_lod_hide: Optional[float] = None
    vircadia_babylonjs_billboard_mode: Optional[Babylon.Billboard.Mode] = None
    vircadia_babylonjs_light_lightmap: Optional[str] = None
    vircadia_babylonjs_light_level: Optional[float] = None
    vircadia_babylonjs_light_color_space: Optional[Babylon.Texture.ColorSpace] = None
    vircadia_babylonjs_light_texcoord: Optional[int] = None
    vircadia_babylonjs_light_use_as_shadowmap: Optional[bool] = None
    vircadia_babylonjs_light_mode: Optional[Babylon.Light.Mode] = None
    vircadia_babylonjs_script_agent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_agent_script_git_repo_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_raw_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_file_url: Optional[str] = None
    vircadia_babylonjs_script_persistent_script_git_repo_url: Optional[str] = None
    vircadia_world_uuid: Optional[str] = None

@dataclass
class TableUserProfile:
    id: Optional[str] = None
    username: Optional[str] = None
    full_name: Optional[str] = None
    role: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

@dataclass
class TableMetadata:
    metadata_id: Optional[str] = None
    key: Optional[str] = None
    values_text: Optional[List[str]] = None
    values_numeric: Optional[List[float]] = None
    values_boolean: Optional[List[bool]] = None
    values_timestamp: Optional[List[datetime]] = None
    createdat: Optional[datetime] = None
    updatedat: Optional[datetime] = None

class Table(str, Enum):
    WORLD_GLTF = "world_gltf"
    AGENT_PROFILES = "agent_profiles"
    SCENES = "world_gltf_scenes"
    NODES = "world_gltf_nodes"
    MESHES = "world_gltf_meshes"
    MATERIALS = "world_gltf_materials"
    TEXTURES = "world_gltf_textures"
    IMAGES = "world_gltf_images"
    SAMPLERS = "world_gltf_samplers"
    ANIMATIONS = "world_gltf_animations"
    SKINS = "world_gltf_skins"
    CAMERAS = "world_gltf_cameras"
    BUFFERS = "world_gltf_buffers"
    BUFFER_VIEWS = "world_gltf_buffer_views"
    ACCESSORS = "world_gltf_accessors"
    WORLD_GLTF_METADATA = "world_gltf_metadata"
    SCENES_METADATA = "world_gltf_scenes_metadata"
    NODES_METADATA = "world_gltf_nodes_metadata"
    MESHES_METADATA = "world_gltf_meshes_metadata"
    MATERIALS_METADATA = "world_gltf_materials_metadata"
    TEXTURES_METADATA = "world_gltf_textures_metadata"
    IMAGES_METADATA = "world_gltf_images_metadata"
    SAMPLERS_METADATA = "world_gltf_samplers_metadata"
    ANIMATIONS_METADATA = "world_gltf_animations_metadata"
    SKINS_METADATA = "world_gltf_skins_metadata"
    CAMERAS_METADATA = "world_gltf_cameras_metadata"
    BUFFERS_METADATA = "world_gltf_buffers_metadata"
    BUFFER_VIEWS_METADATA = "world_gltf_buffer_views_metadata"
    ACCESSORS_METADATA = "world_gltf_accessors_metadata"

class TableMutation(str, Enum):
    CREATE_AGENT_PROFILE = "create_agent_profile"
    UPDATE_AGENT_PROFILE = "update_agent_profile"
    DELETE_AGENT_PROFILE = "delete_agent_profile"
    CREATE_WORLD_GLTF = "create_world_gltf"
    UPDATE_WORLD_GLTF = "update_world_gltf"
    DELETE_WORLD_GLTF = "delete_world_gltf"
    CREATE_SCENE = "create_scene"
    UPDATE_SCENE = "update_scene"
    DELETE_SCENE = "delete_scene"
    CREATE_NODE = "create_node"
    UPDATE_NODE = "update_node"
    DELETE_NODE = "delete_node"
    CREATE_MESH = "create_mesh"
    UPDATE_MESH = "update_mesh"
    DELETE_MESH = "delete_mesh"
    CREATE_MATERIAL = "create_material"
    UPDATE_MATERIAL = "update_material"
    DELETE_MATERIAL = "delete_material"
    CREATE_TEXTURE = "create_texture"
    UPDATE_TEXTURE = "update_texture"
    DELETE_TEXTURE = "delete_texture"
    CREATE_IMAGE = "create_image"
    UPDATE_IMAGE = "update_image"
    DELETE_IMAGE = "delete_image"
    CREATE_SAMPLER = "create_sampler"
    UPDATE_SAMPLER = "update_sampler"
    DELETE_SAMPLER = "delete_sampler"
    CREATE_ANIMATION = "create_animation"
    UPDATE_ANIMATION = "update_animation"
    DELETE_ANIMATION = "delete_animation"
    CREATE_SKIN = "create_skin"
    UPDATE_SKIN = "update_skin"
    DELETE_SKIN = "delete_skin"
    CREATE_CAMERA = "create_camera"
    UPDATE_CAMERA = "update_camera"
    DELETE_CAMERA = "delete_camera"
    CREATE_BUFFER = "create_buffer"
    UPDATE_BUFFER = "update_buffer"
    DELETE_BUFFER = "delete_buffer"
    CREATE_BUFFER_VIEW = "create_buffer_view"
    UPDATE_BUFFER_VIEW = "update_buffer_view"
    DELETE_BUFFER_VIEW = "delete_buffer_view"
    CREATE_ACCESSOR = "create_accessor"
    UPDATE_ACCESSOR = "update_accessor"
    DELETE_ACCESSOR = "delete_accessor"
    CREATE_WORLD_GLTF_METADATA = "create_world_gltf_metadata"
    UPDATE_WORLD_GLTF_METADATA = "update_world_gltf_metadata"
    DELETE_WORLD_GLTF_METADATA = "delete_world_gltf_metadata"
    CREATE_SCENE_METADATA = "create_scene_metadata"
    UPDATE_SCENE_METADATA = "update_scene_metadata"
    DELETE_SCENE_METADATA = "delete_scene_metadata"
    CREATE_NODE_METADATA = "create_node_metadata"
    UPDATE_NODE_METADATA = "update_node_metadata"
    DELETE_NODE_METADATA = "delete_node_metadata"
    CREATE_MESH_METADATA = "create_mesh_metadata"
    UPDATE_MESH_METADATA = "update_mesh_metadata"
    DELETE_MESH_METADATA = "delete_mesh_metadata"
    CREATE_MATERIAL_METADATA = "create_material_metadata"
    UPDATE_MATERIAL_METADATA = "update_material_metadata"
    DELETE_MATERIAL_METADATA = "delete_material_metadata"
    CREATE_TEXTURE_METADATA = "create_texture_metadata"
    UPDATE_TEXTURE_METADATA = "update_texture_metadata"
    DELETE_TEXTURE_METADATA = "delete_texture_metadata"
    CREATE_IMAGE_METADATA = "create_image_metadata"
    UPDATE_IMAGE_METADATA = "update_image_metadata"
    DELETE_IMAGE_METADATA = "delete_image_metadata"
    CREATE_SAMPLER_METADATA = "create_sampler_metadata"
    UPDATE_SAMPLER_METADATA = "update_sampler_metadata"
    DELETE_SAMPLER_METADATA = "delete_sampler_metadata"
    CREATE_ANIMATION_METADATA = "create_animation_metadata"
    UPDATE_ANIMATION_METADATA = "update_animation_metadata"
    DELETE_ANIMATION_METADATA = "delete_animation_metadata"
    CREATE_SKIN_METADATA = "create_skin_metadata"
    UPDATE_SKIN_METADATA = "update_skin_metadata"
    DELETE_SKIN_METADATA = "delete_skin_metadata"
    CREATE_CAMERA_METADATA = "create_camera_metadata"
    UPDATE_CAMERA_METADATA = "update_camera_metadata"
    DELETE_CAMERA_METADATA = "delete_camera_metadata"
    CREATE_BUFFER_METADATA = "create_buffer_metadata"
    UPDATE_BUFFER_METADATA = "update_buffer_metadata"
    DELETE_BUFFER_METADATA = "delete_buffer_metadata"
    CREATE_BUFFER_VIEW_METADATA = "create_buffer_view_metadata"
    UPDATE_BUFFER_VIEW_METADATA = "update_buffer_view_metadata"
    DELETE_BUFFER_VIEW_METADATA = "delete_buffer_view_metadata"
    CREATE_ACCESSOR_METADATA = "create_accessor_metadata"
    UPDATE_ACCESSOR_METADATA = "update_accessor_metadata"
    DELETE_ACCESSOR_METADATA = "delete_accessor_metadata"