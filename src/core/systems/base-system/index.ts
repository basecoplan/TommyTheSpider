import { ISystem, IEntity } from '../../../types';
import { SystemsIds } from '../../../enums/systems-ids';

export abstract class BaseSystem implements ISystem {
    public get id(): SystemsIds {
        return this._id;
    }

    public get entities(): Set<IEntity> {
        return this._entities;
    }

    protected _entities: Set<IEntity> = new Set([]);

    constructor(
        protected _id: SystemsIds
    ) {
        this._initializeEntities();
    }

    public process(): void {
        this._entities.forEach(this._processEntity);
    }

    protected abstract _initializeEntities(): void;
    protected abstract _processEntity(entity: IEntity): void;
}
