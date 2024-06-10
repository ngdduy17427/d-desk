import { SpriteId } from "../@type";
import { Game } from "../game/game";
import { MapSpriteType } from "../game/game_map";
import { GameSprite } from "../game/game_sprite";

export class WellsSprite extends GameSprite {
  constructor(game: Game, id: SpriteId, x: number, y: number) {
    super(game, id, MapSpriteType, 64, 64, { x, y }, { width: 2, height: 2 }, 0, {
      IDLE: [[4, 2]],
    });

    this.centerY = this.dh * 0.8;
  }

  updateSpriteSize(): void {
    super.updateSpriteSize();

    this.centerY = this.dh * 0.8;
  }
}
