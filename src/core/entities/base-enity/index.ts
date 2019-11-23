import { generateId } from "../../../utils/id-generator";
import { Scene } from "@babylonjs/core";
import { ComponentCollection } from "../../base/component-collection";
import { IComponent, IEntity } from "../../../types";
import { ComponentsIds } from "../../../enums/components-ids";

export class BaseEntity implements IEntity {
    public get id(): string {
        return this._id;
    }

    public get components(): Map<ComponentsIds, IComponent> {
        return this._components.entries;
    }

    protected _id: string;
    protected _components: ComponentCollection;

    constructor() {
        this._id = generateId();
        this._components = new ComponentCollection();
    }

    public initialize(scene: Scene): void {}
}