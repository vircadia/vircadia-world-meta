from enum import Enum
from typing import List, Optional, Any, Dict, Union
from datetime import datetime
from pydantic import BaseModel, Field

class Primitive_Vector3(BaseModel):
    x: float = Field(default=0)
    y: float = Field(default=0)
    z: float = Field(default=0)

class Primitive_Color3(BaseModel):
    r: float = Field(default=0)
    g: float = Field(default=0)
    b: float = Field(default=0)

class World_LODMode(str, Enum):
    DISTANCE = "distance"
    SIZE = "size"

class World_LODLevel(str, Enum):
    LOD0 = "LOD0"
    LOD1 = "LOD1"
    LOD2 = "LOD2"
    LOD3 = "LOD3"
    LOD4 = "LOD4"

class World_BillboardMode(int, Enum):
    BILLBOARDMODE_NONE = 0
    BILLBOARDMODE_X = 1
    BILLBOARDMODE_Y = 2
    BILLBOARDMODE_Z = 4
    BILLBOARDMODE_ALL = 7

class World_TextureColorSpace(str, Enum):
    LINEAR = "linear"
    SRGB = "sRGB"
    GAMMA = "gamma"

class World_LightMode(str, Enum):
    DEFAULT = "default"
    SHADOWSONLY = "shadowsOnly"
    SPECULAR = "specular"

class World_LOD(BaseModel):
    mode: Optional[World_LODMode] = None
    auto: Optional[bool] = None
    distance: Optional[float] = None
    size: Optional[float] = None
    hide: Optional[float] = None

class World_Billboard(BaseModel):
    mode: Optional[World_BillboardMode] = None

class World_Lightmap(BaseModel):
    lightmap: Optional[str] = None
    level: Optional[int] = None
    color_space: Optional[World_TextureColorSpace] = None
    texcoord: Optional[int] = None
    use_as_shadowmap: Optional[bool] = None
    mode: Optional[World_LightMode] = None

class World_AgentScript(BaseModel):
    script: str
    unitTest: str

class World_PersistentScript(BaseModel):
    runnerAgentId: str
    script: str
    unitTest: str

class World_BabylonJS(BaseModel):
    lod: Optional[World_LOD] = None
    billboard: Optional[World_Billboard] = None
    lightmap: Optional[World_Lightmap] = None
    script: Optional[Dict[str, Union[List[World_AgentScript], List[World_PersistentScript]]]] = None

class World_CommonEntityProperties(BaseModel):
    vircadia_uuid: str
    vircadia_world_uuid: str
    vircadia_version: Optional[str] = None
    vircadia_createdat: Optional[datetime] = None
    vircadia_updatedat: Optional[datetime] = None
    name: Optional[str] = None
    extras: Optional[Dict[str, Any]] = None
    vircadia_babylonjs_lod_mode: Optional[str] = None
    vircadia_babylonjs_lod_auto: Optional[bool] = None
    vircadia_babylonjs_lod_distance: Optional[float] = None
    vircadia_babylonjs_lod_size: Optional[float] = None
    vircadia_babylonjs_lod_hide: Optional[float] = None
    vircadia_babylonjs_billboard_mode: Optional[int] = None
    vircadia_babylonjs_light_lightmap: Optional[str] = None
    vircadia_babylonjs_light_level: Optional[float] = None
    vircadia_babylonjs_light_color_space: Optional[str] = None
    vircadia_babylonjs_light_texcoord: Optional[int] = None
    vircadia_babylonjs_light_use_as_shadowmap: Optional[bool] = None
    vircadia_babylonjs_light_mode: Optional[str] = None
    vircadia_babylonjs_script_agent_scripts: Optional[Dict[str, Any]] = None
    vircadia_babylonjs_script_persistent_scripts: Optional[Dict[str, Any]] = None

class World_SceneEntityProperties(World_CommonEntityProperties):
    clearColor: Optional[Primitive_Color3] = None
    ambientColor: Optional[Primitive_Color3] = None
    gravity: Optional[Primitive_Vector3] = None
    activeCamera: Optional[str] = None
    collisionsEnabled: Optional[bool] = None
    physicsEnabled: Optional[bool] = None
    physicsGravity: Optional[Primitive_Vector3] = None
    physicsEngine: Optional[str] = None
    autoAnimate: Optional[bool] = None
    autoAnimateFrom: Optional[int] = None
    autoAnimateTo: Optional[int] = None
    autoAnimateLoop: Optional[bool] = None
    autoAnimateSpeed: Optional[float] = None

class World_WorldGLTF(BaseModel):
    vircadia_uuid: str
    name: str
    version: str
    vircadia_createdat: datetime
    vircadia_updatedat: datetime
    metadata: Any
    defaultScene: Optional[str] = None
    extensionsUsed: Optional[List[str]] = None
    extensionsRequired: Optional[List[str]] = None
    extensions: Optional[Dict[str, Any]] = None
    extras: Optional[Dict[str, Any]] = None
    asset: Any
    vircadia_version: Optional[str] = None

class World_Scene(BaseModel):
    vircadia_uuid: str
    vircadia_world_uuid: str
    name: Optional[str] = None
    nodes: Optional[List[Any]] = None
    extensions: Optional[Dict[str, Any]] = None
    extras: Optional[Dict[str, Any]] = None
    vircadia_version: Optional[str] = None
    vircadia_createdat: Optional[datetime] = None
    vircadia_updatedat: Optional[datetime] = None
    vircadia_babylonjs_scene_clearColor: Optional[Dict[str, float]] = None
    vircadia_babylonjs_scene_ambientColor: Optional[Dict[str, float]] = None
    vircadia_babylonjs_scene_gravity: Optional[Dict[str, float]] = None
    vircadia_babylonjs_scene_activeCamera: Optional[str] = None
    vircadia_babylonjs_scene_collisionsEnabled: Optional[bool] = None
    vircadia_babylonjs_scene_physicsEnabled: Optional[bool] = None
    vircadia_babylonjs_scene_physicsGravity: Optional[Dict[str, float]] = None
    vircadia_babylonjs_scene_physicsEngine: Optional[str] = None
    vircadia_babylonjs_scene_autoAnimate: Optional[bool] = None
    vircadia_babylonjs_scene_autoAnimateFrom: Optional[float] = None
    vircadia_babylonjs_scene_autoAnimateTo: Optional[float] = None
    vircadia_babylonjs_scene_autoAnimateLoop: Optional[bool] = None
    vircadia_babylonjs_scene_autoAnimateSpeed: Optional[float] = None

class World_Node(World_CommonEntityProperties):
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

class World_Mesh(World_CommonEntityProperties):
    primitives: List[Any]
    weights: Optional[List[Any]] = None
    extensions: Optional[Dict[str, Any]] = None

class World_Material(World_CommonEntityProperties):
    pbrMetallicRoughness: Optional[Any] = None
    normalTexture: Optional[Any] = None
    occlusionTexture: Optional[Any] = None
    emissiveTexture: Optional[Any] = None
    emissiveFactor: Optional[List[float]] = None
    alphaMode: Optional[str] = None
    alphaCutoff: Optional[float] = None
    doubleSided: Optional[bool] = None
    extensions: Optional[Dict[str, Any]] = None

class World_Texture(World_CommonEntityProperties):
    sampler: Optional[str] = None
    source: Optional[str] = None
    extensions: Optional[Dict[str, Any]] = None

class World_Image(World_CommonEntityProperties):
    uri: Optional[str] = None
    mimeType: Optional[str] = None
    bufferView: Optional[str] = None
    extensions: Optional[Dict[str, Any]] = None

class World_Sampler(World_CommonEntityProperties):
    magFilter: Optional[int] = None
    minFilter: Optional[int] = None
    wrapS: Optional[int] = None
    wrapT: Optional[int] = None
    extensions: Optional[Dict[str, Any]] = None

class World_Animation(World_CommonEntityProperties):
    channels: List[Any]
    samplers: List[Any]
    extensions: Optional[Dict[str, Any]] = None

class World_Skin(World_CommonEntityProperties):
    inverseBindMatrices: Optional[str] = None
    skeleton: Optional[str] = None
    joints: List[Any]
    extensions: Optional[Dict[str, Any]] = None

class World_Camera(World_CommonEntityProperties):
    type: str
    orthographic: Optional[Any] = None
    perspective: Optional[Any] = None
    extensions: Optional[Dict[str, Any]] = None

class World_Buffer(World_CommonEntityProperties):
    uri: Optional[str] = None
    byteLength: int
    data: Optional[bytes] = None
    extensions: Optional[Dict[str, Any]] = None

class World_BufferView(World_CommonEntityProperties):
    buffer: str
    byteOffset: Optional[int] = None
    byteLength: int
    byteStride: Optional[int] = None
    target: Optional[int] = None
    extensions: Optional[Dict[str, Any]] = None

class World_Accessor(World_CommonEntityProperties):
    bufferView: Optional[str] = None
    byteOffset: Optional[int] = None
    componentType: int
    normalized: Optional[bool] = None
    count: int
    type: str
    max: Optional[List[Any]] = None
    min: Optional[List[Any]] = None
    sparse: Optional[Dict[str, Any]] = None
    extensions: Optional[Dict[str, Any]] = None

class World_UserProfile(BaseModel):
    id: str
    username: str
    full_name: str
    role: 'Agent_Profile_Role'
    created_at: datetime
    updated_at: datetime

class World_Metadata(BaseModel):
    metadata_id: str
    parent_id: str
    key: str
    values_text: Optional[List[str]] = None
    values_numeric: Optional[List[float]] = None
    values_boolean: Optional[List[bool]] = None
    values_timestamp: Optional[List[datetime]] = None
    createdat: datetime
    updatedat: datetime

class World_Table(str, Enum):
    WORLD_GLTF = 'world_gltf'
    AGENT_PROFILES = 'agent_profiles'
    SCENES = 'scenes'
    NODES = 'nodes'
    MESHES = 'meshes'
    MATERIALS = 'materials'
    TEXTURES = 'textures'
    IMAGES = 'images'
    SAMPLERS = 'samplers'
    ANIMATIONS = 'animations'
    SKINS = 'skins'
    CAMERAS = 'cameras'
    BUFFERS = 'buffers'
    BUFFER_VIEWS = 'buffer_views'
    ACCESSORS = 'accessors'
    WORLD_GLTF_METADATA = 'world_gltf_metadata'
    SCENES_METADATA = 'scenes_metadata'
    NODES_METADATA = 'nodes_metadata'
    MESHES_METADATA = 'meshes_metadata'
    MATERIALS_METADATA = 'materials_metadata'
    TEXTURES_METADATA = 'textures_metadata'
    IMAGES_METADATA = 'images_metadata'
    SAMPLERS_METADATA = 'samplers_metadata'
    ANIMATIONS_METADATA = 'animations_metadata'
    SKINS_METADATA = 'skins_metadata'
    CAMERAS_METADATA = 'cameras_metadata'
    BUFFERS_METADATA = 'buffers_metadata'
    BUFFER_VIEWS_METADATA = 'buffer_views_metadata'
    ACCESSORS_METADATA = 'accessors_metadata'

class World_RealtimeBroadcastChannel(str, Enum):
    AGENT_SIGNAL = 'agent_signal'

class World_RealtimePresenceChannel(str, Enum):
    AGENT_PRESENCE = 'agent_presence'

class Agent_Profile_Role(str, Enum):
    GUEST = 'guest'
    MEMBER = 'member'
    ADMIN = 'admin'

class Agent_WebRTCSignalType(str, Enum):
    AGENT_Offer = 'agent-agent-offer-packet'
    AGENT_Answer = 'agent-agent-answer-packet'
    AGENT_ICE_Candidate = 'agent-agent-ice-candidate-packet'

class Agent_Presence(BaseModel):
    agentId: str
    position: Primitive_Vector3
    orientation: Primitive_Vector3
    lastUpdated: datetime

class Server_ProxySubdomain(str, Enum):
    SUPABASE_API = 'supabase-api'
    SUPABASE_STORAGE = 'supabase-storage'
    SUPABASE_GRAPHQL = 'supabase-graphql'
    SUPABASE_INBUCKET = 'supabase-inbucket'
    SUPABASE_STUDIO = 'supabase-studio'

# Constants
Agent_DEFAULT_PANNER_OPTIONS = {
    'panningModel': 'HRTF',
    'distanceModel': 'inverse',
    'refDistance': 1,
    'maxDistance': 10000,
}

World_Lightmap_DATA_MESH_NAME = "vircadia_lightmapData"