import { SpriteId } from "../@type";
import { Game } from "../game/game";
import { MapSpriteType } from "../game/game_map";
import { GameSprite } from "../game/game_sprite";

export class OldTreeSprite extends GameSprite {
  constructor(game: Game, id: SpriteId, x: number, y: number) {
    super(game, id, MapSpriteType, 96, 128, { x, y }, { width: 3, height: 4 }, 0, {
      IDLE: [[3.6333, 0]],
    });

    this.centerY = this.dh * 0.8;
  }

  updateSpriteSize(): void {
    super.updateSpriteSize();

    this.centerY = this.dh * 0.8;
  }
}
