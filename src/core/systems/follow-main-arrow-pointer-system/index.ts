import { PointerInfo } from "@babylonjs/core";

import { SystemsIds } from "../../../enums/systems-ids";
import { BaseSystem } from "../base-system";
import { IEntity } from "../../../types";
import MeshComponent from "../../components/mesh";
import { ComponentsIds } from "../../../enums/components-ids";

class FollowMainArrowPointerSystem extends BaseSystem {
    private _pointerInfo: PointerInfo;

    constructor() {
        super(SystemsIds.MainArrowPointer);
    }

    public setArrowPointerInfo(info: PointerInfo): void {
        this._pointerInfo = info;

        console.log(this._pointerInfo);
        this._entities = new Set(MeshComponent.entities);
    }

    public process(): void {
        this._entities.forEach(this._processEntity);
    }

    protected _processEntity(entity: IEntity): void {
        const { mesh } = entity.components.get(ComponentsIds.Mesh) as MeshComponent;
    }
}

export const FollowMainArrowPointerSystemInstance = new FollowMainArrowPointerSystem();
