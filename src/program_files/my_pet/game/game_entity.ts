import { AnimationState, SpriteSheet, SpriteSheetType, SpriteType } from "../@type";
import { playAnimation } from "../utils/utils_helper";
import { Game } from "./game";

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

export enum GameEntityState {
  IDLE,
  MOVING,
}

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
  avatarSheet: SpriteSheet;
  frameX: number;
  frameY: number;
  currentFrameIndex: number;
  timeSinceLastFrame: number;
}

export class GameEntity {
  entity: Entity;
  entityAnimationState: AnimationState = AnimationState.IDLE;
  entityState: GameEntityState = GameEntityState.IDLE;

  game: Game | undefined;

  constructor(
    id: string,
    type: SpriteType,
    sw: number,
    sh: number,
    dw: number,
    dh: number,
    position: GameEntityPosition,
    spriteSheet: SpriteSheet
  ) {
    this.entity = {
      id: id,
      type: type,

      sw: sw,
      sh: sh,
      dw: dw,
      dh: dh,

      speed: 0.15,

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
    playAnimation(this, <SpriteSheetType>this.entity.avatarSheet[this.entityAnimationState], delta);
  }
  draw(): void {
    this.drawEntity();
  }

  private drawEntity(): void {
    this.game?.context?.drawImage(
      <HTMLImageElement>this.game.gameAsset?.get(this.entity.type),
      this.entity.frameX * this.entity.sw,
      this.entity.frameY * this.entity.sh,
      this.entity.sw,
      this.entity.sh,
      this.entity.position.x - this.entity.dw / 2,
      this.entity.position.y - this.entity.dh / 2,
      this.entity.dw,
      this.entity.dh
    );
  }
}
