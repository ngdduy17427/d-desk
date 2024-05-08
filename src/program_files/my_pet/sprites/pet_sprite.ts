import { EntityMap, PlayerMessage, SpriteSheet, SpriteSheetType, SpriteType } from "../@type";
import { Game } from "../game/game";
import { GameEntity, GameEntityState } from "../game/game_entity";
import { PetAvatars } from "../utils/pet_helper";
import { moveToPoint, playAnimation } from "../utils/utils_helper";

export const PetSpriteType: SpriteType = "PET_SPRITE";

export class PetSprite extends GameEntity {
  petName: string | undefined;
  petAvatar: string | undefined;

  targetX: number | undefined;
  targetY: number | undefined;

  playerMessage: string | undefined;

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

    if (!this.game?.context) return;

    this.game.context.textAlign = `center`;

    this.drawPetName();
    this.drawPlayerMessage();
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
    this.game?.gameSocket?.on(
      `playerMessage:${this.entity.id}`,
      (playerMessage: PlayerMessage): void => this.setPlayerMessage(playerMessage)
    );
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
  setPlayerMessage(playerMessage: PlayerMessage): void {
    this.playerMessage = playerMessage.message;
    setTimeout((): void => (this.playerMessage = undefined), 5000);
  }

  private drawPetName(): void {
    if (!this.game?.context || !this.petName) return;

    this.game.context.strokeStyle = `#000`;
    this.game.context.strokeText(
      this.petName,
      this.entity.position.x,
      this.entity.position.y + this.entity.dh / 2 + 5
    );
    this.game.context.fillText(
      this.petName,
      this.entity.position.x,
      this.entity.position.y + this.entity.dh / 2 + 5
    );
  }
  private drawPlayerMessage(): void {
    if (!this.game?.context || !this.playerMessage) return;

    this.game.context.stroke();
    this.game.context.fillText(
      this.playerMessage,
      this.entity.position.x,
      this.entity.position.y - this.entity.dh / 2 + 5
    );
  }
}
