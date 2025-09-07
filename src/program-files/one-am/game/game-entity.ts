import {
  Direction,
  EntityAnimation,
  EntityDirections,
  EntityId,
  EntityPosition,
  EntityScale,
  EntitySpeed,
  SpriteSheet,
} from '../@type'
import { updateEntitySpriteAnimation } from '../utils/utils-helper'
import { Game } from './game'

export class GameEntity {
  game: Game | undefined
  id: EntityId
  sw: number
  sh: number
  dw: number
  dh: number
  centerX: number
  centerY: number
  position: EntityPosition
  relPosition: EntityPosition
  scale: EntityScale
  speed: EntitySpeed
  animation: EntityAnimation
  directions: EntityDirections

  constructor(
    game: Game,
    id: EntityId,
    sw: number,
    sh: number,
    position: EntityPosition,
    scale: EntityScale,
    speed: number,
    spriteSheet: SpriteSheet,
  ) {
    this.game = game
    this.id = id
    this.sw = sw
    this.sh = sh
    this.dw = game.tileSize * scale.width
    this.dh = game.tileSize * scale.height
    this.centerX = this.dw / 2
    this.centerY = this.dh / 2
    this.position = {
      x: position.x,
      y: position.y,
    }
    this.relPosition = {
      x: Math.round(position.x * game.tileSize),
      y: Math.round(position.y * game.tileSize),
    }
    this.scale = {
      width: scale.width,
      height: scale.height,
    }
    this.speed = speed
    this.animation = {
      spriteSheet: spriteSheet,
      spriteSheetState: spriteSheet.IDLE,
      frameX: 0,
      frameY: 0,
      currentFrameIndex: 0,
      timeSinceLastFrame: 0,
    }
    this.directions = {
      NORTH: false,
      EAST: false,
      SOUTH: false,
      WEST: false,
      lastDirection: Direction.IDLE,
    }
  }

  update(delta: number) {
    updateEntitySpriteAnimation(this, delta)
  }

  updateSpriteSize() {
    if (!this.game) return

    this.dw = this.game.tileSize * this.scale.width
    this.dh = this.game.tileSize * this.scale.height

    this.centerX = this.dw / 2
    this.centerY = this.dh / 2

    this.relPosition = {
      x: Math.round(this.position.x * this.game.tileSize),
      y: Math.round(this.position.y * this.game.tileSize),
    }
  }

  draw() {
    if (!this.game || !this.game.gameContext || !this.game.gameAsset || !this.game.gameCamera)
      return

    this.game.gameContext.drawImage(
      this.game.gameAsset,
      this.animation.frameX * this.game.baseTileSize,
      this.animation.frameY * this.game.baseTileSize,
      this.sw,
      this.sh,
      this.relPosition.x - this.game.gameCamera.position.x - this.centerX,
      this.relPosition.y - this.game.gameCamera.position.y - this.centerY,
      this.dw,
      this.dh,
    )

    if (this.game.debug) {
      this.drawRect()
    }
  }

  destroy() {}

  private drawRect() {
    if (!this.game || !this.game.gameContext || !this.game.gameCamera) return

    this.game.gameContext.strokeStyle = 'red'
    this.game.gameContext.strokeRect(
      this.relPosition.x - this.game.gameCamera.position.x,
      this.relPosition.y - this.game.gameCamera.position.y,
      this.dw,
      this.dh,
    )
  }
}
