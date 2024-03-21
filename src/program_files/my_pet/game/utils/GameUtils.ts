import { Entity } from "./Interface";

export function repeat<T>(count: number, ...values: T[]): T[] {
  const result: T[] = [];

  for (let i = 0; i < count; i++) result.push(...values);

  return result;
}

export function clamp(value: number, min: number, max: number) {
  return value > min ? (value < max ? value : max) : min;
}

export function calcAngleDegrees(x: number, y: number) {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

export function playAnimation(entity: Entity, spriteSheet: number[][], delta: number) {
  entity.timeSinceLastFrame += delta;
  entity.currentFrameIndex = Math.floor(entity.timeSinceLastFrame * spriteSheet.length);

  if (entity.currentFrameIndex < spriteSheet.length) {
    entity.currentFrameIndex = (entity.currentFrameIndex + 1) % spriteSheet.length;
  } else {
    entity.currentFrameIndex = 0;
    entity.timeSinceLastFrame = 0;
  }

  entity.id.style.backgroundPosition = `
    ${spriteSheet[entity.currentFrameIndex][0] * entity.width}px
    ${spriteSheet[entity.currentFrameIndex][1] * entity.height}px
  `;
}

export function entityDirection(x: number, y: number) {
  if (calcAngleDegrees(x, y) >= -45 && calcAngleDegrees(x, y) < 45) {
    return "EAST";
  } else if (calcAngleDegrees(x, y) >= 45 && calcAngleDegrees(x, y) < 135) {
    return "SOUTH";
  } else if (calcAngleDegrees(x, y) >= 135 || calcAngleDegrees(x, y) < -135) {
    return "WEST";
  } else {
    return "NORTH";
  }
}

export function moveToScreen(entity: any, screenX: number, screenY: number, delta: number) {
  const diffX = screenX - entity.position.x;
  const diffY = screenY - entity.position.y;
  const distance = Math.hypot(diffX, diffY);

  entity.position.x += (diffX / distance) * entity.speed * delta;
  entity.position.y += (diffY / distance) * entity.speed * delta;

  entity.position.x = clamp(entity.position.x, 0, window.innerWidth - entity.width);
  entity.position.y = clamp(entity.position.y, 0, window.innerHeight - entity.height);

  entity.id.style.left = `${entity.position.x}px`;
  entity.id.style.top = `${entity.position.y}px`;

  playAnimation(entity, entity.spriteSheet[entityDirection(diffX, diffY)], delta);
}
