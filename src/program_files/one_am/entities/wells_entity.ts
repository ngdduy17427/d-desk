import { EntityId } from "../@type";
import { Game } from "../game/game";
import { GameEntity } from "../game/game_entity";

export class WellsEntity extends GameEntity {
  constructor(game: Game, id: EntityId, x: number, y: number) {
    super(game, id, 64, 64, { x, y }, { width: 2, height: 2 }, 0, {
      IDLE: [[4, 2]],
    });

    this.centerY = this.dh * 0.8;
  }

  updateSpriteSize(): void {
    super.updateSpriteSize();

    this.centerY = this.dh * 0.8;
  }
}
