import { GameObjects, Scene } from 'phaser';

import { cartesianToIsometric, Direction, Vector } from './geometry';


class Tommy extends GameObjects.Sprite {
  private frames: Record<Direction, number> = {
    [Direction.North]: 8,
    [Direction.West]: 0,
    [Direction.South]: 24,
    [Direction.East]: 16,
  };

  constructor(scene: Scene) {
    super(scene, 0, 0, 'tommy');

    this.setFrame(this.frames[Direction.North]);

    // TODO: set correct depth
  }

  move(direction: Direction, delta: number) {
    let { x, y } = this;
    let vector: Vector;
    if (direction === Direction.North) {
      vector = { x: 0, y: -delta };
    } else if (direction === Direction.West) {
      vector = { x: -delta, y: 0 };
    } else if (direction === Direction.South) {
      vector = { x: 0, y: delta };
    } else if (direction === Direction.East) {
      vector = { x: delta, y: 0 };
    }
    if (vector) {
      const { x: deltaX, y: deltaY } = cartesianToIsometric(vector);
      x += deltaX;
      y += deltaY;
    }
    this.setPosition(x, y);

    const frame = this.frames[direction];
    if (frame !== undefined) {
      this.setFrame(frame);
    }
  }
}

export default Tommy;
