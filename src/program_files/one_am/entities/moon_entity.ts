import { EntityId, EntityScale } from "../@type";
import { Game } from "../game/game";
import { GameEntity } from "../game/game_entity";

export class MoonEntity extends GameEntity {
  constructor(game: Game, id: EntityId, x: number, y: number, scale: EntityScale) {
    super(game, id, 96, 96, { x, y }, scale, 0, {
      IDLE: [[0, 0]],
    });
  }

  draw(): void {
    if (!this.game || !this.game.gameContext || !this.game.gameAsset || !this.game.gameCamera)
      return;

    this.game.gameContext.drawImage(
      this.game.gameAsset,
      this.animation.frameX * this.sw,
      this.animation.frameY * this.sh,
      this.sw,
      this.sh,
      this.relPosition.x - this.centerX,
      this.relPosition.y - this.centerY,
      this.dw,
      this.dh
    );
  }
}
