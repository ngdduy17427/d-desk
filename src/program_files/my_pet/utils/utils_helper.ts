import { clamp } from "utils/utils_helper";
import { SpriteSheetState } from "../@type";
import { GameSprite } from "../game/game_sprite";
import { PetSprite } from "../sprites/pet_sprite";
import { layerWalkable } from "./layer_helper";

export function createContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  return <CanvasRenderingContext2D>canvas.getContext("2d");
}

export function updateSpriteAnimation(
  sprite: GameSprite,
  spriteSheetState: SpriteSheetState,
  delta: number
): void {
  sprite.animation.timeSinceLastFrame += delta / 1000;

  sprite.animation.currentFrameIndex = Math.floor(
    sprite.animation.timeSinceLastFrame * spriteSheetState.length
  );

  if (sprite.animation.currentFrameIndex < spriteSheetState.length) {
    sprite.animation.currentFrameIndex =
      (sprite.animation.currentFrameIndex + 1) % spriteSheetState.length;
  } else {
    sprite.animation.currentFrameIndex = 0;
    sprite.animation.timeSinceLastFrame = 0;
  }

  sprite.animation.frameX = spriteSheetState[sprite.animation.currentFrameIndex][0];
  sprite.animation.frameY = spriteSheetState[sprite.animation.currentFrameIndex][1];
}

export function updateSpriteDirection(sprite: PetSprite, delta: number): void {
  if (
    !sprite.spriteDirections.NORTH &&
    !sprite.spriteDirections.EAST &&
    !sprite.spriteDirections.SOUTH &&
    !sprite.spriteDirections.WEST
  ) {
    sprite.animation.spriteSheetState = <SpriteSheetState>sprite.animation.spriteSheet.IDLE;
    return;
  }

  if (sprite.spriteDirections.NORTH)
    sprite.animation.spriteSheetState = <SpriteSheetState>sprite.animation.spriteSheet.NORTH;
  if (sprite.spriteDirections.EAST)
    sprite.animation.spriteSheetState = <SpriteSheetState>sprite.animation.spriteSheet.EAST;
  if (sprite.spriteDirections.SOUTH)
    sprite.animation.spriteSheetState = <SpriteSheetState>sprite.animation.spriteSheet.SOUTH;
  if (sprite.spriteDirections.WEST)
    sprite.animation.spriteSheetState = <SpriteSheetState>sprite.animation.spriteSheet.WEST;

  if (sprite.position.x === 0 && sprite.position.x === Number(sprite.game?.gameMap?.cols)) return;
  if (sprite.position.y === 0 && sprite.position.y === Number(sprite.game?.gameMap?.rows)) return;

  let distanceToMove = sprite.speed * delta;
  let newX = sprite.position.x;
  let newY = sprite.position.y;

  if (
    (sprite.spriteDirections.NORTH && sprite.spriteDirections.EAST) ||
    (sprite.spriteDirections.NORTH && sprite.spriteDirections.WEST) ||
    (sprite.spriteDirections.SOUTH && sprite.spriteDirections.EAST) ||
    (sprite.spriteDirections.SOUTH && sprite.spriteDirections.WEST)
  ) {
    distanceToMove *= 0.7071;
  }

  if (sprite.spriteDirections.NORTH)
    newY -= isWalkable(newX, newY - distanceToMove) ? distanceToMove : 0;
  if (sprite.spriteDirections.EAST)
    newX += isWalkable(newX + distanceToMove, newY) ? distanceToMove : 0;
  if (sprite.spriteDirections.SOUTH)
    newY += isWalkable(newX, newY + distanceToMove) ? distanceToMove : 0;
  if (sprite.spriteDirections.WEST)
    newX -= isWalkable(newX - distanceToMove, newY) ? distanceToMove : 0;

  sprite.position.x = newX;
  sprite.position.y = newY;

  sprite.relPosition.x = sprite.position.x * Number(sprite.game?.gameMap?.tileSize);
  sprite.relPosition.y = sprite.position.y * Number(sprite.game?.gameMap?.tileSize);
}

export function isWalkable(newX: number, newY: number): boolean {
  if (!layerWalkable[Math.floor(newY)] || !layerWalkable[Math.floor(newY)][Math.floor(newX)])
    return false;

  return layerWalkable[Math.floor(newY)][Math.floor(newX)] === 1;
}

export function reorderGameObjectsByY(gameObjects: Array<GameSprite>): Array<GameSprite> {
  return gameObjects.sort((sSprite, dSprite) => sSprite.relPosition.y - dSprite.relPosition.y);
}

export function calculateTileSize(
  currentWidth: number,
  currentHeight: number,
  baseWidth: number,
  baseHeight: number,
  baseTileSize: number
) {
  const widthRatio = currentWidth / baseWidth;
  const heightRatio = currentHeight / baseHeight;

  return clamp(
    baseTileSize * Math.min(widthRatio, heightRatio),
    baseTileSize,
    baseTileSize * Math.min(widthRatio, heightRatio)
  );
}
