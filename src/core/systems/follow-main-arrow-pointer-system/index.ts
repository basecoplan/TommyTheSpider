import { PointerInfo } from "@babylonjs/core";

import { SystemsIds } from "../../../enums/systems-ids";
import { BaseSystem } from "../base-system";
import { IEntity } from "../../../types";
import { MeshComponent } from "../../components/mesh";
import { ComponentsIds } from "../../../enums/components-ids";

class FollowMainArrowPointerSystem extends BaseSystem {
    private _pointerInfo: PointerInfo;

    constructor() {
        super(SystemsIds.MainArrowPointer);
    }

    public setArrowPointerInfo(info: PointerInfo): void {
        this._pointerInfo = info;

        console.log(this._pointerInfo);
    }

    protected _initializeEntities(): void {
        this._entities = new Set(MeshComponent.entities);
    }
    
    protected _processEntity(entity: IEntity): void {
        const { value: mesh } = entity.components.get(ComponentsIds.Mesh) as MeshComponent;
    }
}

export const FollowMainArrowPointerSystemInstance = new FollowMainArrowPointerSystem();
