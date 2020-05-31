import { IEntity } from "../../../types";
import { ComponentsIds } from "../../../enums/components-ids";
import { BaseComponent } from "../base-component";

const SET: Set<IEntity> = new Set();

export class SpeedComponent extends BaseComponent<number> { 
    public get entities(): Set<IEntity> {
        return SpeedComponent.entitiesSet;
    }

    public static entitiesSet: Set<IEntity> = SET;
    public id: ComponentsIds = ComponentsIds.Speed;
}
