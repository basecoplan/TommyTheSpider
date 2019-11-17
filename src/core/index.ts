/* eslint-disable max-classes-per-file */
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { StandardMaterial, Color3 } from '@babylonjs/core';

abstract class Actor {
  id: string;

  mesh: Mesh;

  abstract initialize(scene: Scene): any;
}


export class Enemy extends Actor {
  initialize(scene: Scene) {
    // TODO: Materials names enum
    const material = new StandardMaterial('EnemyMaterial', scene);
    material.diffuseColor = new Color3(1, 0, 0);

    const mesh = MeshBuilder.CreateBox('Box', { size: 4 }, scene);
    mesh.material = material;

    this.mesh = mesh;
  }
}

export class Player extends Actor {
  initialize(scene: Scene) {
    const material = new StandardMaterial('EnemyMaterial', scene);
    material.diffuseColor = new Color3(0, 1, 0);

    const mesh = MeshBuilder.CreateCylinder('Cylinder', { diameter: 2, height: 4 }, scene);
    mesh.material = material;

    this.mesh = mesh;
  }
}

export default { Enemy, Player };
