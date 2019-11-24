import { IComponent, IEntity } from "../../../types";
import { ComponentsIds } from "../../../enums/components-ids";

const SET: Set<IEntity> = new Set();

export class HasPlayerControlsComponent implements IComponent { 
    public get value(): boolean {
        return this._value;
    }

    public get entities(): Set<IEntity> {
        return HasPlayerControlsComponent.entitiesSet;
    }

    public static entitiesSet: Set<IEntity> = SET;
    public id: ComponentsIds = ComponentsIds.HasPlayerControls;

    constructor(
        private _value: boolean,
    ){}
}
