import { clamp } from 'utils/utils-helper'
import { Direction, SpriteSheetState } from '../@type'
import { PlayerEntity } from '../entities/player-entity'
import { GameEntity } from '../game/game-entity'
import { layerWalkable } from './layer-helper'

export const createContext = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  return <CanvasRenderingContext2D>canvas.getContext('2d')
}

export const updateEntitySprite = (entity: PlayerEntity) => {
  if (
    !entity.directions.NORTH &&
    !entity.directions.EAST &&
    !entity.directions.SOUTH &&
    !entity.directions.WEST
  ) {
    if (entity.directions.lastDirection === Direction.NORTH)
      entity.animation.spriteSheetState = <SpriteSheetState>entity.animation.spriteSheet.IDLE_NORTH
    if (entity.directions.lastDirection === Direction.EAST)
      entity.animation.spriteSheetState = <SpriteSheetState>entity.animation.spriteSheet.IDLE_EAST
    if (entity.directions.lastDirection === Direction.SOUTH)
      entity.animation.spriteSheetState = <SpriteSheetState>entity.animation.spriteSheet.IDLE_SOUTH
    if (entity.directions.lastDirection === Direction.WEST)
      entity.animation.spriteSheetState = <SpriteSheetState>entity.animation.spriteSheet.IDLE_WEST
    return
  }

  if (entity.directions.NORTH)
    entity.animation.spriteSheetState = <SpriteSheetState>entity.animation.spriteSheet.NORTH
  if (entity.directions.EAST)
    entity.animation.spriteSheetState = <SpriteSheetState>entity.animation.spriteSheet.EAST
  if (entity.directions.SOUTH)
    entity.animation.spriteSheetState = <SpriteSheetState>entity.animation.spriteSheet.SOUTH
  if (entity.directions.WEST)
    entity.animation.spriteSheetState = <SpriteSheetState>entity.animation.spriteSheet.WEST
}

export const updateEntitySpriteAnimation = (entity: GameEntity, delta: number) => {
  entity.animation.timeSinceLastFrame += delta / 1000
  entity.animation.currentFrameIndex = Math.floor(
    entity.animation.timeSinceLastFrame * entity.animation.spriteSheetState.length,
  )

  if (entity.animation.currentFrameIndex < entity.animation.spriteSheetState.length) {
    entity.animation.currentFrameIndex =
      (entity.animation.currentFrameIndex + 1) % entity.animation.spriteSheetState.length
  } else {
    entity.animation.currentFrameIndex = 0
    entity.animation.timeSinceLastFrame = 0
  }

  entity.animation.frameX = entity.animation.spriteSheetState[entity.animation.currentFrameIndex][0]
  entity.animation.frameY = entity.animation.spriteSheetState[entity.animation.currentFrameIndex][1]
}

export const updateEntityPosition = (entity: PlayerEntity, delta: number) => {
  if (entity.position.x === 0 && entity.position.x === Number(entity.game?.gameMap?.cols)) return
  if (entity.position.y === 0 && entity.position.y === Number(entity.game?.gameMap?.rows)) return

  let distanceToMove = entity.speed * delta
  let newX = entity.position.x
  let newY = entity.position.y

  if (
    (entity.directions.NORTH && entity.directions.EAST) ||
    (entity.directions.NORTH && entity.directions.WEST) ||
    (entity.directions.SOUTH && entity.directions.EAST) ||
    (entity.directions.SOUTH && entity.directions.WEST)
  ) {
    distanceToMove *= 0.7071
  }

  if (entity.directions.NORTH) newY -= isWalkable(newX, newY - distanceToMove) ? distanceToMove : 0
  if (entity.directions.EAST) newX += isWalkable(newX + distanceToMove, newY) ? distanceToMove : 0
  if (entity.directions.SOUTH) newY += isWalkable(newX, newY + distanceToMove) ? distanceToMove : 0
  if (entity.directions.WEST) newX -= isWalkable(newX - distanceToMove, newY) ? distanceToMove : 0

  entity.position.x = newX
  entity.position.y = newY

  entity.relPosition.x = Math.round(entity.position.x * Number(entity.game?.tileSize))
  entity.relPosition.y = Math.round(entity.position.y * Number(entity.game?.tileSize))
}

export const isWalkable = (newX: number, newY: number): boolean => {
  if (!layerWalkable[Math.floor(newY)] || !layerWalkable[Math.floor(newY)][Math.floor(newX)])
    return false

  return layerWalkable[Math.floor(newY)][Math.floor(newX)] === 1
}

export const reorderGameObjectsByY = (gameEntities: Array<GameEntity>): Array<GameEntity> => {
  return gameEntities.sort((sEntity, dEntity) => sEntity.relPosition.y - dEntity.relPosition.y)
}

export const calculateTileSize = (
  currentWidth: number,
  currentHeight: number,
  baseWidth: number,
  baseHeight: number,
  baseTileSize: number,
) => {
  const widthRatio = currentWidth / baseWidth
  const heightRatio = currentHeight / baseHeight

  return clamp(
    baseTileSize * Math.min(widthRatio, heightRatio),
    baseTileSize,
    baseTileSize * Math.min(widthRatio, heightRatio),
  )
}
