import { Mesh } from "@babylonjs/core";
import { IEntity } from "../../../types";
import { ComponentsIds } from "../../../enums/components-ids";
import { BaseComponent } from "../base-component";

const SET: Set<IEntity> = new Set();

export class MeshComponent extends BaseComponent<Mesh> { 
    public get entities(): Set<IEntity> {
        return MeshComponent.entitiesSet;
    }

    public static entitiesSet: Set<IEntity> = SET;
    public id: ComponentsIds = ComponentsIds.Mesh;
}
