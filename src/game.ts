import Phaser, { Game, Types } from 'phaser';

import MainScene from './scene';


type GameConfig = Types.Core.GameConfig;

const config: GameConfig = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  scene: new MainScene(),
};

const game = new Game(config);

export default game;
