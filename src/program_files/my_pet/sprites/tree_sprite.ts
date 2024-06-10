import { SpriteId } from "../@type";
import { Game } from "../game/game";
import { MapSpriteType } from "../game/game_map";
import { GameSprite } from "../game/game_sprite";

export class TreeSprite extends GameSprite {
  constructor(game: Game, id: SpriteId, x: number, y: number) {
    super(game, id, MapSpriteType, 32, 64, { x, y }, { width: 1, height: 2 }, 0, {
      IDLE: [[14, 0]],
    });

    this.centerY = this.dh * 0.9;
  }

  updateSpriteSize(): void {
    super.updateSpriteSize();

    this.centerY = this.dh * 0.9;
  }
}
