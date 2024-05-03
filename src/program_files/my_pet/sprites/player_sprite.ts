import { randomNumber } from "utils/utils_helper";
import { Game } from "../game/game";
import { GameEntityHitbox } from "../game/game_entity";
import { isCollision, moveToPoint, playAnimation } from "../utils/utils_helper";
import { FoodSprite } from "./food_sprite";
import { PetSprite, PetSpriteState } from "./pet_sprite";

export class PlayerSprite extends PetSprite {
  private foodSprite: FoodSprite | undefined = new FoodSprite(-100, -100);

  constructor(id: string, petName: string, x: number, y: number) {
    super(id, petName, x, y);
  }

  init(game: Game): void {
    super.init(game);
    this.foodSprite?.init(game);

    this.game?.socket?.emit("playerJoin", {
      id: this.entity.id,
      petName: this.petName,
      x: this.entity.position.x,
      y: this.entity.position.y,
    });

    addEventListener("mousedown", (event: MouseEvent): void => this.onMoveToMouse(event));
    addEventListener("touchstart", (event: TouchEvent): void => this.onMoveToTouch(event));
  }
  update(delta: number): void {
    this.entityAction(delta);
  }
  draw(): void {
    this.foodSprite?.draw();
    super.draw();
  }

  entityAction(delta: number): void {
    switch (this.entityState) {
      case PetSpriteState.IDLE: {
        return playAnimation(this, this.entity.avatarSheet.IDLE, delta);
      }
      case PetSpriteState.MOVING: {
        if (isCollision(this.entity.hitbox, <GameEntityHitbox>this.foodSprite?.entity.hitbox)) {
          this.entityState = PetSpriteState.IDLE;
          this.foodSprite?.setPosition(-100, -100);
          return;
        }

        this.game?.socket?.emit("playerUpdate", {
          id: this.entity.id,
          petName: this.petName,
          x: this.entity.position.x,
          y: this.entity.position.y,
        });

        return moveToPoint(
          this,
          Number(this.foodSprite?.entity.position.x),
          Number(this.foodSprite?.entity.position.y),
          delta
        );
      }
      default:
        break;
    }
  }
  private onAddFood(x: number, y: number): void {
    if (!this.foodSprite) return;

    this.foodSprite.setPosition(x, y);
    this.foodSprite.setFrame(randomNumber(0, 3), randomNumber(0, 3));
    this.entityState = PetSpriteState.MOVING;
  }
  private onMoveToMouse(event: MouseEvent): void {
    if (event.button !== 0) return;
    this.onAddFood(event.pageX, event.pageY);
  }
  private onMoveToTouch(event: TouchEvent): void {
    this.onAddFood(event.targetTouches[0].pageX, event.targetTouches[0].pageY);
  }
}
