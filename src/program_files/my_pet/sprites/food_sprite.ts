import { randomNumber, uuidv4 } from "utils/utils_helper";
import { SpriteType } from "../@type";
import { GameEntity } from "../game/game_entity";

export const FoodSpriteType: SpriteType = "FOOD_SPRITE";

export class FoodSprite extends GameEntity {
  constructor(x: number, y: number) {
    super(
      uuidv4(),
      FoodSpriteType,
      16,
      16,
      32,
      32,
      160,
      { x, y },
      `${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/fruits.png`,
      { IDLE: [[randomNumber(0, 3), randomNumber(0, 3)]] }
    );
  }

  update(delta: number): void {
    super.update(delta);
  }
  draw(): void {
    super.draw();
  }

  setPosition(x: number, y: number) {
    this.entity.position.x = x;
    this.entity.position.y = y;
    this.entity.hitbox = {
      top: y,
      right: x,
      bottom: y,
      left: x,
    };
  }
  setFrame(frameX: number, frameY: number) {
    this.entity.frameX = frameX * this.entity.sw;
    this.entity.frameY = frameY * this.entity.sh;
  }
}
