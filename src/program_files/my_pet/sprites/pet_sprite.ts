import {
  PlayerMessage,
  SpriteAvatar,
  SpriteDirection,
  SpriteId,
  SpriteName,
  SpriteSheet,
  SpriteType,
} from "../@type";
import { Game } from "../game/game";
import { GameSprite } from "../game/game_sprite";
import { PetSelectOptions } from "../utils/pet_helper";
import { updateSpriteAnimation, updateSpriteDirection } from "../utils/utils_helper";

export const PetSpriteType: SpriteType = "PET_SPRITE";

export class PetSprite extends GameSprite {
  spriteName: SpriteName | undefined;

  private playerMessage: string | undefined;
  private playerMessageTimeout: NodeJS.Timeout | undefined;

  spriteDirections: SpriteDirection = {
    NORTH: false,
    EAST: false,
    SOUTH: false,
    WEST: false,
  };

  constructor(
    game: Game,
    id: SpriteId,
    spriteName: SpriteName,
    spriteAvatar: SpriteAvatar,
    x: number,
    y: number
  ) {
    super(
      game,
      id,
      PetSpriteType,
      32,
      32,
      { x, y },
      { width: 2, height: 2 },
      0.01,
      <SpriteSheet>PetSelectOptions.get(spriteAvatar)?.spriteSheet
    );

    this.centerY = this.dh * 0.75;

    this.spriteName = spriteName;
  }

  update(delta: number): void {
    updateSpriteDirection(this, delta);
    updateSpriteAnimation(this, this.animation.spriteSheetState, delta);
  }
  updateSpriteSize(): void {
    super.updateSpriteSize();

    this.centerY = this.dh * 0.75;
  }
  draw(): void {
    super.draw();
    this.drawName();
    this.drawPlayerMessage();
  }

  setPlayerDirection(direction: SpriteDirection): void {
    this.spriteDirections = direction;
  }
  setPlayerMessage(playerMessage: PlayerMessage): void {
    if (!this.game || !this.game.gameContext) return;

    clearTimeout(this.playerMessageTimeout);
    this.playerMessage = playerMessage.message;
    this.playerMessageTimeout = setTimeout((): void => {
      clearTimeout(this.playerMessageTimeout);
      this.playerMessage = undefined;
    }, 5000);
  }

  private drawName(): void {
    if (!this.game || !this.game.gameContext) return;

    this.drawText(
      String(this.spriteName),
      this.relPosition.x - this.game.gameContext.measureText(String(this.spriteName)).width / 2,
      this.relPosition.y + this.dh - this.centerY
    );
  }
  private drawPlayerMessage(): void {
    if (!this.game || !this.game?.gameContext || !this.playerMessage) return;

    this.drawText(
      this.playerMessage,
      this.relPosition.x - this.game.gameContext.measureText(this.playerMessage).width / 2,
      this.relPosition.y - this.centerY
    );
  }
  private drawText(text: string, x: number, y: number): void {
    if (!this.game || !this.game.gameContext || !this.game.gameCamera) return;

    this.game.gameContext.fillStyle = `#fff`;
    this.game.gameContext.fillText(
      text,
      x - this.game.gameCamera.position.x,
      y - this.game.gameCamera.position.y
    );
    this.game.gameContext.strokeStyle = `#000`;
    this.game.gameContext.strokeText(
      text,
      x - this.game.gameCamera.position.x,
      y - this.game.gameCamera.position.y
    );
  }
}
