/* eslint-disable max-classes-per-file */
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { StandardMaterial, Color3 } from '@babylonjs/core';

import { BaseEntity } from './entities/base-enity';
import MeshComponent from './components/mesh';

class Actor extends BaseEntity {}


export class Enemy extends Actor {
  initialize(scene: Scene) {
    // TODO: Materials names enum
    const material = new StandardMaterial('EnemyMaterial', scene);
    material.diffuseColor = new Color3(1, 0, 0);

    const mesh = MeshBuilder.CreateBox('Box', { size: 4 }, scene);
    mesh.material = material;
    const meshComponent = new MeshComponent(mesh);

    this._components.add(meshComponent, this);
  }
}

export class Player extends Actor {
  initialize(scene: Scene) {
    const material = new StandardMaterial('EnemyMaterial', scene);
    material.diffuseColor = new Color3(0, 1, 0);

    const mesh = MeshBuilder.CreatePolyhedron('Actor', { type: 0, size: 2 }, scene);
    mesh.material = material;
    const meshComponent = new MeshComponent(mesh);

    this._components.add(meshComponent, this);
  }
}

export default { Enemy, Player };
