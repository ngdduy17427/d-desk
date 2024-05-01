import { clamp } from "utils/utils_helper";
import { AnimationState } from "../@type";
import { GameEntity } from "../game/game_entity";

export function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");

  canvas.width = document.body.offsetWidth;
  canvas.height = document.body.offsetHeight;

  canvas.style.position = `fixed`;
  canvas.style.inset = `${0}px`;
  canvas.style.pointerEvents = `none`;

  document.body.appendChild(canvas);

  addEventListener("resize", (): void => {
    canvas.width = document.body.offsetWidth;
    canvas.height = document.body.offsetHeight;
  });

  return canvas;
}

export function playAnimation(gEntity: GameEntity, spriteSheet: number[][], delta: number): void {
  gEntity.entity.timeSinceLastFrame += delta;
  gEntity.entity.currentFrameIndex = Math.floor(
    gEntity.entity.timeSinceLastFrame * spriteSheet.length
  );

  if (gEntity.entity.currentFrameIndex < spriteSheet.length) {
    gEntity.entity.currentFrameIndex = (gEntity.entity.currentFrameIndex + 1) % spriteSheet.length;
  } else {
    gEntity.entity.currentFrameIndex = 0;
    gEntity.entity.timeSinceLastFrame = 0;
  }

  gEntity.entity.frameX = spriteSheet[gEntity.entity.currentFrameIndex][0] * gEntity.entity.sw;
  gEntity.entity.frameY = spriteSheet[gEntity.entity.currentFrameIndex][1] * gEntity.entity.sh;
}

export function calcAngleDegrees(x: number, y: number): number {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

export function entityDirection(x: number, y: number): string {
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

export function moveToScreen(gEntity: GameEntity, dx: number, dy: number, delta: number): void {
  const diffX = dx - gEntity.entity.position.x;
  const diffY = dy - gEntity.entity.position.y;
  const distance = Math.hypot(diffX, diffY);

  gEntity.entity.position.x += (diffX / distance) * gEntity.entity.speed * delta;
  gEntity.entity.position.y += (diffY / distance) * gEntity.entity.speed * delta;

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

  playAnimation(gEntity, gEntity.entity.avatarSheet[entityDirection(diffX, diffY)], delta);
}

export function isCollision(sEntity: GameEntity, dEntity: GameEntity): boolean {
  return !(
    sEntity.entity.hitbox.top > dEntity.entity.hitbox.bottom ||
    sEntity.entity.hitbox.right < dEntity.entity.hitbox.left ||
    sEntity.entity.hitbox.bottom < dEntity.entity.hitbox.top ||
    sEntity.entity.hitbox.left > dEntity.entity.hitbox.right
  );
}
