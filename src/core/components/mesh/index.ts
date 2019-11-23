import { Mesh } from "@babylonjs/core";
import { IComponent, IEntity } from "../../../types";
import { ComponentsIds } from "../../../enums/components-ids";

const SET: Set<IEntity> = new Set();

class MeshComponent implements IComponent { 
    public get mesh(): Mesh {
        return this._mesh;
    }

    public get entities(): Set<IEntity> {
        return MeshComponent.entities;
    }

    public static entities: Set<IEntity>  = SET;
    public id: ComponentsIds = ComponentsIds.Mesh;

    private _mesh: Mesh;

    constructor(mesh: Mesh) {
        this._mesh = mesh;
    }
}

export default MeshComponent;
