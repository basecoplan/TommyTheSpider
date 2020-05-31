import { IComponent, IEntity } from "../../../types";
import { ComponentsIds } from "../../../enums/components-ids";

export abstract class BaseComponent<T> implements IComponent<T> { 
    public get value(): T {
        return this._value;
    }

    public abstract get entities(): Set<IEntity>;

    public static entitiesSet: Set<IEntity>;
    public id: ComponentsIds;

    constructor(
        private _value: T
    ) {}
}