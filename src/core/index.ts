/* eslint-disable max-classes-per-file */
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { StandardMaterial, Color3 } from '@babylonjs/core';

import { BaseEntity } from './entities/base-enity';
import { MeshComponent } from './components/mesh';
import { SpeedComponent } from './components/speed';

class Actor extends BaseEntity {}


export class Enemy extends Actor {
  initialize(scene: Scene) {
    // TODO: Materials names enum
    const material = new StandardMaterial('EnemyMaterial', scene);
    material.diffuseColor = new Color3(1, 0, 0);

    const mesh = MeshBuilder.CreateBox('Box', { size: 4 }, scene);
    mesh.material = material;
    mesh.position.y = 2;
    mesh.receiveShadows = true;
    mesh.checkCollisions = true;

    const meshComponent = new MeshComponent(mesh);

    this._components.add(meshComponent, this);
  }
}

export class Player extends Actor {
  initialize(scene: Scene) : void {
    this._initializeMesh(scene);
    this._initializeSpeed();
  }

  private _initializeMesh(scene: Scene): void {
    const material = new StandardMaterial('EnemyMaterial', scene);
    material.diffuseColor = new Color3(0, 1, 0);

    const mesh = MeshBuilder.CreatePolyhedron('Actor', { type: 0, size: 2 }, scene);
    mesh.material = material;
    mesh.position.y = 2;
    mesh.receiveShadows = true;
    mesh.checkCollisions = true;

    const meshComponent = new MeshComponent(mesh);

    this._components.add(meshComponent, this);
  }

  private _initializeSpeed(): void {
    this._components.add(new SpeedComponent(0.4), this);
  }
}

export default { Enemy, Player };
