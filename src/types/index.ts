import { Mesh, Scene } from "@babylonjs/core";

import { SystemsIds } from "../enums/systems-ids";
import { ComponentsIds } from "../enums/components-ids";

export interface ISystem {
    id: SystemsIds;
    entities: Set<IEntity>;
}

export interface IComponent<T = unknown> {
    id: ComponentsIds;
    value: T;
    entities: Set<IEntity>;
}

export interface IEntity {
    id: string;
    components: Map<ComponentsIds, IComponent>;
}

export interface IActor extends IEntity {
    mesh: Mesh;

    initialize(scene: Scene): void;
}