from enum import Enum, IntEnum
from typing import List, Optional, Any, Dict, Union
from datetime import datetime
from pydantic import BaseModel, Field

class Primitive:
    class Vector3(BaseModel):
        x: float = Field(default=0)
        y: float = Field(default=0)
        z: float = Field(default=0)

    class Color3(BaseModel):
        r: float = Field(default=0)
        g: float = Field(default=0)
        b: float = Field(default=0)

class World:
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

    class BaseWorldGLTFTableProperties(BaseModel):
        name: Optional[str] = None
        extras: Optional[Dict[str, Any]] = None
        vircadiaUuid: Optional[str] = None
        vircadiaVersion: Optional[str] = None
        vircadiaCreatedat: Optional[datetime] = None
        vircadiaUpdatedat: Optional[datetime] = None

    class TableWorldGLTF(BaseWorldGLTFTableProperties):
        name: str
        version: str
        metadata: Any
        defaultScene: Optional[str] = None
        extensionsUsed: Optional[List[str]] = None
        extensionsRequired: Optional[List[str]] = None
        extensions: Optional[Dict[str, Any]] = None
        asset: Any

    class TableScene(BaseWorldGLTFTableProperties):
        vircadiaWorldUuid: str
        nodes: Optional[List[Any]] = None
        extensions: Optional[Dict[str, Any]] = None
        vircadiaBabylonjsSceneClearColor: Optional[Primitive.Color3] = None
        vircadiaBabylonjsSceneAmbientColor: Optional[Primitive.Color3] = None
        vircadiaBabylonjsSceneGravity: Optional[Primitive.Vector3] = None
        vircadiaBabylonjsSceneActiveCamera: Optional[str] = None
        vircadiaBabylonjsSceneCollisionsEnabled: Optional[bool] = None
        vircadiaBabylonjsScenePhysicsEnabled: Optional[bool] = None
        vircadiaBabylonjsScenePhysicsGravity: Optional[Primitive.Vector3] = None
        vircadiaBabylonjsScenePhysicsEngine: Optional[str] = None
        vircadiaBabylonjsSceneAutoAnimate: Optional[bool] = None
        vircadiaBabylonjsSceneAutoAnimateFrom: Optional[float] = None
        vircadiaBabylonjsSceneAutoAnimateTo: Optional[float] = None
        vircadiaBabylonjsSceneAutoAnimateLoop: Optional[bool] = None
        vircadiaBabylonjsSceneAutoAnimateSpeed: Optional[float] = None

    class TableNode(BaseWorldGLTFTableProperties):
        vircadiaWorldUuid: str
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
        vircadiaBabylonjsLodMode: Optional[Babylon.LOD.Mode] = None
        vircadiaBabylonjsLodAuto: Optional[bool] = None
        vircadiaBabylonjsLodDistance: Optional[float] = None
        vircadiaBabylonjsLodSize: Optional[float] = None
        vircadiaBabylonjsLodHide: Optional[float] = None
        vircadiaBabylonjsBillboardMode: Optional[Babylon.Billboard.Mode] = None
        vircadiaBabylonjsLightLightmap: Optional[str] = None
        vircadiaBabylonjsLightLevel: Optional[float] = None
        vircadiaBabylonjsLightColorSpace: Optional[Babylon.Texture.ColorSpace] = None
        vircadiaBabylonjsLightTexcoord: Optional[int] = None
        vircadiaBabylonjsLightUseAsShadowmap: Optional[bool] = None
        vircadiaBabylonjsLightMode: Optional[Babylon.Light.Mode] = None
        vircadiaBabylonjsScriptAgentScripts: Optional[List[str]] = None
        vircadiaBabylonjsScriptPersistentScripts: Optional[List[str]] = None

    class TableMesh(BaseWorldGLTFTableProperties):
        vircadiaWorldUuid: str
        primitives: List[Any]
        weights: Optional[List[Any]] = None
        extensions: Optional[Dict[str, Any]] = None
        vircadiaBabylonjsLodMode: Optional[Babylon.LOD.Mode] = None
        vircadiaBabylonjsLodAuto: Optional[bool] = None
        vircadiaBabylonjsLodDistance: Optional[float] = None
        vircadiaBabylonjsLodSize: Optional[float] = None
        vircadiaBabylonjsLodHide: Optional[float] = None
        vircadiaBabylonjsBillboardMode: Optional[Babylon.Billboard.Mode] = None
        vircadiaBabylonjsLightLightmap: Optional[str] = None
        vircadiaBabylonjsLightLevel: Optional[float] = None
        vircadiaBabylonjsLightColorSpace: Optional[Babylon.Texture.ColorSpace] = None
        vircadiaBabylonjsLightTexcoord: Optional[int] = None
        vircadiaBabylonjsLightUseAsShadowmap: Optional[bool] = None
        vircadiaBabylonjsLightMode: Optional[Babylon.Light.Mode] = None
        vircadiaBabylonjsScriptAgentScripts: Optional[List[str]] = None
        vircadiaBabylonjsScriptPersistentScripts: Optional[List[str]] = None

    class TableMaterial(BaseWorldGLTFTableProperties):
        vircadiaWorldUuid: str
        pbrMetallicRoughness: Optional[Any] = None
        normalTexture: Optional[Any] = None
        occlusionTexture: Optional[Any] = None
        emissiveTexture: Optional[Any] = None
        emissiveFactor: Optional[List[float]] = None
        alphaMode: Optional[str] = None
        alphaCutoff: Optional[float] = None
        doubleSided: Optional[bool] = None
        extensions: Optional[Dict[str, Any]] = None
        vircadiaBabylonjsLodMode: Optional[Babylon.LOD.Mode] = None
        vircadiaBabylonjsLodAuto: Optional[bool] = None
        vircadiaBabylonjsLodDistance: Optional[float] = None
        vircadiaBabylonjsLodSize: Optional[float] = None
        vircadiaBabylonjsLodHide: Optional[float] = None
        vircadiaBabylonjsBillboardMode: Optional[Babylon.Billboard.Mode] = None
        vircadiaBabylonjsLightLightmap: Optional[str] = None
        vircadiaBabylonjsLightLevel: Optional[float] = None
        vircadiaBabylonjsLightColorSpace: Optional[Babylon.Texture.ColorSpace] = None
        vircadiaBabylonjsLightTexcoord: Optional[int] = None
        vircadiaBabylonjsLightUseAsShadowmap: Optional[bool] = None
        vircadiaBabylonjsLightMode: Optional[Babylon.Light.Mode] = None
        vircadiaBabylonjsScriptAgentScripts: Optional[List[str]] = None
        vircadiaBabylonjsScriptPersistentScripts: Optional[List[str]] = None

    class TableTexture(BaseWorldGLTFTableProperties):
        vircadiaWorldUuid: str
        sampler: Optional[str] = None
        source: Optional[str] = None
        extensions: Optional[Dict[str, Any]] = None
        vircadiaBabylonjsLodMode: Optional[Babylon.LOD.Mode] = None
        vircadiaBabylonjsLodAuto: Optional[bool] = None
        vircadiaBabylonjsLodDistance: Optional[float] = None
        vircadiaBabylonjsLodSize: Optional[float] = None
        vircadiaBabylonjsLodHide: Optional[float] = None
        vircadiaBabylonjsBillboardMode: Optional[Babylon.Billboard.Mode] = None
        vircadiaBabylonjsLightLightmap: Optional[str] = None
        vircadiaBabylonjsLightLevel: Optional[float] = None
        vircadiaBabylonjsLightColorSpace: Optional[Babylon.Texture.ColorSpace] = None
        vircadiaBabylonjsLightTexcoord: Optional[int] = None
        vircadiaBabylonjsLightUseAsShadowmap: Optional[bool] = None
        vircadiaBabylonjsLightMode: Optional[Babylon.Light.Mode] = None
        vircadiaBabylonjsScriptAgentScripts: Optional[List[str]] = None
        vircadiaBabylonjsScriptPersistentScripts: Optional[List[str]] = None

    class TableImage(BaseWorldGLTFTableProperties):
        vircadiaWorldUuid: str
        uri: Optional[str] = None
        mimeType: Optional[str] = None
        bufferView: Optional[str] = None
        extensions: Optional[Dict[str, Any]] = None
        vircadiaBabylonjsLodMode: Optional[Babylon.LOD.Mode] = None
        vircadiaBabylonjsLodAuto: Optional[bool] = None
        vircadiaBabylonjsLodDistance: Optional[float] = None
        vircadiaBabylonjsLodSize: Optional[float] = None
        vircadiaBabylonjsLodHide: Optional[float] = None
        vircadiaBabylonjsBillboardMode: Optional[Babylon.Billboard.Mode] = None
        vircadiaBabylonjsLightLightmap: Optional[str] = None
        vircadiaBabylonjsLightLevel: Optional[float] = None
        vircadiaBabylonjsLightColorSpace: Optional[Babylon.Texture.ColorSpace] = None
        vircadiaBabylonjsLightTexcoord: Optional[int] = None
        vircadiaBabylonjsLightUseAsShadowmap: Optional[bool] = None
        vircadiaBabylonjsLightMode: Optional[Babylon.Light.Mode] = None
        vircadiaBabylonjsScriptAgentScripts: Optional[List[str]] = None
        vircadiaBabylonjsScriptPersistentScripts: Optional[List[str]] = None

    class TableSampler(BaseWorldGLTFTableProperties):
        vircadiaWorldUuid: str
        magFilter: Optional[int] = None
        minFilter: Optional[int] = None
        wrapS: Optional[int] = None
        wrapT: Optional[int] = None
        extensions: Optional[Dict[str, Any]] = None
        vircadiaBabylonjsLodMode: Optional[Babylon.LOD.Mode] = None
        vircadiaBabylonjsLodAuto: Optional[bool] = None
        vircadiaBabylonjsLodDistance: Optional[float] = None
        vircadiaBabylonjsLodSize: Optional[float] = None
        vircadiaBabylonjsLodHide: Optional[float] = None
        vircadiaBabylonjsBillboardMode: Optional[Babylon.Billboard.Mode] = None
        vircadiaBabylonjsLightLightmap: Optional[str] = None
        vircadiaBabylonjsLightLevel: Optional[float] = None
        vircadiaBabylonjsLightColorSpace: Optional[Babylon.Texture.ColorSpace] = None
        vircadiaBabylonjsLightTexcoord: Optional[int] = None
        vircadiaBabylonjsLightUseAsShadowmap: Optional[bool] = None
        vircadiaBabylonjsLightMode: Optional[Babylon.Light.Mode] = None
        vircadiaBabylonjsScriptAgentScripts: Optional[List[str]] = None
        vircadiaBabylonjsScriptPersistentScripts: Optional[List[str]] = None

    class TableAnimation(BaseWorldGLTFTableProperties):
        vircadiaWorldUuid: str
        channels: List[Any]
        samplers: List[Any]
        extensions: Optional[Dict[str, Any]] = None
        vircadiaBabylonjsLodMode: Optional[Babylon.LOD.Mode] = None
        vircadiaBabylonjsLodAuto: Optional[bool] = None
        vircadiaBabylonjsLodDistance: Optional[float] = None
        vircadiaBabylonjsLodSize: Optional[float] = None
        vircadiaBabylonjsLodHide: Optional[float] = None
        vircadiaBabylonjsBillboardMode: Optional[Babylon.Billboard.Mode] = None
        vircadiaBabylonjsLightLightmap: Optional[str] = None
        vircadiaBabylonjsLightLevel: Optional[float] = None
        vircadiaBabylonjsLightColorSpace: Optional[Babylon.Texture.ColorSpace] = None
        vircadiaBabylonjsLightTexcoord: Optional[int] = None
        vircadiaBabylonjsLightUseAsShadowmap: Optional[bool] = None
        vircadiaBabylonjsLightMode: Optional[Babylon.Light.Mode] = None
        vircadiaBabylonjsScriptAgentScripts: Optional[List[str]] = None
        vircadiaBabylonjsScriptPersistentScripts: Optional[List[str]] = None

    class TableSkin(BaseWorldGLTFTableProperties):
        vircadiaWorldUuid: str
        inverseBindMatrices: Optional[str] = None
        skeleton: Optional[str] = None
        joints: List[Any]
        extensions: Optional[Dict[str, Any]] = None
        vircadiaBabylonjsLodMode: Optional[Babylon.LOD.Mode] = None
        vircadiaBabylonjsLodAuto: Optional[bool] = None
        vircadiaBabylonjsLodDistance: Optional[float] = None
        vircadiaBabylonjsLodSize: Optional[float] = None
        vircadiaBabylonjsLodHide: Optional[float] = None
        vircadiaBabylonjsBillboardMode: Optional[Babylon.Billboard.Mode] = None
        vircadiaBabylonjsLightLightmap: Optional[str] = None
        vircadiaBabylonjsLightLevel: Optional[float] = None
        vircadiaBabylonjsLightColorSpace: Optional[Babylon.Texture.ColorSpace] = None
        vircadiaBabylonjsLightTexcoord: Optional[int] = None
        vircadiaBabylonjsLightUseAsShadowmap: Optional[bool] = None
        vircadiaBabylonjsLightMode: Optional[Babylon.Light.Mode] = None
        vircadiaBabylonjsScriptAgentScripts: Optional[List[str]] = None
        vircadiaBabylonjsScriptPersistentScripts: Optional[List[str]] = None

    class TableCamera(BaseWorldGLTFTableProperties):
        vircadiaWorldUuid: str
        type: str
        orthographic: Optional[Any] = None
        perspective: Optional[Any] = None
        extensions: Optional[Dict[str, Any]] = None
        vircadiaBabylonjsLodMode: Optional[Babylon.LOD.Mode] = None
        vircadiaBabylonjsLodAuto: Optional[bool] = None
        vircadiaBabylonjsLodDistance: Optional[float] = None
        vircadiaBabylonjsLodSize: Optional[float] = None
        vircadiaBabylonjsLodHide: Optional[float] = None
        vircadiaBabylonjsBillboardMode: Optional[Babylon.Billboard.Mode] = None
        vircadiaBabylonjsLightLightmap: Optional[str] = None
        vircadiaBabylonjsLightLevel: Optional[float] = None
        vircadiaBabylonjsLightColorSpace: Optional[Babylon.Texture.ColorSpace] = None
        vircadiaBabylonjsLightTexcoord: Optional[int] = None
        vircadiaBabylonjsLightUseAsShadowmap: Optional[bool] = None
        vircadiaBabylonjsLightMode: Optional[Babylon.Light.Mode] = None
        vircadiaBabylonjsScriptAgentScripts: Optional[List[str]] = None
        vircadiaBabylonjsScriptPersistentScripts: Optional[List[str]] = None

    class TableBuffer(BaseWorldGLTFTableProperties):
        vircadiaWorldUuid: str
        uri: Optional[str] = None
        byteLength: int
        data: Optional[bytes] = None
        extensions: Optional[Dict[str, Any]] = None
        vircadiaBabylonjsLodMode: Optional[Babylon.LOD.Mode] = None
        vircadiaBabylonjsLodAuto: Optional[bool] = None
        vircadiaBabylonjsLodDistance: Optional[float] = None
        vircadiaBabylonjsLodSize: Optional[float] = None
        vircadiaBabylonjsLodHide: Optional[float] = None
        vircadiaBabylonjsBillboardMode: Optional[Babylon.Billboard.Mode] = None
        vircadiaBabylonjsLightLightmap: Optional[str] = None
        vircadiaBabylonjsLightLevel: Optional[float] = None
        vircadiaBabylonjsLightColorSpace: Optional[Babylon.Texture.ColorSpace] = None
        vircadiaBabylonjsLightTexcoord: Optional[int] = None
        vircadiaBabylonjsLightUseAsShadowmap: Optional[bool] = None
        vircadiaBabylonjsLightMode: Optional[Babylon.Light.Mode] = None
        vircadiaBabylonjsScriptAgentScripts: Optional[List[str]] = None
        vircadiaBabylonjsScriptPersistentScripts: Optional[List[str]] = None

    class TableBufferView(BaseWorldGLTFTableProperties):
        vircadiaWorldUuid: str
        buffer: str
        byteOffset: Optional[int] = None
        byteLength: int
        byteStride: Optional[int] = None
        target: Optional[int] = None
        extensions: Optional[Dict[str, Any]] = None
        vircadiaBabylonjsLodMode: Optional[Babylon.LOD.Mode] = None
        vircadiaBabylonjsLodAuto: Optional[bool] = None
        vircadiaBabylonjsLodDistance: Optional[float] = None
        vircadiaBabylonjsLodSize: Optional[float] = None
        vircadiaBabylonjsLodHide: Optional[float] = None
        vircadiaBabylonjsBillboardMode: Optional[Babylon.Billboard.Mode] = None
        vircadiaBabylonjsLightLightmap: Optional[str] = None
        vircadiaBabylonjsLightLevel: Optional[float] = None
        vircadiaBabylonjsLightColorSpace: Optional[Babylon.Texture.ColorSpace] = None
        vircadiaBabylonjsLightTexcoord: Optional[int] = None
        vircadiaBabylonjsLightUseAsShadowmap: Optional[bool] = None
        vircadiaBabylonjsLightMode: Optional[Babylon.Light.Mode] = None
        vircadiaBabylonjsScriptAgentScripts: Optional[List[str]] = None
        vircadiaBabylonjsScriptPersistentScripts: Optional[List[str]] = None

    class TableAccessor(BaseWorldGLTFTableProperties):
        vircadiaWorldUuid: str
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
        vircadiaBabylonjsLodMode: Optional[Babylon.LOD.Mode] = None
        vircadiaBabylonjsLodAuto: Optional[bool] = None
        vircadiaBabylonjsLodDistance: Optional[float] = None
        vircadiaBabylonjsLodSize: Optional[float] = None
        vircadiaBabylonjsLodHide: Optional[float] = None
        vircadiaBabylonjsBillboardMode: Optional[Babylon.Billboard.Mode] = None
        vircadiaBabylonjsLightLightmap: Optional[str] = None
        vircadiaBabylonjsLightLevel: Optional[float] = None
        vircadiaBabylonjsLightColorSpace: Optional[Babylon.Texture.ColorSpace] = None
        vircadiaBabylonjsLightTexcoord: Optional[int] = None
        vircadiaBabylonjsLightUseAsShadowmap: Optional[bool] = None
        vircadiaBabylonjsLightMode: Optional[Babylon.Light.Mode] = None
        vircadiaBabylonjsScriptAgentScripts: Optional[List[str]] = None
        vircadiaBabylonjsScriptPersistentScripts: Optional[List[str]] = None

    class TableUserProfile(BaseModel):
        id: str
        username: str
        fullName: str
        role: 'Agent.Profile.Role'
        createdAt: datetime
        updatedAt: datetime

    class TableMetadata(BaseModel):
        metadataId: str
        parentId: str
        key: str
        valuesText: Optional[List[str]] = None
        valuesNumeric: Optional[List[float]] = None
        valuesBoolean: Optional[List[bool]] = None
        valuesTimestamp: Optional[List[datetime]] = None
        createdat: datetime
        updatedat: datetime

    class Table(str, Enum):
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

class Agent:
    class Profile:
        class Role(str, Enum):
            GUEST = "guest"
            MEMBER = "member"
            ADMIN = "admin"

    class WebRTC:
        class SignalType(str, Enum):
            AGENT_OFFER = "agent-agent-offer-packet"
            AGENT_ANSWER = "agent-agent-answer-packet"
            AGENT_ICE_CANDIDATE = "agent-agent-ice-candidate-packet"

    class Audio:
        DEFAULT_PANNER_OPTIONS = {
            "panningModel": "HRTF",
            "distanceModel": "inverse",
            "refDistance": 1,
            "maxDistance": 10000,
        }

    class Presence(BaseModel):
        agentId: str
        position: Primitive.Vector3
        orientation: Primitive.Vector3
        lastUpdated: datetime

        @classmethod
        def parse(cls, obj: Dict[str, Any]) -> 'Presence':
            return cls(
                agentId=obj['agentId'],
                position=Primitive.Vector3(**obj['position']),
                orientation=Primitive.Vector3(**obj['orientation']),
                lastUpdated=datetime.fromisoformat(obj['lastUpdated'])
            )

class Server:
    class ProxySubdomain(str, Enum):
        SUPABASE_API = "supabase-api"
        SUPABASE_STORAGE = "supabase-storage"
        SUPABASE_GRAPHQL = "supabase-graphql"
        SUPABASE_INBUCKET = "supabase-inbucket"
        SUPABASE_STUDIO = "supabase-studio"