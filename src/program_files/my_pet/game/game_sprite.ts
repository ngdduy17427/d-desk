import {
  SpriteAnimation,
  SpriteAssetImage,
  SpriteId,
  SpritePosition,
  SpriteScale,
  SpriteSheet,
  SpriteType,
} from "../@type";
import { updateSpriteAnimation } from "../utils/utils_helper";
import { Game } from "./game";

export class GameSprite {
  game: Game | undefined;

  id: SpriteId;
  type: SpriteType;
  assetImage: SpriteAssetImage | undefined;

  sw: number;
  sh: number;

  dw: number;
  dh: number;

  centerX: number;
  centerY: number;

  position: SpritePosition;
  relPosition: SpritePosition;

  scale: SpriteScale;

  speed: number;

  animation: SpriteAnimation;

  constructor(
    game: Game,
    id: SpriteId,
    type: SpriteType,
    sw: number,
    sh: number,
    position: SpritePosition,
    scale: SpriteScale,
    speed: number,
    spriteSheet: SpriteSheet
  ) {
    this.game = game;

    this.id = id;
    this.type = type;

    this.assetImage = <HTMLImageElement>game.gameAsset.assets.get(type);

    this.sw = sw;
    this.sh = sh;

    this.dw = Number(game.gameMap?.tileSize) * scale.width;
    this.dh = Number(game.gameMap?.tileSize) * scale.height;

    this.centerX = this.dw / 2;
    this.centerY = this.dh / 2;

    this.position = {
      x: position.x,
      y: position.y,
    };
    this.relPosition = {
      x: position.x * Number(game.gameMap?.tileSize),
      y: position.y * Number(game.gameMap?.tileSize),
    };

    this.scale = {
      width: scale.width,
      height: scale.height,
    };

    this.speed = speed;

    this.animation = {
      spriteSheet: spriteSheet,
      spriteSheetState: spriteSheet.IDLE,
      frameX: 0,
      frameY: 0,
      currentFrameIndex: 0,
      timeSinceLastFrame: 0,
    };
  }

  update(delta: number): void {
    updateSpriteAnimation(this, this.animation.spriteSheetState, delta);
  }
  updateSpriteSize(): void {
    if (!this.game || !this.game.gameMap) return;

    this.dw = this.game.gameMap.tileSize * this.scale.width;
    this.dh = this.game.gameMap.tileSize * this.scale.height;

    this.centerX = this.dw / 2;
    this.centerY = this.dh / 2;

    this.relPosition = {
      x: this.position.x * this.game.gameMap.tileSize,
      y: this.position.y * this.game.gameMap.tileSize,
    };
  }
  draw(): void {
    if (!this.game) return;

    this.drawSprite();
    this.game.debug && this.drawRect();
  }
  destroy(): void {}

  private drawSprite(): void {
    if (!this.game || !this.game.gameContext || !this.assetImage || !this.game.gameCamera) return;

    this.game.gameContext.drawImage(
      this.assetImage,

      this.animation.frameX * this.sw,
      this.animation.frameY * this.sh,

      this.sw,
      this.sh,

      this.relPosition.x - this.game.gameCamera.position.x - this.centerX,
      this.relPosition.y - this.game.gameCamera.position.y - this.centerY,

      this.dw,
      this.dh
    );
  }
  private drawRect(): void {
    if (!this.game || !this.game.gameContext || !this.game.gameCamera) return;

    this.game.gameContext.strokeStyle = `red`;
    this.game.gameContext.strokeRect(
      this.relPosition.x - this.game.gameCamera.position.x,
      this.relPosition.y - this.game.gameCamera.position.y,
      this.dw,
      this.dh
    );
  }
}
