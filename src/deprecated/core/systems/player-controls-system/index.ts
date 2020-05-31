import { Scene, ActionManager, ExecuteCodeAction, ActionEvent, Vector3, Camera } from "@babylonjs/core";
import { BaseSystem } from "../base-system";
import { SystemsIds } from "../../../enums/systems-ids";
import { MeshComponent } from "../../components/mesh";
import { SpeedComponent } from "../../components/speed";
import { IEntity } from "../../../types";
import { ComponentsIds } from "../../../enums/components-ids";
import { HasPlayerControlsComponent } from "../../components/has-player-controls";
import { ActiveCameraComponent } from "../../components/active-camera";

export class PlayerControlsSystem extends BaseSystem {
    private _inputMap: Record<string, boolean> = {};

    constructor(
        private CAMERA_PLAYER_OFFSET = new Vector3(0, 0, -15),
        private CAMERA_DEFAULT_OFFSET = new Vector3(0, 40, 40),
    ) {
        super(SystemsIds.PlayerControls);
    }

    public registerActions(scene: Scene): void {
        scene.actionManager = new ActionManager(scene);
        scene.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnKeyDownTrigger,

            (evt: ActionEvent) => {
                this._inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
            }),
        );
        scene.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnKeyUpTrigger,

            (evt: ActionEvent) => {
                this._inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
            }),
        );
    }

    protected _initializeEntities(): void {
        const entities = Array.from(HasPlayerControlsComponent.entitiesSet.values())
            .filter(entity => (MeshComponent.entitiesSet.has(entity)
                && SpeedComponent.entitiesSet.has(entity)
                && ActiveCameraComponent.entitiesSet.has(entity)
            ));

        this._entities = new Set(entities);
    }

    protected _processEntity = (entity: IEntity): void => {
        const direction = new Vector3(0, 0, 0);
        const { value: speed } = entity.components.get(ComponentsIds.Speed) as SpeedComponent;
        const { value: mesh } = entity.components.get(ComponentsIds.Mesh) as MeshComponent;
        const { value: camera } = entity.components.get(ComponentsIds.ActiveCamera) as ActiveCameraComponent;
    
        if (this._inputMap.w || this._inputMap.ArrowUp) {
          direction.z -= speed;
        }
        if (this._inputMap.s || this._inputMap.ArrowDown) {
          direction.z += speed;
        }
        if (this._inputMap.a || this._inputMap.ArrowLeft) {
          direction.x += speed;
        }
        if (this._inputMap.d || this._inputMap.ArrowRight) {
          direction.x -= speed;
        }

        mesh.moveWithCollisions(direction);
        
        if (camera) {
            camera.position = mesh.position.clone().add(this.CAMERA_DEFAULT_OFFSET);
        }
    }
}

export const PlayerControlsSystemInstance = new PlayerControlsSystem();
