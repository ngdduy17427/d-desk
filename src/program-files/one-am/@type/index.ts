export enum Direction {
  IDLE,
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

export type EntityId = string;
export type EntitySpeed = number;
export type SpriteSheetState = Array<Array<number>>;
export type PlayerName = string;

export interface EntityPosition {
  x: number;
  y: number;
}
export interface EntityScale {
  width: number;
  height: number;
}
export interface SpriteSheet {
  IDLE: SpriteSheetState;
  IDLE_NORTH?: SpriteSheetState;
  IDLE_EAST?: SpriteSheetState;
  IDLE_SOUTH?: SpriteSheetState;
  IDLE_WEST?: SpriteSheetState;
  NORTH?: SpriteSheetState;
  EAST?: SpriteSheetState;
  SOUTH?: SpriteSheetState;
  WEST?: SpriteSheetState;
  NORTH_EAST?: SpriteSheetState;
  NORTH_WEST?: SpriteSheetState;
  SOUTH_EAST?: SpriteSheetState;
  SOUTH_WEST?: SpriteSheetState;
  SLEEP?: SpriteSheetState;
}
export interface EntityAnimation {
  spriteSheet: SpriteSheet;
  spriteSheetState: SpriteSheetState;
  frameX: number;
  frameY: number;
  currentFrameIndex: number;
  timeSinceLastFrame: number;
}
export interface EntityDirections {
  NORTH: boolean;
  EAST: boolean;
  SOUTH: boolean;
  WEST: boolean;
  lastDirection: Direction;
}
export interface PlayerSettings {
  playerName: PlayerName;
}
export interface PlayerEntity {
  id: EntityId;
  playerName: PlayerName;
  x: number;
  y: number;
}
export interface PlayerMessage {
  id: EntityId;
  name: PlayerName;
  message: string;
}
