import { clamp } from "utils/utils_helper";
import { Game } from "./game";

export class GameCamera {
  private game: Game;

  width: number = 0;
  height: number = 0;

  position = {
    x: 0,
    y: 0,
  };

  centerX: number = 0;
  centerY: number = 0;

  maxX: number = 0;
  maxY: number = 0;

  constructor(game: Game) {
    this.game = game;

    this.updateCameraSize();
  }

  update(): void {
    if (!this.game.player || !this.game.gameMap) return;

    this.position.x = this.game.player.relPosition.x - this.centerX;
    this.position.y = this.game.player.relPosition.y - this.centerY;

    this.position.x = clamp(this.position.x, 0, this.maxX);
    this.position.y = clamp(this.position.y, 0, this.maxY);
  }
  updateCameraSize(): void {
    if (!this.game.gameCanvas || !this.game.gameMap) return;

    this.width = this.game.gameCanvas.width;
    this.height = this.game.gameCanvas.height;

    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.maxX = this.game.gameMap.cols * this.game.gameMap.tileSize - this.width;
    this.maxY = this.game.gameMap.rows * this.game.gameMap.tileSize - this.height;
  }
  destroy(): void {}
}
