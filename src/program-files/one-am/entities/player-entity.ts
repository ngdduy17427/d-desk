import { repeat } from "utils/utils-helper";
import { EntityDirections, EntityId, PlayerName } from "../@type";
import { Game } from "../game/game";
import { GameEntity } from "../game/game-entity";
import {
  updateEntityPosition,
  updateEntitySprite,
  updateEntitySpriteAnimation,
} from "../utils/utils-helper";

export class PlayerEntity extends GameEntity {
  private playerMessage: string | undefined;
  private playerMessageWidth: number | undefined;
  private playerMessageTimeout: NodeJS.Timeout | undefined;

  playerName: PlayerName | undefined;
  playerNameWidth: number | undefined;

  constructor(game: Game, id: EntityId, playerName: PlayerName, x: number, y: number) {
    super(game, id, 32, 64, { x, y }, { width: 1.5, height: 3 }, 0.01, {
      IDLE: [...repeat(2, [16, 0], [17, 0])],
      IDLE_NORTH: [...repeat(2, [16, 2], [17, 2])],
      IDLE_EAST: [...repeat(2, [16, 6], [17, 6])],
      IDLE_SOUTH: [...repeat(2, [16, 0], [17, 0])],
      IDLE_WEST: [...repeat(2, [16, 4], [17, 4])],
      NORTH: [...repeat(2, [16, 2], [18, 2], [16, 2], [19, 2])],
      EAST: [...repeat(2, [16, 6], [18, 6], [16, 6], [19, 6])],
      SOUTH: [...repeat(2, [16, 0], [18, 0], [16, 0], [19, 0])],
      WEST: [...repeat(2, [16, 4], [18, 4], [16, 4], [19, 4])],
    });

    this.centerY = this.dh * 0.75;

    this.playerName = playerName;
    this.playerNameWidth = game.gameContext?.measureText(playerName).width;
  }

  update(delta: number): void {
    updateEntitySprite(this);
    updateEntitySpriteAnimation(this, delta);
    updateEntityPosition(this, delta);
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

  setPlayerDirection(direction: EntityDirections): void {
    this.directions = direction;
  }
  setPlayerMessage(message: string): void {
    if (!this.game || !this.game.gameContext) return;

    clearTimeout(this.playerMessageTimeout);
    this.playerMessage = message;
    this.playerMessageWidth = Number(this.game.gameContext.measureText(message).width);

    this.playerMessageTimeout = setTimeout((): void => {
      if (!this.game || !this.game.gameContext) return;

      clearTimeout(this.playerMessageTimeout);
      this.playerMessage = undefined;
      this.playerMessageWidth = 0;
    }, 5000);
  }

  private drawName(): void {
    if (!this.game || !this.game.gameContext || !this.game.gameCamera) return;

    this.game.gameContext.fillStyle = `#fff`;
    this.game.gameContext.fillText(
      String(this.playerName),
      this.relPosition.x - this.game.gameCamera.position.x - Number(this.playerNameWidth) / 2,
      this.relPosition.y - this.game.gameCamera.position.y + 20
    );
    this.game.gameContext.strokeStyle = `rgba(0, 0, 0, 0.8)`;
    this.game.gameContext.strokeText(
      String(this.playerName),
      this.relPosition.x - this.game.gameCamera.position.x - Number(this.playerNameWidth) / 2,
      this.relPosition.y - this.game.gameCamera.position.y + 20
    );
  }
  private drawPlayerMessage(): void {
    if (!this.playerMessage || !this.game || !this.game.gameContext || !this.game.gameCamera)
      return;

    this.drawBubble(
      this.relPosition.x - this.game.gameCamera.position.x - Number(this.playerMessageWidth) / 2,
      this.relPosition.y - this.game.gameCamera.position.y - this.centerY,
      Number(this.playerMessageWidth),
      30,
      10
    );

    this.game.gameContext.fillStyle = `#fff`;
    this.game.gameContext.fillText(
      String(this.playerMessage),
      this.relPosition.x - this.game.gameCamera.position.x - Number(this.playerMessageWidth) / 2,
      this.relPosition.y - this.game.gameCamera.position.y - this.centerY + 20
    );
  }
  private drawBubble(x: number, y: number, width: number, height: number, radius: number) {
    if (!this.game || !this.game.gameContext) return;

    this.game.gameContext.beginPath();
    this.game.gameContext.moveTo(x + radius, y);
    this.game.gameContext.arcTo(x + width + 10, y, x + width + 10, y + height, radius);
    this.game.gameContext.arcTo(x + width + 10, y + height, x + 10, y + height, radius);
    this.game.gameContext.arcTo(x - 10, y + height, x - 10, y, radius);
    this.game.gameContext.arcTo(x - 10, y, x + width - 10, y, radius);
    this.game.gameContext.closePath();
    this.game.gameContext.fillStyle = `rgba(0, 0, 0, 0.3)`;
    this.game.gameContext.fill();
  }
}
