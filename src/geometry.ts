export enum Direction {
  North,
  West,
  South,
  East
}

export interface Point {
  x: number;
  y: number;
}

export type Vector = Point;

export function cartesianToIsometric({ x, y }: Point): Point {
  return {
    x: x - y,
    y: (x + y) / 2,
  };
}

export function isometricToCartesian({ x, y }: Point): Point {
  return {
    x: (2 * y + x) / 2,
    y: (2 * y - x) / 2,
  };
}
