from enum import Enum
from typing import List, Dict, Any, Optional, Union
from datetime import datetime
from pydantic import BaseModel, Field

class Primitive:
    class Vector3(BaseModel):
        x: float
        y: float
        z: float

    class Color3(BaseModel):
        r: float
        g: float
        b: float

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
        class Mode(int, Enum):
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

class BaseWorldGLTFTableProperties(BaseModel):
    name: Optional[str] = None
    lextras: Optional[Dict[str, Any]] = None
    vircadia_uuid: Optional[str] = None
    vircadia_version: Optional[str] = None
    vircadia_createdat: Optional[datetime] = None
    vircadia_updatedat: Optional[datetime] = None

class TableWorldGLTF(BaseWorldGLTFTableProperties):
    name: str = ""
    version: str
    metadata: Any
    defaultScene: Optional[str] = None
    extensionsUsed: Optional[List[str]] = None
    extensionsRequired: Optional[List[str]] = None
    extensions: Optional[Dict[str, Any]] = None
    asset: Any

class TableScene(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: str
    name: Optional[str] = None
    nodes: Optional[List[Any]] = None
    extensions: Optional[Dict[str, Any]] = None
    vircadia_babylonjs_scene_clearColor: Optional[Primitive.Color3] = None
    vircadia_babylonjs_scene_ambientColor: Optional[Primitive.Color3] = None
    vircadia_babylonjs_scene_gravity: Optional[Primitive.Vector3] = None
    vircadia_babylonjs_scene_activeCamera: Optional[str] = None
    vircadia_babylonjs_scene_collisionsEnabled: Optional[bool] = None
    vircadia_babylonjs_scene_physicsEnabled: Optional[bool] = None
    vircadia_babylonjs_scene_physicsGravity: Optional[Primitive.Vector3] = None
    vircadia_babylonjs_scene_physicsEngine: Optional[str] = None
    vircadia_babylonjs_scene_autoAnimate: Optional[bool] = None
    vircadia_babylonjs_scene_autoAnimateFrom: Optional[float] = None
    vircadia_babylonjs_scene_autoAnimateTo: Optional[float] = None
    vircadia_babylonjs_scene_autoAnimateLoop: Optional[bool] = None
    vircadia_babylonjs_scene_autoAnimateSpeed: Optional[float] = None

class TableNode(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: str
    name: Optional[str] = None
    camera: Optional[str] = None
    children: Optional[List[Any]] = None
    skin: Optional[str] = None
    matrix: Optional[List[float]] = None
    mesh: Optional[str] = None
    rotation: Optional[List[float]] = None
    scale: Optional[List[float]] = None
    translation: Optional[List[float]] = None
    weights: Optional[List[Any]] = None
    extensions: Optional[Dict[str, Any]] = None
    vircadia_updatedat: Optional[datetime] = None
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
    vircadia_babylonjs_script_agent_scripts: Optional[List[str]] = None
    vircadia_babylonjs_script_persistent_scripts: Optional[List[str]] = None

class TableMesh(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: str
    name: Optional[str] = None
    primitives: List[Any]
    weights: Optional[List[Any]] = None
    extensions: Optional[Dict[str, Any]] = None
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
    vircadia_babylonjs_script_agent_scripts: Optional[List[str]] = None
    vircadia_babylonjs_script_persistent_scripts: Optional[List[str]] = None

class TableMaterial(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: str
    name: Optional[str] = None
    pbrMetallicRoughness: Optional[Any] = None
    normalTexture: Optional[Any] = None
    occlusionTexture: Optional[Any] = None
    emissiveTexture: Optional[Any] = None
    emissiveFactor: Optional[List[float]] = None
    alphaMode: Optional[str] = Field(None, pattern="^(OPAQUE|MASK|BLEND)$")
    alphaCutoff: Optional[float] = None
    doubleSided: Optional[bool] = None
    extensions: Optional[Dict[str, Any]] = None
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
    vircadia_babylonjs_script_agent_scripts: Optional[List[str]] = None
    vircadia_babylonjs_script_persistent_scripts: Optional[List[str]] = None

class TableTexture(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: str
    name: Optional[str] = None
    sampler: Optional[str] = None
    source: Optional[str] = None
    extensions: Optional[Dict[str, Any]] = None
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
    vircadia_babylonjs_script_agent_scripts: Optional[List[str]] = None
    vircadia_babylonjs_script_persistent_scripts: Optional[List[str]] = None

class TableImage(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: str
    name: Optional[str] = None
    uri: Optional[str] = None
    mimeType: Optional[str] = None
    bufferView: Optional[str] = None
    extensions: Optional[Dict[str, Any]] = None
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
    vircadia_babylonjs_script_agent_scripts: Optional[List[str]] = None
    vircadia_babylonjs_script_persistent_scripts: Optional[List[str]] = None

class TableSampler(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: str
    name: Optional[str] = None
    magFilter: Optional[int] = None
    minFilter: Optional[int] = None
    wrapS: Optional[int] = None
    wrapT: Optional[int] = None
    extensions: Optional[Dict[str, Any]] = None
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
    vircadia_babylonjs_script_agent_scripts: Optional[List[str]] = None
    vircadia_babylonjs_script_persistent_scripts: Optional[List[str]] = None

class TableAnimation(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: str
    name: Optional[str] = None
    channels: List[Any]
    samplers: List[Any]
    extensions: Optional[Dict[str, Any]] = None
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
    vircadia_babylonjs_script_agent_scripts: Optional[List[str]] = None
    vircadia_babylonjs_script_persistent_scripts: Optional[List[str]] = None

class TableSkin(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: str
    name: Optional[str] = None
    inverseBindMatrices: Optional[str] = None
    skeleton: Optional[str] = None
    joints: List[Any]
    extensions: Optional[Dict[str, Any]] = None
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
    vircadia_babylonjs_script_agent_scripts: Optional[List[str]] = None
    vircadia_babylonjs_script_persistent_scripts: Optional[List[str]] = None

class TableCamera(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: str
    name: Optional[str] = None
    type: str = Field(..., pattern="^(perspective|orthographic)$")
    orthographic: Optional[Any] = None
    perspective: Optional[Any] = None
    extensions: Optional[Dict[str, Any]] = None
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
    vircadia_babylonjs_script_agent_scripts: Optional[List[str]] = None
    vircadia_babylonjs_script_persistent_scripts: Optional[List[str]] = None

class TableBuffer(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: str
    name: Optional[str] = None
    uri: Optional[str] = None
    byteLength: int
    data: Optional[bytes] = None
    extensions: Optional[Dict[str, Any]] = None
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
    vircadia_babylonjs_script_agent_scripts: Optional[List[str]] = None
    vircadia_babylonjs_script_persistent_scripts: Optional[List[str]] = None

class TableBufferView(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: str
    name: Optional[str] = None
    buffer: str
    byteOffset: Optional[int] = None
    byteLength: int
    byteStride: Optional[int] = None
    target: Optional[int] = None
    extensions: Optional[Dict[str, Any]] = None
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
    vircadia_babylonjs_script_agent_scripts: Optional[List[str]] = None
    vircadia_babylonjs_script_persistent_scripts: Optional[List[str]] = None

class TableAccessor(BaseWorldGLTFTableProperties):
    vircadia_world_uuid: str
    name: Optional[str] = None
    bufferView: Optional[str] = None
    byteOffset: Optional[int] = None
    componentType: int
    normalized: Optional[bool] = None
    count: int
    type: str = Field(..., pattern="^(SCALAR|VEC2|VEC3|VEC4|MAT2|MAT3|MAT4)$")
    max: Optional[List[Any]] = None
    min: Optional[List[Any]] = None
    sparse: Optional[Dict[str, Any]] = None
    extensions: Optional[Dict[str, Any]] = None
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
    vircadia_babylonjs_script_agent_scripts: Optional[List[str]] = None
    vircadia_babylonjs_script_persistent_scripts: Optional[List[str]] = None

class TableUserProfile(BaseModel):
    id: str
    username: str
    full_name: str
    role: str  # Assuming Agent.Profile.E_Role is a string enum
    created_at: datetime
    updated_at: datetime

class TableMetadata(BaseModel):
    metadata_id: str
    parent_id: str
    key: str
    value_text: Optional[List[str]] = None
    value_numeric: Optional[List[float]] = None
    value_boolean: Optional[List[bool]] = None
    value_timestamp: Optional[List[datetime]] = None
    createdat: datetime
    updatedat: datetime

class Table(str, Enum):
    WORLD_GLTF = "world_gltf"
    AGENT_PROFILES = "agent_profiles"
    SCENES = "scenes"
    NODES = "nodes"
    MESHES = "meshes"
    MATERIALS = "materials"
    TEXTURES = "textures"
    IMAGES = "images"
    SAMPLERS = "samplers"
    ANIMATIONS = "animations"
    SKINS = "skins"
    CAMERAS = "cameras"
    BUFFERS = "buffers"
    BUFFER_VIEWS = "buffer_views"
    ACCESSORS = "accessors"
    WORLD_GLTF_METADATA = "world_gltf_metadata"
    SCENES_METADATA = "scenes_metadata"
    NODES_METADATA = "nodes_metadata"
    MESHES_METADATA = "meshes_metadata"
    MATERIALS_METADATA = "materials_metadata"
    TEXTURES_METADATA = "textures_metadata"
    IMAGES_METADATA = "images_metadata"
    SAMPLERS_METADATA = "samplers_metadata"
    ANIMATIONS_METADATA = "animations_metadata"
    SKINS_METADATA = "skins_metadata"
    CAMERAS_METADATA = "cameras_metadata"
    BUFFERS_METADATA = "buffers_metadata"
    BUFFER_VIEWS_METADATA = "buffer_views_metadata"
    ACCESSORS_METADATA = "accessors_metadata"

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

class RealtimeBroadcastChannel(str, Enum):
    AGENT_SIGNAL = "agent_signal"

class RealtimePresenceChannel(str, Enum):
    AGENT_PRESENCE = "agent_presence"
