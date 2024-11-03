import { EntityId } from "../@type";
import { Game } from "../game/game";
import { GameEntity } from "../game/game-entity";

export class TreeEntity extends GameEntity {
  constructor(game: Game, id: EntityId, x: number, y: number) {
    super(game, id, 32, 64, { x, y }, { width: 1, height: 2 }, 0, {
      IDLE: [[14, 0]],
    });

    this.centerY = this.dh * 0.9;
  }

  updateSpriteSize(): void {
    super.updateSpriteSize();

    this.centerY = this.dh * 0.9;
  }
}
