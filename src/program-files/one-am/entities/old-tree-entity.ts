import { EntityId } from "../@type";
import { Game } from "../game/game";
import { GameEntity } from "../game/game-entity";

export class OldTreeEntity extends GameEntity {
  constructor(game: Game, id: EntityId, x: number, y: number) {
    super(game, id, 96, 128, { x, y }, { width: 3, height: 4 }, 0, {
      IDLE: [[11, 0]],
    });

    this.centerY = this.dh * 0.85;
  }

  updateSpriteSize(): void {
    super.updateSpriteSize();

    this.centerY = this.dh * 0.85;
  }
}
