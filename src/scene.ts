import { Scene, Input } from 'phaser';

import { cartesianToIsometric, Direction, Vector } from './geometry';
import Tommy from './tommy';

import tommySprites from './assets/idle.png'; // not tommy yet
import tileset from './assets/tileset.png';
import mapJson from './assets/map.json';


class MainScene extends Scene {
  private tommy: Tommy;

  private baseTileSize = 0;

  private mapOffset: Vector = { x: 0, y: 0 };

  private keys: Record<string, Input.Keyboard.Key>;

  constructor() {
    super({});
  }

  preload() {
    const {
      tilewidth: tileWidth,
      tileheight: tileHeight,
    } = mapJson;
    this.load.spritesheet('tiles', tileset, { frameWidth: tileWidth, frameHeight: tileHeight });
    this.load.spritesheet('tommy', tommySprites, { frameWidth: 128, frameHeight: 128 });
  }

  create() {
    this.initMap();
    this.initTommy();
    this.initKeyboard();
  }

  update() {
    if (!this.tommy) return;

    const delta = 3;

    let direction: Direction;

    if (this.keys.W.isDown) {
      direction = Direction.North;
    } else if (this.keys.A.isDown) {
      direction = Direction.West;
    } else if (this.keys.S.isDown) {
      direction = Direction.South;
    } else if (this.keys.D.isDown) {
      direction = Direction.East;
    }

    if (direction !== undefined) {
      this.tommy.move(direction, delta);
    }
  }

  initTommy() {
    this.tommy = new Tommy(this);
    this.add.existing(this.tommy);

    // place on 3-10 tile
    const x = this.baseTileSize * 3;
    const y = this.baseTileSize * 10;

    const d = cartesianToIsometric({ x, y });
    this.tommy.setPosition(
      this.mapOffset.x + d.x,
      // TODO: (-this.baseTileSize / 2) remove this magic number
      this.mapOffset.y - this.baseTileSize / 2 + d.y,
    );
  }


  initMap() {
    const {
      tilewidth: tileWidth,
      tileheight: tileHeight,
      layers,
    } = mapJson;

    this.baseTileSize = tileHeight;

    layers.forEach((layer) => {
      const layerData = layer.data;

      const mapWidth = layer.width;
      const mapHeight = layer.height;

      this.mapOffset = {
        x: (mapWidth * tileWidth) / 2, // center map
        y: tileHeight / 2, // add extra half after transforming
      };

      for (let y = 0; y < mapHeight; ++y) {
        for (let x = 0; x < mapWidth; ++x) {
          const tileId = layerData[y * mapHeight + x] - 1;

          /**
           * use tileHeight in both cases
           * because [px, py] is position of square tile
           * and tileWidth == 2 * tileHeight for iso
           */
          const px = x * this.baseTileSize;
          const py = y * this.baseTileSize;

          const { x: tileX, y: tileY } = cartesianToIsometric({ x: px, y: py });

          // add offset to move to center
          this.add.image(this.mapOffset.x + tileX, this.mapOffset.y + tileY, 'tiles', tileId);

          // TODO: set correct depth
        }
      }
    });
  }

  initKeyboard() {
    this.keys = this.input.keyboard.addKeys('W,A,S,D') as Record<string, Input.Keyboard.Key>;
  }
}

export default MainScene;
