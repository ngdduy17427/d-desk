import { createCanvas } from "../utils/utils_helper";
import { GameEntity } from "./game_entity";

export class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  entityList: Map<string, GameEntity> = new Map();

  constructor() {
    this.canvas = createCanvas();
    this.context = this.canvas.getContext("2d");
  }

  update(delta: number): void {
    this.entityList.forEach((entity): void => entity.update(delta));
  }
  draw(): void {
    this.context.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);

    this.context.restore();
    this.entityList.forEach((entity): void => entity.draw(this.context));
    this.context.save();
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
