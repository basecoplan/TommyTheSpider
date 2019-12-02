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
import { HemisphericLight } from '@babylonjs/core';


function addCanvas(): HTMLCanvasElement {
  const canvas: HTMLCanvasElement = document.createElement('canvas');

  canvas.id = 'renderCanvas';
  document.body.appendChild(canvas);

  return canvas;
}

function addLight(scene: Scene): HemisphericLight {
  const hemiLight = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
  hemiLight.diffuse.set(1, 0.7, 0.5);
  hemiLight.specular.set(1, 0.7, 0.5);
  hemiLight.direction.set(-1, 1, 0);
  hemiLight.shadowEnabled = true;
  hemiLight.intensity = 0.7;

  const light = new DirectionalLight('dir01', new Vector3(0.5, -1, 2), scene);
  light.position = new Vector3(0, 1, 0);
  light.intensity = 0.2;

  return hemiLight;
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

  addGround(scene);
  addActors(scene);

  const light = addLight(scene);

  // const shadowGenerator = new ShadowGenerator(1024, light);
  // actors.forEach((actor) => shadowGenerator.addShadowCaster(actor.mesh));
  // shadowGenerator.useExponentialShadowMap = true;
  // shadowGenerator.useContactHardeningShadow = true;

  return scene;
}

setup();


function addGround(scene: Scene) {
  const tileSize = 150;
  const grid = {
      'h' : 48,
      'w' : 48
  };

  const tiledGround = MeshBuilder.CreateTiledGround(
      "Tiled Ground",
      {xmin: -tileSize, zmin: -tileSize, xmax: tileSize, zmax: tileSize, subdivisions: grid},
      scene
    );

  tiledGround.receiveShadows = true;
  //Create the multi material
  // Create differents materials
  const whiteMaterial = new BABYLON.StandardMaterial("White", scene);
  whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

  const blackMaterial = new BABYLON.StandardMaterial("Black", scene);
  blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

  // Create Multi Material
  const multimat = new BABYLON.MultiMaterial("multi", scene);
  multimat.subMaterials.push(whiteMaterial);
  multimat.subMaterials.push(blackMaterial);


  // Apply the multi material
  // Define multimat as material of the tiled ground
  tiledGround.material = multimat;

  // Needed constiables to set subMeshes
  const verticesCount = tiledGround.getTotalVertices();
  const tileIndicesLength = tiledGround.getIndices().length / (grid.w * grid.h);

  // Set subMeshes of the tiled ground
  tiledGround.subMeshes = [];
  let base = 0;
  for (let row = 0; row < grid.h; row++) {
      for (let col = 0; col < grid.w; col++) {
          tiledGround.subMeshes.push(new BABYLON.SubMesh(row%2 ^ col%2, 0, verticesCount, base , tileIndicesLength, tiledGround));
          base += tileIndicesLength;
      }
  }
}