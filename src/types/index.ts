import { Mesh, Scene } from "@babylonjs/core";

import { SystemsIds } from "../enums/systems-ids";
import { ComponentsIds } from "../enums/components-ids";

export interface ISystem {
    id: SystemsIds;
    entities: Set<string>;
}

export interface IComponent {
    id: ComponentsIds;
}

interface IEntity {
    id: string;
    components: Set<ComponentsIds>
}

export interface IActor extends IEntity {
    mesh: Mesh;

    initialize(scene: Scene): void;
}