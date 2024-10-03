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
    lod: World_LOD
    billboard: World_Billboard
    lightmap: World_Lightmap
    script: Dict[str, Union[List[World_AgentScript], List[World_PersistentScript]]]

class World_CommonEntityProperties(BaseModel):
    name: str
    version: str
    createdAt: datetime
    updatedAt: datetime
    vircadia: Dict[str, Any] = Field(default_factory=dict)

class World_SceneEntityProperties(World_CommonEntityProperties):
    vircadia: Dict[str, Any] = Field(default_factory=dict)

    class Config:
        extra = "allow"

    @property
    def babylonjs(self) -> Dict[str, Any]:
        return self.vircadia.get("babylonjs", {})

    @babylonjs.setter
    def babylonjs(self, value: Dict[str, Any]):
        if "vircadia" not in self.dict():
            self.vircadia = {}
        self.vircadia["babylonjs"] = value

    # Scene-specific properties
    @property
    def clearColor(self) -> Optional[Primitive_Color3]:
        return self.babylonjs.get("clearColor")

    @property
    def ambientColor(self) -> Optional[Primitive_Color3]:
        return self.babylonjs.get("ambientColor")

    @property
    def gravity(self) -> Optional[Primitive_Vector3]:
        return self.babylonjs.get("gravity")

    @property
    def activeCamera(self) -> Optional[str]:
        return self.babylonjs.get("activeCamera")

    @property
    def collisionsEnabled(self) -> Optional[bool]:
        return self.babylonjs.get("collisionsEnabled")

    @property
    def physicsEnabled(self) -> Optional[bool]:
        return self.babylonjs.get("physicsEnabled")

    @property
    def physicsGravity(self) -> Optional[Primitive_Vector3]:
        return self.babylonjs.get("physicsGravity")

    @property
    def physicsEngine(self) -> Optional[str]:
        return self.babylonjs.get("physicsEngine")

    @property
    def autoAnimate(self) -> Optional[bool]:
        return self.babylonjs.get("autoAnimate")

    @property
    def autoAnimateFrom(self) -> Optional[int]:
        return self.babylonjs.get("autoAnimateFrom")

    @property
    def autoAnimateTo(self) -> Optional[int]:
        return self.babylonjs.get("autoAnimateTo")

    @property
    def autoAnimateLoop(self) -> Optional[bool]:
        return self.babylonjs.get("autoAnimateLoop")

    @property
    def autoAnimateSpeed(self) -> Optional[float]:
        return self.babylonjs.get("autoAnimateSpeed")

class World_WorldGLTFProperties(BaseModel):
    name: str
    version: str
    createdAt: datetime
    updatedAt: datetime

class World_WorldGLTF(BaseModel):
    vircadia_uuid: str
    name: str
    version: str
    created_at: datetime
    updated_at: datetime
    metadata: Any
    defaultScene: Optional[str] = None
    extensionsUsed: Optional[List[str]] = None
    extensionsRequired: Optional[List[str]] = None
    extensions: Optional[Dict[str, Any]] = None
    extras: Optional[World_WorldGLTFProperties] = None
    asset: Any

class World_Scene(BaseModel):
    vircadia_uuid: str
    vircadia_world_uuid: str
    name: Optional[str] = None
    nodes: Optional[List[Any]] = None
    extensions: Optional[Dict[str, Any]] = None
    extras: Optional[World_SceneEntityProperties] = None

class World_Node(BaseModel):
    vircadia_uuid: str
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
    extras: Optional[World_CommonEntityProperties] = None

class World_Mesh(BaseModel):
    vircadia_uuid: str
    vircadia_world_uuid: str
    name: Optional[str] = None
    primitives: List[Any]
    weights: Optional[List[Any]] = None
    extensions: Optional[Dict[str, Any]] = None
    extras: Optional[World_CommonEntityProperties] = None

class World_Material(BaseModel):
    vircadia_uuid: str
    vircadia_world_uuid: str
    name: Optional[str] = None
    pbrMetallicRoughness: Optional[Any] = None
    normalTexture: Optional[Any] = None
    occlusionTexture: Optional[Any] = None
    emissiveTexture: Optional[Any] = None
    emissiveFactor: Optional[List[float]] = None
    alphaMode: Optional[str] = None
    alphaCutoff: Optional[float] = None
    doubleSided: Optional[bool] = None
    extensions: Optional[Dict[str, Any]] = None
    extras: Optional[World_CommonEntityProperties] = None

class World_Texture(BaseModel):
    vircadia_uuid: str
    vircadia_world_uuid: str
    name: Optional[str] = None
    sampler: Optional[str] = None
    source: Optional[str] = None
    extensions: Optional[Dict[str, Any]] = None
    extras: Optional[World_CommonEntityProperties] = None

class World_Image(BaseModel):
    vircadia_uuid: str
    vircadia_world_uuid: str
    name: Optional[str] = None
    uri: Optional[str] = None
    mimeType: Optional[str] = None
    bufferView: Optional[str] = None
    extensions: Optional[Dict[str, Any]] = None
    extras: Optional[World_CommonEntityProperties] = None

class World_Sampler(BaseModel):
    vircadia_uuid: str
    vircadia_world_uuid: str
    name: Optional[str] = None
    magFilter: Optional[int] = None
    minFilter: Optional[int] = None
    wrapS: Optional[int] = None
    wrapT: Optional[int] = None
    extensions: Optional[Dict[str, Any]] = None
    extras: Optional[World_CommonEntityProperties] = None

class World_Animation(BaseModel):
    vircadia_uuid: str
    vircadia_world_uuid: str
    name: Optional[str] = None
    channels: List[Any]
    samplers: List[Any]
    extensions: Optional[Dict[str, Any]] = None
    extras: Optional[World_CommonEntityProperties] = None

class World_Skin(BaseModel):
    vircadia_uuid: str
    vircadia_world_uuid: str
    name: Optional[str] = None
    inverseBindMatrices: Optional[str] = None
    skeleton: Optional[str] = None
    joints: List[Any]
    extensions: Optional[Dict[str, Any]] = None
    extras: Optional[World_CommonEntityProperties] = None

class World_Camera(BaseModel):
    vircadia_uuid: str
    vircadia_world_uuid: str
    name: Optional[str] = None
    type: str
    orthographic: Optional[Any] = None
    perspective: Optional[Any] = None
    extensions: Optional[Dict[str, Any]] = None
    extras: Optional[World_CommonEntityProperties] = None

class World_Buffer(BaseModel):
    vircadia_uuid: str
    vircadia_world_uuid: str
    name: Optional[str] = None
    uri: Optional[str] = None
    byteLength: int
    data: Optional[bytes] = None
    extensions: Optional[Dict[str, Any]] = None
    extras: Optional[World_CommonEntityProperties] = None

class World_BufferView(BaseModel):
    vircadia_uuid: str
    vircadia_world_uuid: str
    name: Optional[str] = None
    buffer: str
    byteOffset: Optional[int] = None
    byteLength: int
    byteStride: Optional[int] = None
    target: Optional[int] = None
    extensions: Optional[Dict[str, Any]] = None
    extras: Optional[World_CommonEntityProperties] = None

class World_Accessor(BaseModel):
    vircadia_uuid: str
    vircadia_world_uuid: str
    name: Optional[str] = None
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
    extras: Optional[World_CommonEntityProperties] = None

class World_Table(str, Enum):
    WORLD_GLTF = 'world_gltf'
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

class World_RealtimeBroadcastChannel(str, Enum):
    AGENT_SIGNAL = 'agent_signal'

class World_RealtimePresenceChannel(str, Enum):
    AGENT_PRESENCE = 'agent_presence'

# Agent-related classes and enums

class Agent_WebRTCSignalType(str, Enum):
    AGENT_Offer = 'agent-agent-offer-packet'
    AGENT_Answer = 'agent-agent-answer-packet'
    AGENT_ICE_Candidate = 'agent-agent-ice-candidate-packet'

class Agent_Presence(BaseModel):
    agentId: str
    position: Primitive_Vector3
    orientation: Primitive_Vector3
    lastUpdated: str

# Server-related classes and enums
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

# Constants
World_Lightmap_DATA_MESH_NAME = "vircadia_lightmapData"