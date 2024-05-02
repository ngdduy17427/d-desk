import { createCanvas } from "../utils/utils_helper";
import { GameEntity } from "./game_entity";

export class Game {
  canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;
  private contextImageData: ImageData;

  entityList: Map<string, GameEntity> = new Map();

  constructor() {
    this.canvas = createCanvas();
    this.context = this.canvas.getContext("2d", { willReadFrequently: true });
  }

  update(delta: number): void {
    this.entityList.forEach((entity): void => entity.update(delta));
  }
  draw(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.shadowColor = "#000";
    this.context.shadowBlur = 1;
    this.entityList.forEach((entity): void => entity.draw(this.context));

    this.contextImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.putImageData(this.contextImageData, 0, 0);
  }
  destroy(): void {
    if (document.body.contains(this.canvas)) {
      document.body.removeChild(this.canvas);
    }
  }

  addEntity(gameEntity: GameEntity): void {
    gameEntity.init(this);
    this.entityList.set(gameEntity.entity.type, gameEntity);
  }
}
