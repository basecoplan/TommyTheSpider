import { Mesh, Scene } from "@babylonjs/core";

export interface IComponent {
    id: string
}

interface IEntity {
    id: string;
    components: Map<string, IComponent>;
}

export interface IActor extends IEntity {
    mesh: Mesh;

    initialize(scene: Scene): void;
}