/* eslint-disable max-classes-per-file */
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';

abstract class Actor {
  id: string;

  mesh: Mesh;

  abstract initialize(scene: Scene): any;
}


export class Enemy extends Actor {
  initialize(scene: Scene) {
    this.mesh = MeshBuilder.CreateBox('Box', { size: 4 }, scene);
  }
}

export class Player extends Actor {
  initialize(scene: Scene) {
    this.mesh = MeshBuilder.CreateCylinder('Cylinder', { diameter: 2, height: 4 }, scene);
  }
}

export default { Enemy, Player };
