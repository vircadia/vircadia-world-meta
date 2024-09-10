/* eslint-disable @typescript-eslint/no-throw-literal */
import { log } from "../../../../server/modules/general/log.js";
import { Supabase } from '../../../../providers/supabase/supabase.ts';
import { Scene } from '@babylonjs/core/scene.js';
import { Observer } from '@babylonjs/core/Misc/observable.js';
import { Node } from '@babylonjs/core/node.js';
import { Agent, World } from "../../../../../meta/meta.js";
import { v7 as uuidv7 } from 'uuid';
import * as ts from 'typescript';

export namespace Babylon_JS {
    const WORLD_BABYLON_LOG_PREFIX = '[WORLD: BABYLON]';

    export namespace Meta {
        // export const create = async (metadata: Omit<World.I_WorldMetadata, 'id'>, scene: Scene): Promise<string> => {
        //     try {
        //         const supabaseClient = Supabase.getSupabaseClient();
        //         if (!supabaseClient) {
        //             throw new Error('Supabase client not initialized');
        //         }

        //         const { data, error } = await supabaseClient
        //             .from('worlds_gltf')
        //             .insert({
        //                 name: metadata.name,
        //                 version: metadata.version || '1.0',
        //                 asset: {}, // You might want to define this based on your needs
        //                 extras: {
        //                     metadata
        //                 }
        //             })
        //             .select('id')
        //             .single();

        //         if (error) {
        //             throw error;
        //         }

        //         // Now create related entities (scenes, nodes, etc.) based on the Babylon.js scene
        //         await createSceneEntities(data.id, scene);

        //         log(`${WORLD_BABYLON_LOG_PREFIX} Created new world with ID: ${data.id}`, 'info');
        //         return data.id;
        //     } catch (error) {
        //         log(`${WORLD_BABYLON_LOG_PREFIX} Failed to create world: ${error}`, 'error');
        //         throw error;
        //     }
        // };

        // export const remove = async (worldId: string): Promise<void> => {
        //     try {
        //         const supabaseClient = Supabase.getSupabaseClient();
        //         if (!supabaseClient) {
        //             throw new Error('Supabase client not initialized');
        //         }

        //         const { error } = await supabaseClient
        //             .from('worlds_gltf')
        //             .delete()
        //             .eq('id', worldId);

        //         if (error) {
        //             throw error;
        //         }

        //         log(`${WORLD_BABYLON_LOG_PREFIX} Deleted world with ID: ${worldId}`, 'info');
        //     } catch (error) {
        //         log(`${WORLD_BABYLON_LOG_PREFIX} Failed to delete world: ${error}`, 'error');
        //         throw error;
        //     }
        // };

        // export const update = async (worldId: string, metadata: Partial<World.Metadata>): Promise<void> => {
        //     try {
        //         const supabaseClient = Supabase.getSupabaseClient();
        //         if (!supabaseClient) {
        //             throw new Error('Supabase client not initialized');
        //         }

        //         const { error } = await supabaseClient
        //             .from('worlds_gltf')
        //             .update({
        //                 extras: {
        //                     metadata
        //                 }
        //             })
        //             .eq('id', worldId);

        //         if (error) {
        //             throw error;
        //         }

        //         log(`${WORLD_BABYLON_LOG_PREFIX} Updated metadata for world with ID: ${worldId}`, 'info');
        //     } catch (error) {
        //         log(`${WORLD_BABYLON_LOG_PREFIX} Failed to update world metadata: ${error}`, 'error');
        //         throw error;
        //     }
        // };

        // export const setupWorldSync = (callbacks:
        //     {
        //         onWorldCreated: (worldId: string, metadata: World.I_WorldMetadata) => void;
        //         onWorldDeleted: (worldId: string) => void;
        //         onWorldMetadataUpdated: (worldId: string, oldMetadata: World.I_WorldMetadata, newMetadata: World.I_WorldMetadata) => void;
        //     }) => {
        //     const supabaseClient = Supabase.getSupabaseClient();
        //     if (!supabaseClient) {
        //         log(`${WORLD_BABYLON_LOG_PREFIX} Supabase client not initialized`, 'error');
        //         return;
        //     }

        //     // Local cache to store world metadata
        //     const worldMetadataCache: { [worldId: string]: World.I_WorldMetadata } = {};

        //     supabaseClient
        //         .channel(Agent.E_WorldTransportChannel.WORLD_METADATA)
        //         .on('postgres_changes', { event: '*', schema: 'public', table: 'worlds' }, (payload) => {
        //             switch (payload.eventType) {
        //                 case 'INSERT': {
        //                     const newWorld = payload.new as World.I_WorldMetadata;
        //                     worldMetadataCache[newWorld.id] = newWorld;
        //                     if (callbacks.onWorldCreated) {
        //                         callbacks.onWorldCreated(newWorld.id, newWorld);
        //                     }
        //                     break;
        //                 }
        //                 case 'DELETE': {
        //                     const deletedWorldId = payload.old.id;
        //                     if (callbacks.onWorldDeleted) {
        //                         callbacks.onWorldDeleted(deletedWorldId);
        //                     }
        //                     delete worldMetadataCache[deletedWorldId];
        //                     break;
        //                 }
        //                 case 'UPDATE': {
        //                     const oldData = payload.old as World.I_WorldData;
        //                     const newData = payload.new as World.I_WorldData;
        //                     const worldId = newData.id;

        //                     const oldMetadata = worldMetadataCache[worldId] || {};
        //                     const newMetadata = newData.metadata as WorldMetadata;

        //                     // Check if metadata actually changed
        //                     const metadataChanged = Object.keys(newMetadata).some((key) =>
        //                         oldMetadata[key as keyof World.Metadata] !== newMetadata[key as keyof World.Metadata]
        //                     );

        //                     if (metadataChanged && callbacks.onWorldMetadataUpdated) {
        //                         callbacks.onWorldMetadataUpdated(worldId, oldMetadata, newMetadata);
        //                     }

        //                     // ... rest of the update case ...

        //                     // Update the cache
        //                     worldMetadataCache[worldId] = newMetadata;
        //                     break;
        //                 }
        //                 default:
        //                     log(`${WORLD_BABYLON_LOG_PREFIX} Unhandled event type: ${payload.eventType}`, 'warn');
        //                     break;
        //             }
        //         })
        //         .subscribe();

        //     log(`${WORLD_BABYLON_LOG_PREFIX} Set up world sync`, 'info');
        // };

        // export namespace Script {
        //     export interface Script {
        //         data: string;
        //     }

        //     export const currentScripts: {
        //         [worldId: string]: {
        //             [scriptId: string]: Script
        //         }
        //     } = {};

        //     export const get = (worldId: string, scriptId: string): Script | null => currentScripts[worldId]?.[scriptId] || null;

        //     export const set = (worldId: string, scriptId: string, script: Script): void => {
        //         currentScripts[worldId] = currentScripts[worldId] || {};
        //         currentScripts[worldId][scriptId] = script;
        //     };

        //     export const remove = (worldId: string, scriptId: string): void => {
        //         delete currentScripts[worldId]?.[scriptId];
        //     };

        //     export const list = (worldId: string): Script[] => Object.values(currentScripts[worldId] || {});

        //     export const clear = (worldId: string): void => {
        //         currentScripts[worldId] = {};
        //     };

        //     export const update = (worldId: string, scriptId: string, script: Script): void => {
        //         currentScripts[worldId] = currentScripts[worldId] || {};
        //         currentScripts[worldId][scriptId] = script;
        //     };
        // }
    }

    export namespace Script {
        interface RunningScript {
            id: string;
            entityId: string;
            scene: Scene;
            sceneUUID: string;
            code: string;
            instance: ScriptInstance;
        }
    
        interface ScriptInstance {
            execute: (method: string, ...args: any[]) => any;
            terminate: () => void;
        }
    
        const runningScripts: Map<string, RunningScript> = new Map();
        const sceneObservers: Map<string, Observer<Scene>> = new Map();
        const entityObservers: Map<string, Observer<Node>> = new Map();
    
        export function add(entityId: string, code: string, scene: Scene): string {
            const id = uuidv7();
            const compilerOptions: ts.CompilerOptions = {
                target: ts.ScriptTarget.ES2020,
                module: ts.ModuleKind.ES2020,
            };
    
            const compiledCode = ts.transpileModule(code, { compilerOptions });

            const script: RunningScript = {
                id,
                entityId,
                scene,
                sceneUUID: scene.uid,
                code,
                instance: executeScript({
                    code: compiledCode.outputText,
                    entityId,
                    scene
                })
            };
            runningScripts.set(id, script);

            setupSceneObserver(scene);
            setupEntityObserver(entityId, scene);

            return id;
        }
    
        export function remove(id: string): boolean {
            const script = runningScripts.get(id);
            if (script) {
                script.instance.terminate();
                runningScripts.delete(id);
                removeEntityObserver(script.entityId, script.scene);
                return true;
            }
            return false;
        }
    
        export function getByEntity(entityId: string, scene: Scene): RunningScript[] {
            return Array.from(runningScripts.values()).filter(script => script.entityId === entityId && script.sceneUUID === scene.uid);
        }
    
        export function removeByEntity(entityId: string, scene: Scene): void {
            for (const [id, script] of runningScripts.entries()) {
                if (script.entityId === entityId && script.sceneUUID === scene.uid) {
                    script.instance.terminate();
                    runningScripts.delete(id);
                }
            }
            removeEntityObserver(entityId, scene);
        }
    
        export function entityHasScripts(entityId: string, scene: Scene): boolean {
            return Array.from(runningScripts.values()).some(script => script.entityId === entityId && script.sceneUUID === scene.uid);
        }

        export function sceneHasScripts(scene: Scene): boolean {
            return Array.from(runningScripts.values()).some(script => script.sceneUUID === scene.uid);
        }
    
        export function getAllScriptIds(): string[] {
            return Array.from(runningScripts.keys());
        }

        function executeScript(data: {
            code: string,
            entityId: string,
            scene: Scene
        }): ScriptInstance {
            const scriptMethods = {
                OnAwake: null,
                OnEnable: null,
                OnReset: null,
                OnStart: null,
                OnFixedUpdate: null,
                OnUpdate: null,
                OnLateUpdate: null,
                OnTriggerEnter: null,
                OnTriggerStay: null,
                OnTriggerExit: null,
                OnCollisionEnter: null,
                OnCollisionStay: null,
                OnCollisionExit: null,
                OnSceneFocus: null,
                OnScenePause: null,
            };

            const scriptContext = {
                entityId: data.entityId,
                scene: data.scene,
                ...scriptMethods,
            };

            const wrappedCode = `
                (function(context) {
                    ${data.code}
                    return context;
                })(scriptContext);
            `;

            const executedScript = new Function('scriptContext', wrappedCode)(scriptContext);

            return {
                execute: (method: string, ...args: any[]) => {
                    if (typeof executedScript[method] === 'function') {
                        return executedScript[method](...args);
                    }
                },
                terminate: () => {
                    // Clean up any resources if needed
                }
            };
        }

        function setupSceneObserver(scene: Scene): void {
            if (!sceneObservers.has(scene.uid)) {
                const observer = scene.onDisposeObservable.add(() => {
                    cleanupScripts(scene);
                    sceneObservers.delete(scene.uid);
                });
                sceneObservers.set(scene.uid, observer);
            }
        }

        function setupEntityObserver(entityId: string, scene: Scene): void {
            const entity = scene.getNodeById(entityId);
            if (entity && !entityObservers.has(entityId)) {
                const observer = entity.onDisposeObservable.add(() => {
                    removeByEntity(entityId, scene);
                    entityObservers.delete(entityId);
                });
                entityObservers.set(entityId, observer);
            }
        }

        function removeEntityObserver(entityId: string, scene: Scene): void {
            const observer = entityObservers.get(entityId);
            if (observer) {
                const entity = scene.getNodeById(entityId);
                if (entity) {
                    entity.onDisposeObservable.remove(observer);
                }
                entityObservers.delete(entityId);
            }
        }

        function cleanupScripts(scene: Scene): void {
            for (const [id, script] of runningScripts.entries()) {
                if (script.sceneUUID === scene.uid) {
                    script.instance.terminate();
                    runningScripts.delete(id);
                    removeEntityObserver(script.entityId, scene);
                }
            }
        }
    }
}

// 2. We will have the following lifecycle methods in scripts, how can we go about 

// Initialization Methods

// Awake()

// Called when the script instance is being loaded, even if the script is disabled
// Used for initialization between scripts
// Called only once during the lifetime of the script instance


// OnEnable()

// Called every time the object becomes enabled and active
// Used for any initialization that needs to happen when the object is activated
// Called after all objects are initialized, so you can safely speak to other objects


// Reset()

// Called when the user hits the Reset button in the Inspector's context menu or when adding the component the first time
// Used to set default values in the inspector


// Start()

// Called on the frame when the script is enabled just before any of the Update methods are called for the first time
// Used for initialization that needs to happen after all Awake() calls are finished
// Only called once per script instance



// Runtime Methods

// FixedUpdate()

// Called at a fixed time interval, independent of frame rate
// Used for physics calculations and updates
// Occurs before Update()


// Update()

// Called once per frame
// Main function for frame updates
// Used for regular updates, input handling, etc.


// LateUpdate()

// Called once per frame, after Update() has finished
// Used for final position modifications, camera following, etc.

// Physics Methods

// OnTriggerEnter(Collider other)

// Called when the Collider enters a trigger


// OnTriggerStay(Collider other)

// Called every frame while the Collider is in a trigger


// OnTriggerExit(Collider other)

// Called when the Collider has stopped touching a trigger


// OnCollisionEnter(Collision collision)

// Called when this collider/rigidbody has begun touching another rigidbody/collider


// OnCollisionStay(Collision collision)

// Called once per frame for every collider/rigidbody that is touching rigidbody/collider


// OnCollisionExit(Collision collision)

// Called when this collider/rigidbody has stopped touching another rigidbody/collider

// Scene Focus and Pause Methods

// OnSceneFocus(bool hasFocus)

// Called when the scene gains or loses focus


// OnScenePause(bool pauseStatus)

// Called when the scene pauses or resumes
