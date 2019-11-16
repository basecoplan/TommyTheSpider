import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight';

import '@babylonjs/core/Materials/standardMaterial';
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent';
import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';

import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';

import './style.css';


function addCanvas(): HTMLCanvasElement {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.id = 'renderCanvas';
  document.body.appendChild(canvas);
  return canvas;
}

function addCamera(scene: Scene, canvas: HTMLCanvasElement): ArcRotateCamera {
  const cameraPosition = Vector3.Center(Vector3.Zero(), Vector3.One());
  const camera = new ArcRotateCamera('Camera', (3 * Math.PI) / 4, Math.PI / 4, 4, cameraPosition, scene);
  camera.attachControl(canvas, true);
  camera.position = new Vector3(20, 20, 20);
  return camera;
}


function addLight(scene: Scene): DirectionalLight {
  const light = new DirectionalLight('dir01', new Vector3(-1, -2, -1), scene);
  light.position = new Vector3(20, 40, 20);
  light.intensity = 0.5;
  return light;
}

function addScene(engine: Engine, canvas: HTMLCanvasElement) {
  const scene = new Scene(engine);

  addCamera(scene, canvas);

  const ground = MeshBuilder.CreateGround('Ground', { width: 40, height: 40, subdivisions: 4 }, scene);
  ground.receiveShadows = true;
  const box = MeshBuilder.CreateBox('Box', { size: 4 }, scene);
  box.position.y = 2;

  const light = addLight(scene);

  const shadowGenerator = new ShadowGenerator(1024, light);
  shadowGenerator.addShadowCaster(box);
  shadowGenerator.useExponentialShadowMap = true;

  return scene;
}

function setup() {
  const canvas = addCanvas();
  const engine = new Engine(canvas);
  const scene = addScene(engine, canvas);

  engine.runRenderLoop(() => {
    scene.render();
  });
}

setup();
