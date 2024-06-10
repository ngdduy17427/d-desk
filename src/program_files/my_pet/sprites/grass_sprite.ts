import { SpriteId } from "../@type";
import { Game } from "../game/game";
import { MapSpriteType } from "../game/game_map";
import { GameSprite } from "../game/game_sprite";

export class GrassSprite extends GameSprite {
  constructor(game: Game, id: SpriteId, x: number, y: number) {
    super(game, id, MapSpriteType, 32, 32, { x, y }, { width: 1, height: 1 }, 0, {
      IDLE: [[15, 3]],
    });

    this.centerY = this.dh * 0.8;
  }

  updateSpriteSize(): void {
    super.updateSpriteSize();

    this.centerY = this.dh * 0.8;
  }
}
