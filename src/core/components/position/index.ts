import { Vector3 } from "@babylonjs/core";
import { IEntity } from "../../../types";
import { ComponentsIds } from "../../../enums/components-ids";
import { BaseComponent } from "../base-component";

const SET: Set<IEntity> = new Set();

export class PositionComponent extends BaseComponent<Vector3> { 
    public get entities(): Set<IEntity> {
        return PositionComponent.entitiesSet;
    }

    public static entitiesSet: Set<IEntity> = SET;
    public id: ComponentsIds = ComponentsIds.Position;
}
