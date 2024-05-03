import { repeat } from "utils/utils_helper";
import { EntityMap, SpriteType } from "../@type";
import { Game } from "../game/game";
import { GameEntity } from "../game/game_entity";
import { isCollision, moveToPoint, playAnimation } from "../utils/utils_helper";

export const PetSpriteType: SpriteType = "PET_SPRITE";

export enum PetSpriteState {
  IDLE,
  MOVING,
}

export class PetSprite extends GameEntity {
  petName: string;
  entityState: PetSpriteState = PetSpriteState.IDLE;

  private dx: number | undefined;
  private dy: number | undefined;

  constructor(id: string, petName: string, x: number, y: number) {
    super(
      id,
      PetSpriteType,
      32,
      32,
      64,
      64,
      160,
      { x, y },
      `${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/cat.png`,
      {
        IDLE: [...repeat(2, [5, 4], [4, 4], [5, 4], [6, 4])],
        NORTH: [...repeat(2, [5, 1], [4, 1], [5, 1], [6, 1])],
        EAST: [...repeat(2, [5, 0], [4, 0], [5, 0], [6, 0])],
        SOUTH: [...repeat(2, [5, 2], [4, 2], [5, 2], [6, 2])],
        WEST: [...repeat(2, [5, 3], [4, 3], [5, 3], [6, 3])],
      }
    );
    this.petName = petName;
  }

  init(game: Game): void {
    super.init(game);

    this.game?.socket?.on(this.entity.id, (entityMap: EntityMap): void => {
      this.entityState = PetSpriteState.MOVING;
      this.dx = entityMap.x;
      this.dy = entityMap.y;
    });
  }
  update(delta: number) {
    this.entityAction(delta);
  }
  draw(): void {
    super.draw();
    this.drawName();
  }

  entityAction(delta: number): void {
    switch (this.entityState) {
      case PetSpriteState.IDLE: {
        return playAnimation(this, this.entity.avatarSheet.IDLE, delta);
      }
      case PetSpriteState.MOVING: {
        if (
          isCollision(this.entity.hitbox, {
            top: Number(this.dy),
            right: Number(this.dx),
            bottom: Number(this.dy),
            left: Number(this.dx),
          })
        ) {
          this.entityState = PetSpriteState.IDLE;
          return;
        }
        return moveToPoint(this, Number(this.dx), Number(this.dy), delta);
      }
      default:
        break;
    }
  }
  private drawName(): void {
    if (!this.game) return;

    this.game.context.font = "bold 12px Source Code Pro";
    this.game.context.textAlign = "center";
    this.game.context.strokeStyle = "#000";
    this.game.context.strokeText(
      this.petName,
      this.entity.position.x,
      this.entity.position.y + this.entity.dh / 2 + 5
    );
    this.game.context.fillStyle = "#fff";
    this.game.context.fillText(
      this.petName,
      this.entity.position.x,
      this.entity.position.y + this.entity.dh / 2 + 5
    );
  }
}
