export type SpriteType = string;

export interface EntityMap {
  id: string;
  petName: string;
  x: number;
  y: number;
}

export interface SpriteSheet {
  IDLE: number[][];
  NORTH?: number[][];
  EAST?: number[][];
  SOUTH?: number[][];
  WEST?: number[][];
  NORTH_EAST?: number[][];
  NORTH_WEST?: number[][];
  SOUTH_EAST?: number[][];
  SOUTH_WEST?: number[][];
}

export enum AnimationState {
  IDLE = "IDLE",
  NORTH = "NORTH",
  EAST = "EAST",
  SOUTH = "SOUTH",
  WEST = "WEST",
  NORTH_EAST = "NORTH_EAST",
  NORTH_WEST = "NORTH_WEST",
  SOUTH_EAST = "SOUTH_EAST",
  SOUTH_WEST = "SOUTH_WEST",
}
