import { ISystem } from "../../../types";
import { SystemsIds } from "../../../enums/systems-ids";

export class BaseSystem implements ISystem {
    public get id(): SystemsIds {
        return this._id;
    }

    public get entities(): Set<string> {
        return this._entities;
    }

    protected _entities: Set<string> = new Set([]);

    constructor(
        protected _id: SystemsIds
    ) {}
}
