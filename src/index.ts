import Phaser from 'phaser';

import './style.css';

import { BASE_GAME_CONFIG } from './config/index';

function preload() {
}

function create() {
}

function update() {
}

const config: Phaser.Types.Core.GameConfig = {
  ...BASE_GAME_CONFIG,
  scene: {
    preload,
    create,
    update,
  },
};

const GAME = new Phaser.Game(config);

export default GAME;
