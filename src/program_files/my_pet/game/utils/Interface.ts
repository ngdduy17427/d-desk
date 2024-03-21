export interface SpriteSheet {
  IDLE: number[][];
  NORTH: number[][];
  EAST: number[][];
  SOUTH: number[][];
  WEST: number[][];
  ALERT?: number[][];
}

export interface Entity {
  id: any;
  width: number;
  height: number;
  speed: number;
  position: {
    x: number;
    y: number;
  };
  avatar: string;
  spriteSheet: SpriteSheet;
  currentFrameIndex: number;
  timeSinceLastFrame: number;
}
