import { GameEntityState } from "../game/game_entity";

export type SpriteType = string;
export type SpriteAvatar = string;
export type SpriteImageSrc = string;
export type SpriteSheetType = Array<Array<number>>;

export interface PetAvatarOption {
  value: string;
  label: string;
  thumb: string;
  avatarSheet: SpriteSheet;
}

export interface PetSettings {
  petName: string;
  petAvatar: PetAvatarOption;
}

export interface EntityMap {
  id: string;
  petName: string;
  petAvatar: string;
  x: number;
  y: number;
  frameX: number;
  frameY: number;
  animationState: AnimationState;
  entityState: GameEntityState;
}

export interface SpriteSheet {
  IDLE: SpriteSheetType;
  NORTH?: SpriteSheetType;
  EAST?: SpriteSheetType;
  SOUTH?: SpriteSheetType;
  WEST?: SpriteSheetType;
  NORTH_EAST?: SpriteSheetType;
  NORTH_WEST?: SpriteSheetType;
  SOUTH_EAST?: SpriteSheetType;
  SOUTH_WEST?: SpriteSheetType;
  SLEEP?: SpriteSheetType;
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
  SLEEP = "SLEEP",
}

export interface PlayerMessage {
  id: string;
  name: string;
  message: string;
}
