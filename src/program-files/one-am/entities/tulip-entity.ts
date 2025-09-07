import { EntityId } from '../@type'
import { Game } from '../game/game'
import { GameEntity } from '../game/game-entity'

export class TulipEntity extends GameEntity {
  constructor(game: Game, id: EntityId, x: number, y: number) {
    super(game, id, 32, 32, { x, y }, { width: 1, height: 1 }, 0, {
      IDLE: [[15, 4]],
    })

    this.centerY = this.dh * 0.8
  }

  updateSpriteSize() {
    super.updateSpriteSize()

    this.centerY = this.dh * 0.8
  }
}
