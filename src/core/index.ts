/* eslint-disable max-classes-per-file */
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { StandardMaterial, Color3, Vector3, UniversalCamera } from '@babylonjs/core';

import { BaseEntity } from './entities/base-enity';
import { MeshComponent } from './components/mesh';
import { SpeedComponent } from './components/speed';
import { HasPlayerControlsComponent } from './components/has-player-controls';
import { ActiveCameraComponent } from './components/active-camera';
import { ComponentsIds } from '../enums/components-ids';
import { PositionComponent } from './components/position';

class Actor extends BaseEntity {
  initialize(scene: Scene): void {
    const defaultPosition = new Vector3(0, 2, 0);
    const positionComponent = new PositionComponent(defaultPosition);

    this._components.add(positionComponent, this);
  }
}

const CAMERA_DEFAULT_OFFSET = new Vector3(0, 40, 40);

export class Enemy extends Actor {
  initialize(scene: Scene): void {
    super.initialize(scene);

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
    this._initializePlayersControls();
    this._initializeCamera(scene);
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

  private _initializePlayersControls(): void {
    this._components.add(new HasPlayerControlsComponent(true), this);
  }

  private _initializeCamera(scene: Scene): void {
    const camera = new UniversalCamera('Camera', CAMERA_DEFAULT_OFFSET, scene);

    camera.setTarget((this.components.get(ComponentsIds.Mesh) as MeshComponent)?.value.position);

    this._components.add(new ActiveCameraComponent(camera), this);
  }
}

export default { Enemy, Player };
