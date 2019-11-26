import { PointerInfo, Vector3, PickingInfo } from "@babylonjs/core";

import { SystemsIds } from "../../../enums/systems-ids";
import { BaseSystem } from "../base-system";
import { IEntity } from "../../../types";
import { MeshComponent } from "../../components/mesh";
import { ComponentsIds } from "../../../enums/components-ids";
import { HasPlayerControlsComponent } from "../../components/has-player-controls";

const MESH_ROTATION_OFFSET = -0.96;

class FollowMainArrowPointerSystem extends BaseSystem {
    private _pointerInfo: PickingInfo;

    constructor() {
        super(SystemsIds.MainArrowPointer);
    }

    public setArrowPointerInfo(info: PickingInfo): void {
        this._pointerInfo = info;
    }

    protected _initializeEntities(): void {
        this._entities = new Set(HasPlayerControlsComponent.entitiesSet);
    }
    
    protected _processEntity = (entity: IEntity): void => {
        const { value: mesh } = entity.components.get(ComponentsIds.Mesh) as MeshComponent;
  
        if (this._pointerInfo?.pickedPoint) {
            const distance = mesh.position.subtract(this._pointerInfo.pickedPoint);
            const rotationNormal = Vector3.Normalize(distance);
            // Using forward vector, since we are calculation angle between forward direction and mouse position
            const rotationAngle = Math.acos(Vector3.Dot(Vector3.Forward(), rotationNormal));
            const rotationDirection = rotationNormal.x >= 0 ? 1 : -1;

            mesh.rotation.y = (rotationAngle * rotationDirection) + MESH_ROTATION_OFFSET;
        } else {
            mesh.rotation.y = mesh.rotation.y;
        }
    }
}

export const FollowMainArrowPointerSystemInstance = new FollowMainArrowPointerSystem();
