export enum PetOptions {
  WHITE_CAT = "WHITE_CAT",
  YELLOW_CAT = "YELLOW_CAT",
  BROWN_CAT = "BROWN_CAT",
  BLACK_CAT = "BLACK_CAT",
}
export type PetName = string;
export type PetOption = string;
export interface PetSelectOption {
  value: string;
  label: string;
  thumb: string;
  spriteSheet: SpriteSheet;
}
export interface PetSettings {
  petName: PetName;
  petSelectOption: PetSelectOption;
}
export enum SpriteActionState {
  IDLE,
  MOVING,
  SLEEP,
}
export type SpriteId = string;
export type SpriteType = string;
export type SpriteAssetImage = HTMLImageElement;
export type SpriteName = string;
export type SpriteAvatar = string;
export type SpriteSheetState = Array<Array<number>>;
export interface SpritePosition {
  x: number;
  y: number;
}
export interface SpriteScale {
  width: number;
  height: number;
}
export interface SpriteDirection {
  NORTH: boolean;
  EAST: boolean;
  SOUTH: boolean;
  WEST: boolean;
}
export interface SpriteSheet {
  IDLE: SpriteSheetState;
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
export interface SpriteAnimation {
  spriteSheet: SpriteSheet;
  spriteSheetState: SpriteSheetState;
  frameX: number;
  frameY: number;
  currentFrameIndex: number;
  timeSinceLastFrame: number;
}

export interface PlayerPet {
  id: SpriteId;
  spriteName: SpriteName;
  spriteAvatar: SpriteAvatar;
  x: number;
  y: number;
}
export interface PlayerMessage {
  id: SpriteId;
  name: SpriteName;
  message: string;
}
