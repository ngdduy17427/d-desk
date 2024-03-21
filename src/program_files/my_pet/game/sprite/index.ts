import { moveToScreen, playAnimation } from "../utils/GameUtils";
import { Entity, SpriteSheet } from "../utils/Interface";

const idleStateList = [
  "IDLE",
  "NORTH",
  "EAST",
  "SOUTH",
  "WEST",
  "NORTH_EAST",
  "NORTH_WEST",
  "SOUTH_EAST",
  "SOUTH_WEST",
];

export class MySprite {
  entity: Entity;

  idleTime = 0;
  idleState = "IDLE";

  isAlert = false;
  isActive = false;

  mousePosX = 0;
  mousePosY = 0;

  constructor(
    entity: HTMLDivElement,
    width: number,
    height: number,
    speed: number,
    avatar: string,
    spriteSheet: SpriteSheet
  ) {
    this.entity = {
      id: entity,
      width: width,
      height: height,
      speed: speed | 160,
      position: {
        x: 0,
        y: 0,
      },
      avatar: avatar,
      spriteSheet: spriteSheet,
      currentFrameIndex: 0,
      timeSinceLastFrame: 0,
    };
  }

  spriteActive(delta: number) {
    if (!this.isActive) return;

    moveToScreen(this.entity, this.mousePosX, this.mousePosY, delta);
  }

  spriteIdle(delta: number) {
    if (this.isActive) return;

    if (this.isAlert) {
      if (this.entity.spriteSheet.ALERT)
        playAnimation(this.entity, this.entity.spriteSheet.ALERT, delta);

      setTimeout(() => {
        this.isAlert = false;
        this.isActive = true;
      }, 500);
    } else {
      this.idleTime += delta;

      if (Math.floor(this.idleTime) > 0 && Math.floor(this.idleTime) % 2 === 0) {
        this.idleTime = 0;
        this.idleState = idleStateList[Math.floor(Math.random() * idleStateList.length)];
      }

      switch (this.idleState) {
        case "IDLE":
          moveToScreen(
            this.entity,
            window.innerWidth / 2 - this.entity.width / 2,
            window.innerHeight / 2 - this.entity.height / 2,
            delta
          );
          break;
        case "NORTH":
          moveToScreen(this.entity, this.entity.position.x, this.entity.position.y - 1, delta);
          break;
        case "EAST":
          moveToScreen(this.entity, this.entity.position.x + 1, this.entity.position.y, delta);
          break;
        case "SOUTH":
          moveToScreen(this.entity, this.entity.position.x, this.entity.position.y + 1, delta);
          break;
        case "WEST":
          moveToScreen(this.entity, this.entity.position.x - 1, this.entity.position.y, delta);
          break;
        case "NORTH_EAST":
          moveToScreen(this.entity, this.entity.position.x - 1, this.entity.position.y + 1, delta);
          break;
        case "NORTH_WEST":
          moveToScreen(this.entity, this.entity.position.x - 1, this.entity.position.y - 1, delta);
          break;
        case "SOUTH_EAST":
          moveToScreen(this.entity, this.entity.position.x + 1, this.entity.position.y + 1, delta);
          break;
        case "SOUTH_WEST":
          moveToScreen(this.entity, this.entity.position.x + 1, this.entity.position.y - 1, delta);
          break;
        default:
          playAnimation(this.entity, this.entity.spriteSheet.IDLE, delta);
          break;
      }
    }
  }

  update(delta: number, _: number, __: number) {
    this.spriteIdle(delta);
    this.spriteActive(delta);
  }

  init() {
    this.entity.id.style.zIndex = 2147483647;
    this.entity.id.style.imageRendering = "pixelated";
    this.entity.id.style.position = "fixed";
    this.entity.id.style.top = `${this.entity.position.y}px`;
    this.entity.id.style.left = `${this.entity.position.x}px`;
    this.entity.id.style.width = `${this.entity.width}px`;
    this.entity.id.style.height = `${this.entity.height}px`;
    this.entity.id.style.backgroundImage = `url(${this.entity.avatar})`;
    this.entity.id.style.transform = `scale(2)`;

    this.entity.id.onclick = () => {
      this.isAlert = true;
    };

    document.addEventListener("mousemove", (event) => {
      this.mousePosX = event.clientX;
      this.mousePosY = event.clientY;
    });
  }
}
