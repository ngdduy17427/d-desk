import { randomNumber } from "utils/utils_helper";
import { PetSettings, SpriteSheetType } from "../@type";
import { Game } from "../game/game";
import { GameEntityHitbox, GameEntityState } from "../game/game_entity";
import { isCollision, moveToPoint, playAnimation } from "../utils/utils_helper";
import { FoodSprite } from "./food_sprite";
import { PetSprite } from "./pet_sprite";

export class PlayerSprite extends PetSprite {
  private foodSprite: FoodSprite | undefined = new FoodSprite(-100, -100);

  constructor(id: string, petSettings: PetSettings, x: number, y: number) {
    super(id, petSettings.petName, petSettings.petAvatar.value, x, y);
    addEventListener("mousedown", (event: MouseEvent): void => this.onMoveToMouse(event));
    addEventListener("touchstart", (event: TouchEvent): void => this.onMoveToTouch(event));
  }

  init(game: Game): void {
    this.game = game;

    this.initSocket();
    this.initFoodSprite(game);
  }
  update(delta: number): void {
    this.entityAction(delta);
  }
  draw(): void {
    this.drawFoodSprite();
    super.draw();
  }

  initSocket(): void {
    this.game?.gameSocket?.emit("playerJoin", {
      id: this.entity.id,
      petName: this.petName,
      petAvatar: this.petAvatar,
      x: this.entity.position.x,
      y: this.entity.position.y,
      frameX: this.entity.frameX,
      frameY: this.entity.frameY,
      animationState: this.entityAnimationState,
      entityState: this.entityState,
    });
  }
  entityAction(delta: number): void {
    switch (this.entityState) {
      case GameEntityState.IDLE: {
        playAnimation(this, this.entity.avatarSheet.IDLE, delta);
        break;
      }
      case GameEntityState.MOVING: {
        if (isCollision(this.entity.hitbox, <GameEntityHitbox>this.foodSprite?.entity.hitbox)) {
          this.foodSprite?.setPosition(-100, -100);
        }

        this.game?.gameSocket?.emit("playerUpdate", {
          id: this.entity.id,
          petName: this.petName,
          petAvatar: this.petAvatar,
          x: this.entity.position.x,
          y: this.entity.position.y,
          frameX: this.entity.frameX,
          frameY: this.entity.frameY,
          animationState: this.entityAnimationState,
          entityState: this.entityState,
        });

        moveToPoint(this, Number(this.targetX), Number(this.targetY), delta);
        playAnimation(
          this,
          <SpriteSheetType>this.entity.avatarSheet[this.entityAnimationState],
          delta
        );
        break;
      }
      default:
        break;
    }
  }

  private onMoveToMouse(event: MouseEvent): void {
    if (event.button !== 0) return;
    this.onAddFood(event.pageX, event.pageY);
  }
  private onMoveToTouch(event: TouchEvent): void {
    this.onAddFood(event.targetTouches[0].pageX, event.targetTouches[0].pageY);
  }
  private onAddFood(x: number, y: number): void {
    if (this.entity.position.x === x && this.entity.position.y === y) return;

    this.targetX = x;
    this.targetY = y;

    this.foodSprite?.setPosition(this.targetX, this.targetY);
    this.foodSprite?.setFrame(randomNumber(0, 3), randomNumber(0, 3));
    this.entityState = GameEntityState.MOVING;
  }
  private initFoodSprite(game: Game): void {
    this.foodSprite?.init(game);
  }
  private drawFoodSprite(): void {
    if (this.foodSprite?.entity.position.x !== -100 && this.foodSprite?.entity.position.y !== -100)
      this.foodSprite?.draw();
  }
}
