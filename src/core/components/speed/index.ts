import { IEntity } from "../../../types";
import { ComponentsIds } from "../../../enums/components-ids";
import { BaseComponent } from "../base-component";

const SET: Set<IEntity> = new Set();

export class SpeedComponent extends BaseComponent<number> { 
    public get entities(): Set<IEntity> {
        return SpeedComponent.entities;
    }

    public static entities: Set<IEntity> = SET;
    public id: ComponentsIds = ComponentsIds.Mesh;
}
