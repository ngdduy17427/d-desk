export enum Direction {
  IDLE = 'I',
  NORTH = 'N',
  EAST = 'E',
  SOUTH = 'S',
  WEST = 'W',
}

export type SpriteSheet = {
  IDLE: SpriteSheetState
  IDLE_NORTH?: SpriteSheetState
  IDLE_EAST?: SpriteSheetState
  IDLE_SOUTH?: SpriteSheetState
  IDLE_WEST?: SpriteSheetState
  NORTH?: SpriteSheetState
  EAST?: SpriteSheetState
  SOUTH?: SpriteSheetState
  WEST?: SpriteSheetState
  NORTH_EAST?: SpriteSheetState
  NORTH_WEST?: SpriteSheetState
  SOUTH_EAST?: SpriteSheetState
  SOUTH_WEST?: SpriteSheetState
  SLEEP?: SpriteSheetState
}
export type EntityId = string
export type EntitySpeed = number
export type SpriteSheetState = Array<Array<number>>
export type PlayerName = string
export type EntityPosition = {
  x: number
  y: number
}
export type EntityScale = {
  width: number
  height: number
}
export type EntityAnimation = {
  spriteSheet: SpriteSheet
  spriteSheetState: SpriteSheetState
  frameX: number
  frameY: number
  currentFrameIndex: number
  timeSinceLastFrame: number
}
export type EntityDirections = {
  NORTH: boolean
  EAST: boolean
  SOUTH: boolean
  WEST: boolean
  lastDirection: Direction
}
export type PlayerSettings = {
  name: PlayerName
}
export type PlayerMessage = {
  id: EntityId
  name: PlayerName
  message: string
  time: number
}
export type InputState = {
  pressed: Record<Direction, boolean>
}
export type PlayerSnapshotLite = {
  id: string
  name: string
  x: number
  y: number
}
export type WorldSnapshotLite = {
  players: PlayerSnapshotLite[]
}
export type PlayerSnapshot = {
  id: EntityId
  name: PlayerName
  x: number
  y: number
  vx: number
  vy: number
  lastDir: Direction | null
}
export type WorldSnapshot = {
  tick: number
  serverTime: number
  players: PlayerSnapshot[]
}
