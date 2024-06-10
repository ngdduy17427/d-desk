import { SpriteId, SpriteScale } from "../@type";
import { Game } from "../game/game";
import { MapSpriteType } from "../game/game_map";
import { GameSprite } from "../game/game_sprite";

export class MoonSprite extends GameSprite {
  constructor(game: Game, id: SpriteId, x: number, y: number, scale: SpriteScale) {
    super(game, id, MapSpriteType, 96, 96, { x, y }, scale, 0, {
      IDLE: [[0, 0]],
    });
  }

  draw(): void {
    if (!this.game || !this.game.gameContext || !this.assetImage || !this.game.gameCamera) return;

    this.game.gameContext.drawImage(
      this.assetImage,
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
