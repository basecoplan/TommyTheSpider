/* eslint-disable no-param-reassign */
import * as BABYLON from '@babylonjs/core';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight';

import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';

import { ActionManager } from '@babylonjs/core/Actions/actionManager';
import { ExecuteCodeAction, ActionEvent } from '@babylonjs/core/Actions';

import '@babylonjs/core/Materials/standardMaterial';
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent';

import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';

import './style.scss';

import { Player, Enemy } from './core';
import { FollowMainArrowPointerSystemInstance } from './core/systems/follow-main-arrow-pointer-system';


function addCanvas(): HTMLCanvasElement {
  const canvas: HTMLCanvasElement = document.createElement('canvas');

  canvas.id = 'renderCanvas';
  document.body.appendChild(canvas);

  return canvas;
}

const CAMERA_PLAYER_OFFSET = new Vector3(0, 0, -15);
const CAMERA_DEFAULT_OFFSET = new Vector3(0, 40, 40);

const PLAYER_SPEED = 0.4;

function addCamera(
  scene: Scene,
  canvas: HTMLCanvasElement,
  target: BABYLON.Mesh,
): BABYLON.UniversalCamera {
  const camera = new BABYLON.UniversalCamera('Camera', CAMERA_DEFAULT_OFFSET, scene);

  camera.setTarget(target.position.add(CAMERA_PLAYER_OFFSET));

  return camera;
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

  const actors = [player, enemy1, enemy2];

  actors.forEach((a) => {
    a.initialize(scene);

    a.mesh.position.y = 2;
    a.mesh.receiveShadows = true;
    a.mesh.checkCollisions = true;
  });

  enemy1.mesh.position.x = 4;
  enemy2.mesh.position.x = -4;

  return actors;
}

function registerKeys(scene: Scene, player: Player, camera: BABYLON.UniversalCamera) {
  // Keyboard events
  const inputMap: Record<string, boolean> = {};

  scene.actionManager = new ActionManager(scene);
  scene.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnKeyDownTrigger,
      (evt: ActionEvent) => {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
      }),
  );
  scene.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnKeyUpTrigger,
      (evt: ActionEvent) => {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
      }),
  );

  scene.onBeforeRenderObservable.add(() => {
    const direction = new Vector3(0, 0, 0);
    const speed = PLAYER_SPEED;

    if (inputMap.w || inputMap.ArrowUp) {
      direction.z -= speed;
    }
    if (inputMap.s || inputMap.ArrowDown) {
      direction.z += speed;
    }
    if (inputMap.a || inputMap.ArrowLeft) {
      direction.x += speed;
    }
    if (inputMap.d || inputMap.ArrowRight) {
      direction.x -= speed;
    }

    player.mesh.moveWithCollisions(direction);

    camera.position = player.mesh.position.add(CAMERA_DEFAULT_OFFSET);
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

  const actors = addActors(scene);
  const camera = addCamera(scene, canvas, actors[0].mesh);

  registerKeys(scene, actors[0], camera);

  const light = addLight(scene);

  const shadowGenerator = new ShadowGenerator(1024, light);
  actors.forEach((actor) => shadowGenerator.addShadowCaster(actor.mesh));
  shadowGenerator.useExponentialShadowMap = true;
  shadowGenerator.useContactHardeningShadow = true;

  return scene;
}

function registerEventListeners(scene: Scene) {
  scene.onPointerObservable.add((pointerInfo) => {
    switch (pointerInfo.type) {
      case BABYLON.PointerEventTypes.POINTERMOVE:
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

  registerEventListeners(scene);

  engine.runRenderLoop(() => {
    scene.render();
  });
}

setup();
