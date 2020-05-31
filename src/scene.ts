import { Scene } from 'phaser';

import { cartesianToIsometric } from './core/geometry';
import tileset from './assets/tileset.png';
import mapJson from './assets/map.json';


class MainScene extends Scene {
  constructor() {
    super({});
  }

  preload() {
    const {
      tilewidth: tileWidth,
      tileheight: tileHeight,
    } = mapJson;
    this.load.spritesheet('tiles', tileset, { frameWidth: tileWidth, frameHeight: tileHeight });
  }

  create() {
    const {
      tilewidth: tileWidth,
      tileheight: tileHeight,
      layers,
    } = mapJson;

    layers.forEach((layer) => {
      const layerData = layer.data;

      const mapWidth = layer.width;
      const mapHeight = layer.height;

      const offsetX = (mapWidth * tileWidth) / 2;
      const offsetY = tileHeight / 2;

      for (let y = 0; y < mapHeight; ++y) {
        for (let x = 0; x < mapWidth; ++x) {
          const tileId = layerData[y * mapHeight + x] - 1;

          /**
           * use tileHeight in both cases
           * because [px, py] is position of square tile
           * and tileWidth == 2 * tileHeight for iso
           */
          const px = x * tileHeight;
          const py = y * tileHeight;

          const { x: tileX, y: tileY } = cartesianToIsometric({ x: px, y: py });

          // add offset to move to center
          this.add.image(offsetX + tileX, offsetY + tileY, 'tiles', tileId);
        }
      }
    });
  }
}

export default MainScene;
