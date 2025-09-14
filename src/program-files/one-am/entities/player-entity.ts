import { repeat } from 'utils/utils-helper'
import { Direction, EntityDirections, EntityId, PlayerName } from '../@type'
import { Game } from '../game/game'
import { GameEntity } from '../game/game-entity'
import { updateEntitySprite, updateEntitySpriteAnimation } from '../utils/utils-helper'

export class PlayerEntity extends GameEntity {
  private playerMessage: string | undefined
  private playerMessageWidth: number | undefined
  private playerMessageTimeout: NodeJS.Timeout | undefined

  name: PlayerName | undefined
  nameWidth: number | undefined

  constructor(game: Game, id: EntityId, name: PlayerName, x: number, y: number) {
    super(game, id, 32, 64, { x, y }, { width: 1.5, height: 3 }, 0.01, {
      IDLE: [...repeat(2, [16, 0], [17, 0])],
      IDLE_NORTH: [...repeat(2, [16, 2], [17, 2])],
      IDLE_EAST: [...repeat(2, [16, 6], [17, 6])],
      IDLE_SOUTH: [...repeat(2, [16, 0], [17, 0])],
      IDLE_WEST: [...repeat(2, [16, 4], [17, 4])],
      NORTH: [...repeat(2, [16, 2], [18, 2], [16, 2], [19, 2])],
      EAST: [...repeat(2, [16, 6], [18, 6], [16, 6], [19, 6])],
      SOUTH: [...repeat(2, [16, 0], [18, 0], [16, 0], [19, 0])],
      WEST: [...repeat(2, [16, 4], [18, 4], [16, 4], [19, 4])],
    })

    this.centerY = this.dh * 0.75

    this.name = name
    this.nameWidth = game.gameContext?.measureText(name).width
  }

  protected applyNetSnapshot(s: {
    x: number
    y: number
    vx?: number
    vy?: number
    lastDir?: Direction | null
  }) {
    this.position.x = s.x
    this.position.y = s.y
    this.relPosition.x = Math.round(this.position.x * Number(this.game?.tileSize))
    this.relPosition.y = Math.round(this.position.y * Number(this.game?.tileSize))

    const eps = 1e-5
    const vx = s.vx ?? 0
    const vy = s.vy ?? 0
    this.directions.NORTH = Math.abs(vy) > eps && vy < 0
    this.directions.SOUTH = Math.abs(vy) > eps && vy > 0
    this.directions.EAST = Math.abs(vx) > eps && vx > 0
    this.directions.WEST = Math.abs(vx) > eps && vx < 0
    if (s.lastDir) this.directions.lastDirection = s.lastDir
  }

  update(delta: number) {
    if (this.game?.gameNetState) {
      const playerSnapshot = this.game.gameNetState.sample(this.id)
      if (playerSnapshot) this.applyNetSnapshot(playerSnapshot)
    }

    updateEntitySprite(this)
    updateEntitySpriteAnimation(this, delta)
  }

  updateSpriteSize() {
    super.updateSpriteSize()
    this.centerY = this.dh * 0.75
  }

  draw() {
    super.draw()
    this.drawName()
    this.drawPlayerMessage()
  }

  setPlayerDirection(direction: EntityDirections) {
    this.directions = direction
  }

  setPlayerMessage(message: string) {
    if (!this.game || !this.game.gameContext) return

    clearTimeout(this.playerMessageTimeout)
    this.playerMessage = message
    this.playerMessageWidth = Number(this.game.gameContext.measureText(message).width)

    this.playerMessageTimeout = setTimeout(() => {
      if (!this.game || !this.game.gameContext) return

      clearTimeout(this.playerMessageTimeout)
      this.playerMessage = undefined
      this.playerMessageWidth = 0
    }, 5000)
  }

  private drawName() {
    if (!this.game || !this.game.gameContext || !this.game.gameCamera) return

    const nameWidth = Number(this.nameWidth) || 0

    this.game.gameContext.fillStyle = '#fff'
    this.game.gameContext.fillText(
      String(this.name),
      this.relPosition.x - this.game.gameCamera.position.x - nameWidth / 2,
      this.relPosition.y - this.game.gameCamera.position.y + 20,
    )
    this.game.gameContext.strokeStyle = 'rgba(0, 0, 0, 0.8)'
    this.game.gameContext.strokeText(
      String(this.name),
      this.relPosition.x - this.game.gameCamera.position.x - nameWidth / 2,
      this.relPosition.y - this.game.gameCamera.position.y + 20,
    )
  }

  private drawPlayerMessage() {
    if (!this.playerMessage || !this.game || !this.game.gameContext || !this.game.gameCamera) return

    this.drawBubble(
      this.relPosition.x - this.game.gameCamera.position.x - Number(this.playerMessageWidth) / 2,
      this.relPosition.y - this.game.gameCamera.position.y - this.centerY,
      Number(this.playerMessageWidth),
      30,
      10,
    )

    this.game.gameContext.fillStyle = '#fff'
    this.game.gameContext.fillText(
      String(this.playerMessage),
      this.relPosition.x - this.game.gameCamera.position.x - Number(this.playerMessageWidth) / 2,
      this.relPosition.y - this.game.gameCamera.position.y - this.centerY + 20,
    )
  }

  private drawBubble(x: number, y: number, width: number, height: number, radius: number) {
    if (!this.game || !this.game.gameContext) return

    this.game.gameContext.beginPath()
    this.game.gameContext.moveTo(x + radius, y)
    this.game.gameContext.arcTo(x + width + 10, y, x + width + 10, y + height, radius)
    this.game.gameContext.arcTo(x + width + 10, y + height, x + 10, y + height, radius)
    this.game.gameContext.arcTo(x - 10, y + height, x - 10, y, radius)
    this.game.gameContext.arcTo(x - 10, y, x + width - 10, y, radius)
    this.game.gameContext.closePath()
    this.game.gameContext.fillStyle = 'rgba(0, 0, 0, 0.3)'
    this.game.gameContext.fill()
  }
}
