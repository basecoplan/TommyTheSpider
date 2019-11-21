import { Mesh, Scene } from "@babylonjs/core";
import { SystemsIds } from "../enums/systems-ids";

export interface ISystem {
    id: SystemsIds;
    entities: Set<string>;
}

interface IEntity {
    id: string;
}

export interface IActor extends IEntity {
    mesh: Mesh;

    initialize(scene: Scene): void;
}