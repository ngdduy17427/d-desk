import { uuidv4 } from "utils/utils_helper";
import { SpriteSheet, SpriteType } from "../@type";
import { playAnimation } from "../utils/utils_helper";
import { Game } from "./game";

export type GameEntityImageSrc = string;

interface Entity {
  id: string;
  type: SpriteType;
  sw: number;
  sh: number;
  dw: number;
  dh: number;
  speed: number;
  position: GameEntityPosition;
  hitbox: GameEntityHitbox;
  avatar: HTMLImageElement;
  avatarSheet: SpriteSheet;
  frameX: number;
  frameY: number;
  currentFrameIndex: number;
  timeSinceLastFrame: number;
}

export interface GameEntityPosition {
  x: number;
  y: number;
}

export interface GameEntityHitbox {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export class GameEntity {
  entity: Entity;
  game: Game;

  constructor(
    type: SpriteType,
    sw: number,
    sh: number,
    dw: number,
    dh: number,
    speed: number,
    position: GameEntityPosition,
    spriteImageSrc: GameEntityImageSrc,
    spriteSheet: SpriteSheet
  ) {
    const spriteImage = new Image();
    spriteImage.src = spriteImageSrc;

    this.entity = {
      id: uuidv4(),
      type: type,

      sw: sw,
      sh: sh,
      dw: dw,
      dh: dh,

      speed: speed,

      position: {
        x: position.x,
        y: position.y,
      },

      hitbox: {
        top: position.y - dh / 2,
        right: position.x + dw / 2,
        bottom: position.y + dh / 2,
        left: position.x - dw / 2,
      },

      avatar: spriteImage,
      avatarSheet: spriteSheet,

      frameX: 0,
      frameY: 0,

      currentFrameIndex: 0,
      timeSinceLastFrame: 0,
    };
  }

  init(game: Game): void {
    this.game = game;
  }
  update(delta: number): void {
    playAnimation(this, this.entity.avatarSheet.IDLE, delta);
  }
  draw(context: CanvasRenderingContext2D): void {
    this.drawEntity(context);
  }

  private drawEntity(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.entity.avatar,
      this.entity.frameX,
      this.entity.frameY,
      this.entity.sw,
      this.entity.sh,
      this.entity.position.x - this.entity.dw / 2,
      this.entity.position.y - this.entity.dh / 2,
      this.entity.dw,
      this.entity.dh
    );
  }
}
