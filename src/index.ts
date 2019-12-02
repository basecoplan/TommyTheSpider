/* eslint-disable no-param-reassign */
import * as BABYLON from '@babylonjs/core';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight';

import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';

import '@babylonjs/core/Materials/standardMaterial';
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent';

import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';

import './style.scss';

import { Player, Enemy } from './core';
import { FollowMainArrowPointerSystemInstance } from './core/systems/follow-main-arrow-pointer-system';
import { PlayerControlsSystemInstance } from './core/systems/player-controls-system';
import { StaticMeshPositionSystemInstance } from './core/systems/static-mesh-position-system';


function addCanvas(): HTMLCanvasElement {
  const canvas: HTMLCanvasElement = document.createElement('canvas');

  canvas.id = 'renderCanvas';
  document.body.appendChild(canvas);

  return canvas;
}

function addLight(scene: Scene): DirectionalLight {
  const light = new DirectionalLight('dir01', new Vector3(-1, -2, -1), scene);
  light.position = new Vector3(20, 40, 20);
  light.intensity = 0.5;
  return light;
}

function addActors(scene: Scene) {
  const player = new Player();
  const enemy1 = new Enemy();
  const enemy2 = new Enemy();

  const enemies = [enemy1, enemy2];
  const actors = [player, ...enemies];

  actors.forEach((a) => {
    a.initialize(scene);
  });

  enemies.forEach(({id}, index) => {
    StaticMeshPositionSystemInstance.defaultPositions.set(id, new Vector3(index * 16 + 4, 0));
  });

  return actors;
}

function registerEventListeners(scene: Scene) {
  scene.onPointerObservable.add((pointerInfo) => {
    switch (pointerInfo.type) {
      case BABYLON.PointerEventTypes.POINTERMOVE:
          const pointerInfo = scene.pick(scene.pointerX, scene.pointerY);
          FollowMainArrowPointerSystemInstance.setArrowPointerInfo(pointerInfo);
        break;
      default:
        break;
    }
  });
}

function setup() {
  const canvas = addCanvas();
  const engine = new Engine(canvas);
  const scene = addScene(engine, canvas);

  PlayerControlsSystemInstance.registerActions(scene);
  scene.onBeforeRenderObservable.add(() => {
    PlayerControlsSystemInstance.process();
    FollowMainArrowPointerSystemInstance.process();
  });

  StaticMeshPositionSystemInstance.process();

  registerEventListeners(scene);

  engine.runRenderLoop(() => {
    scene.render();
  });
}

function addScene(engine: Engine, canvas: HTMLCanvasElement) {
  const scene = new Scene(engine);
  scene.collisionsEnabled = true;

  const groundConfig = {
    width: 512,
    height: 512,
    subdivisions: 4,
  };
  const ground = MeshBuilder.CreateGround('Ground', groundConfig, scene);
  ground.receiveShadows = true;
  
  addActors(scene);

  const light = addLight(scene);

  // const shadowGenerator = new ShadowGenerator(1024, light);
  // actors.forEach((actor) => shadowGenerator.addShadowCaster(actor.mesh));
  // shadowGenerator.useExponentialShadowMap = true;
  // shadowGenerator.useContactHardeningShadow = true;

  return scene;
}

setup();
