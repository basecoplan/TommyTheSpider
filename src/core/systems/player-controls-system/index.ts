import { Scene, ActionManager, ExecuteCodeAction, ActionEvent, Vector3 } from "@babylonjs/core";
import { BaseSystem } from "../base-system";
import { SystemsIds } from "../../../enums/systems-ids";
import { MeshComponent } from "../../components/mesh";
import { SpeedComponent } from "../../components/speed";
import { IEntity } from "../../../types";
import { ComponentsIds } from "../../../enums/components-ids";

export class PlayerControlsSystem extends BaseSystem {
    private _inputMap: Record<string, boolean> = {};

    constructor() {
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
        const entities = Array.from(MeshComponent.entities.values())
            .filter(entity => (SpeedComponent.entities.has(entity)));

        this._entities = new Set(entities);
    }

    protected _processEntity(enitity: IEntity): void {
        const direction = new Vector3(0, 0, 0);
        const { value: speed } = enitity.components.get(ComponentsIds.Speed) as SpeedComponent;
    
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
    }
}