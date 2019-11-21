/* eslint-disable max-classes-per-file */
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { StandardMaterial, Color3 } from '@babylonjs/core';

import { IActor } from '../types';
import { generateId } from '../utils/id-generator';
import { SystemsIds } from '../enums/systems-ids';
import { ComponentsIds } from '../enums/components-ids';

class Actor implements IActor {
  public get id(): string {
    return this._id;
  }

  public get mesh(): Mesh {
    return this._mesh;
  }

  public get components(): Set<ComponentsIds> {
    return this._components;
  }

  protected _id: string;
  protected _mesh: Mesh;
  protected _components: Set<ComponentsIds>;

  constructor() {
    this._id = generateId();
    this._components = new Set();
  }

  public initialize(scene: Scene): void {}
}


export class Enemy extends Actor {
  initialize(scene: Scene) {
    // TODO: Materials names enum
    const material = new StandardMaterial('EnemyMaterial', scene);
    material.diffuseColor = new Color3(1, 0, 0);

    const mesh = MeshBuilder.CreateBox('Box', { size: 4 }, scene);
    mesh.material = material;

    this._mesh = mesh;
  }
}

export class Player extends Actor {
  initialize(scene: Scene) {
    const material = new StandardMaterial('EnemyMaterial', scene);
    material.diffuseColor = new Color3(0, 1, 0);

    const mesh = MeshBuilder.CreatePolyhedron('Actor', { type: 0, size: 2 }, scene);
    mesh.material = material;

    this._mesh = mesh;
  }
}

export default { Enemy, Player };
