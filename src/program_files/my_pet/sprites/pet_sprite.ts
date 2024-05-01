import { randomNumber } from "utils/utils_helper";
import { SpriteSheet, SpriteType } from "../@type";
import { GameEntity, GameEntityImageSrc } from "../game/game_entity";
import { isCollision, moveToScreen, playAnimation } from "../utils/utils_helper";
import { FoodSpriteType } from "./food_sprite";

export const PetSpriteType: SpriteType = "PET_SPRITE";

enum EntityState {
  IDLE,
  MOVING,
  HUNTING,
}
interface PetDestinationHitbox {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
interface PetDestination {
  dx: number;
  dy: number;
  hitbox: PetDestinationHitbox;
}

export class PetSprite extends GameEntity {
  idleTime: number = 0;
  idleTimeMin: number = 0;
  idleTimeMax: number = 4;

  entityState: EntityState = EntityState.IDLE;

  destination: PetDestination | undefined;

  constructor(
    sw: number,
    sh: number,
    dw: number,
    dh: number,
    spriteImageSrc: GameEntityImageSrc,
    spriteSheet: SpriteSheet
  ) {
    super(
      PetSpriteType,
      sw,
      sh,
      dw,
      dh,
      160,
      {
        x: document.body.offsetWidth / 2,
        y: document.body.offsetHeight / 2,
      },
      spriteImageSrc,
      spriteSheet
    );
  }

  update(delta: number): void {
    this.entityIdle();
    this.entityChecking();
    this.entityAction(delta);
  }
  draw(context: CanvasRenderingContext2D): void {
    super.draw(context);
  }

  private entityIdle(): void {
    if (this.entityState === EntityState.HUNTING) return;

    if (Math.floor(this.idleTime) === this.idleTimeMin) {
      this.entityState = EntityState.IDLE;
    }
    if (Math.floor(this.idleTime) > 0 && Math.floor(this.idleTime) % this.idleTimeMax === 0) {
      this.entityState = EntityState.MOVING;

      const randomX = randomNumber(0, this.game.canvas.offsetWidth);
      const randomY = randomNumber(0, this.game.canvas.offsetHeight);
      this.destination = {
        dx: randomX,
        dy: randomY,
        hitbox: {
          top: randomY - 5,
          right: randomX + 5,
          bottom: randomY + 5,
          left: randomX - 5,
        },
      };
    }
  }
  private entityChecking(): void {
    const foodSprite = this.game.entityList.get(FoodSpriteType);

    if (!foodSprite) return;

    this.idleTime = 0;
    this.entityState = EntityState.HUNTING;
    this.destination = {
      dx: foodSprite.entity.position.x,
      dy: foodSprite.entity.position.y,
      hitbox: {
        top: foodSprite.entity.position.y - foodSprite.entity.dh / 2,
        right: foodSprite.entity.position.x + foodSprite.entity.dw / 2,
        bottom: foodSprite.entity.position.y + foodSprite.entity.dh / 2,
        left: foodSprite.entity.position.x - foodSprite.entity.dw / 2,
      },
    };
  }
  private entityAction(delta: number): void {
    switch (this.entityState) {
      case EntityState.IDLE: {
        this.idleTime += delta;

        return playAnimation(this, this.entity.avatarSheet.IDLE, delta);
      }
      case EntityState.MOVING: {
        this.idleTime -= delta;

        if (isCollision(this, <GameEntity>{ entity: { hitbox: this.destination.hitbox } })) {
          this.entityState = EntityState.IDLE;
          this.destination = undefined;
          return;
        }

        return moveToScreen(this, this.destination.dx, this.destination.dy, delta);
      }
      case EntityState.HUNTING: {
        if (!this.game.entityList.get(FoodSpriteType)) return;

        if (isCollision(this, <GameEntity>{ entity: { hitbox: this.destination.hitbox } })) {
          this.game.entityList.delete(FoodSpriteType);
          this.entityState = EntityState.IDLE;
          this.destination = undefined;
          return;
        }

        return moveToScreen(this, this.destination.dx, this.destination.dy, delta);
      }
      default:
        break;
    }
  }
}
