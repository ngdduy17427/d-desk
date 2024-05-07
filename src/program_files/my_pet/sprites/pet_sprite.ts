import { EntityMap, SpriteSheet, SpriteSheetType, SpriteType } from "../@type";
import { Game } from "../game/game";
import { GameEntity, GameEntityState } from "../game/game_entity";
import { PetAvatars } from "../utils/pet_helper";
import { moveToPoint, playAnimation } from "../utils/utils_helper";

export const PetSpriteType: SpriteType = "PET_SPRITE";

export class PetSprite extends GameEntity {
  petName: string;
  petAvatar: string;

  targetX: number | undefined;
  targetY: number | undefined;

  constructor(id: string, petName: string, petAvatar: string, x: number, y: number) {
    super(
      id,
      PetSpriteType,
      32,
      32,
      64,
      64,
      { x, y },
      <SpriteSheet>PetAvatars.get(petAvatar)?.avatarSheet
    );
    this.petName = petName;
    this.petAvatar = petAvatar;
  }

  init(game: Game): void {
    super.init(game);
    this.initSocket();
  }
  update(delta: number): void {
    this.entityAction(delta);
  }
  draw(): void {
    super.draw();
    this.drawName();
  }

  entityAction(delta: number): void {
    switch (this.entityState) {
      case GameEntityState.IDLE: {
        playAnimation(this, this.entity.avatarSheet?.IDLE, delta);
        break;
      }
      case GameEntityState.MOVING: {
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

  initSocket(): void {
    this.game?.gameSocket?.on(this.entity.id, (entityMap: EntityMap): void => {
      this.targetX = entityMap.x;
      this.targetY = entityMap.y;

      this.entity.frameX = entityMap.frameX;
      this.entity.frameY = entityMap.frameY;

      this.entityAnimationState = entityMap.animationState;
      this.entityState = entityMap.entityState;
    });
  }

  private drawName(): void {
    if (!this.game?.context) return;

    this.game.context.font = `bold 14px Source Code Pro`;
    this.game.context.textAlign = `center`;
    this.game.context.strokeStyle = `#000`;
    this.game.context.strokeText(
      this.petName,
      this.entity.position.x,
      this.entity.position.y + this.entity.dh / 2 + 5
    );
    this.game.context.fillStyle = `#fff`;
    this.game.context.fillText(
      this.petName,
      this.entity.position.x,
      this.entity.position.y + this.entity.dh / 2 + 5
    );
  }
}
