import { clamp } from "utils/utils_helper";
import { AnimationState } from "../@type";
import { GameEntity, GameEntityHitbox, GameEntityState } from "../game/game_entity";
import { PetSprite } from "../sprites/pet_sprite";

export function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");

  canvas.width = document.body.offsetWidth;
  canvas.height = document.body.offsetHeight;

  canvas.style.position = `fixed`;
  canvas.style.inset = `${0}px`;
  canvas.style.imageRendering = `pixelated`;
  canvas.style.pointerEvents = `none`;
  canvas.style.userSelect = `none`;

  addEventListener("resize", (): void => {
    canvas.width = document.body.offsetWidth;
    canvas.height = document.body.offsetHeight;
  });

  document.body.appendChild(canvas);

  return canvas;
}

export function createContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  return <CanvasRenderingContext2D>canvas.getContext("2d", { willReadFrequently: true });
}

export function playAnimation(
  gEntity: GameEntity,
  spriteSheet: Array<Array<number>>,
  delta: number
): void {
  gEntity.entity.timeSinceLastFrame += delta / 1000;
  gEntity.entity.currentFrameIndex = Math.floor(
    gEntity.entity.timeSinceLastFrame * spriteSheet?.length
  );

  if (gEntity.entity.currentFrameIndex < spriteSheet?.length) {
    gEntity.entity.currentFrameIndex = (gEntity.entity.currentFrameIndex + 1) % spriteSheet?.length;
  } else {
    gEntity.entity.currentFrameIndex = 0;
    gEntity.entity.timeSinceLastFrame = 0;
  }

  gEntity.entity.frameX = spriteSheet?.[gEntity.entity.currentFrameIndex][0];
  gEntity.entity.frameY = spriteSheet?.[gEntity.entity.currentFrameIndex][1];
}

export function moveToPoint(gEntity: PetSprite, dx: number, dy: number, delta: number): void {
  const diffX = dx - gEntity.entity.position.x;
  const diffY = dy - gEntity.entity.position.y;

  const distance = Math.sqrt(diffX * diffX + diffY * diffY);
  const distanceToMove = gEntity.entity.speed * delta;

  if (distance > distanceToMove) {
    gEntity.entity.position.x += (diffX / distance) * distanceToMove;
    gEntity.entity.position.y += (diffY / distance) * distanceToMove;
  } else {
    gEntity.entity.position.x = dx;
    gEntity.entity.position.y = dy;
    gEntity.entityState = GameEntityState.IDLE;
  }

  gEntity.entity.hitbox.top = gEntity.entity.position.y - gEntity.entity.dh / 2;
  gEntity.entity.hitbox.right = gEntity.entity.position.x + gEntity.entity.dw / 2;
  gEntity.entity.hitbox.bottom = gEntity.entity.position.y + gEntity.entity.dh / 2;
  gEntity.entity.hitbox.left = gEntity.entity.position.x - gEntity.entity.dw / 2;

  gEntity.entity.position.x = clamp(
    gEntity.entity.position.x,
    0 + gEntity.entity.dw / 2,
    window.innerWidth - gEntity.entity.dw / 2
  );
  gEntity.entity.position.y = clamp(
    gEntity.entity.position.y,
    0 + gEntity.entity.dh / 2,
    window.innerHeight - gEntity.entity.dh / 2
  );

  gEntity.entityAnimationState = entityDirection(diffX, diffY);
}

export function entityDirection(x: number, y: number): AnimationState {
  if (calcAngleDegrees(x, y) >= -45 && calcAngleDegrees(x, y) < 45) {
    return AnimationState.EAST;
  } else if (calcAngleDegrees(x, y) >= 45 && calcAngleDegrees(x, y) < 135) {
    return AnimationState.SOUTH;
  } else if (calcAngleDegrees(x, y) >= 135 || calcAngleDegrees(x, y) < -135) {
    return AnimationState.WEST;
  } else {
    return AnimationState.NORTH;
  }
}

export function calcAngleDegrees(x: number, y: number): number {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

export function isCollision(sHitbox: GameEntityHitbox, dHitbox: GameEntityHitbox): boolean {
  return !(
    sHitbox?.top > dHitbox?.bottom ||
    sHitbox?.right < dHitbox?.left ||
    sHitbox?.bottom < dHitbox?.top ||
    sHitbox?.left > dHitbox?.right
  );
}
