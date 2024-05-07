import { uuidv4 } from "utils/utils_helper";
import { SpriteType } from "../@type";
import { GameEntity } from "../game/game_entity";

export const FoodSpriteType: SpriteType = "FOOD_SPRITE";

export class FoodSprite extends GameEntity {
  constructor(x: number, y: number) {
    super(uuidv4(), FoodSpriteType, 16, 16, 32, 32, { x, y }, { IDLE: [[0, 0]] });
  }

  setPosition(x: number, y: number): void {
    this.entity.position.x = x;
    this.entity.position.y = y;
    this.entity.hitbox = {
      top: y,
      right: x,
      bottom: y,
      left: x,
    };
  }
  setFrame(frameX: number, frameY: number): void {
    this.entity.frameX = frameX;
    this.entity.frameY = frameY;
  }
}
