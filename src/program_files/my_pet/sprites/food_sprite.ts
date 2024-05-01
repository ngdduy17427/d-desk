import { SpriteSheet, SpriteType } from "../@type";
import { GameEntity, GameEntityImageSrc, GameEntityPosition } from "../game/game_entity";

export const FoodSpriteType: SpriteType = "FOOD_SPRITE";

export class FoodSprite extends GameEntity {
  constructor(
    sw: number,
    sh: number,
    dw: number,
    dh: number,
    position: GameEntityPosition,
    spriteImageSrc: GameEntityImageSrc,
    spriteSheet: SpriteSheet
  ) {
    super(
      FoodSpriteType,
      sw,
      sh,
      dw,
      dh,
      160,
      {
        x: position.x,
        y: position.y,
      },
      spriteImageSrc,
      spriteSheet
    );
  }

  update(delta: number): void {
    super.update(delta);
  }
  draw(context: CanvasRenderingContext2D): void {
    super.draw(context);
  }
}
