import Phaser from 'phaser';

const width = window.innerWidth;
const height = window.innerHeight;

export const BASE_GAME_CONFIG: Phaser.Types.Core.GameConfig = {
  // width: 1920,
  // height: 1080,
  width,
  height,
  type: Phaser.AUTO,
};

export default BASE_GAME_CONFIG;
