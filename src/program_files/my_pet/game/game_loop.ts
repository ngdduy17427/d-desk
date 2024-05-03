import { Game } from "./game";
import { GameGUI } from "./game_gui";

export class GameLoop {
  private game: Game;
  private gameGUI: GameGUI;

  private handle: number | undefined;

  private last: number = Math.round(performance.now());
  private lastFps: number = Math.round(performance.now());
  private frames: number = 0;
  private fps: number = 0;

  constructor(game: Game, gameGUI: GameGUI) {
    this.game = game;
    this.gameGUI = gameGUI;
  }

  start(): void {
    this.handle = requestAnimationFrame(() => this.onFrame());
  }
  destroy(): void {
    cancelAnimationFrame(Number(this.handle));
  }

  private step(now: number): void {
    this.frames++;

    if (now - this.lastFps > 1000) {
      this.fps = (this.frames * 1000) / (now - this.lastFps);
      this.frames = 0;
      this.lastFps = now;
    }

    try {
      this.game.update((now - this.last) / 1000);
      this.game.draw();

      this.gameGUI.fps = this.fps;
      this.gameGUI.draw();
    } catch (error: any) {
      console.error(error);
    }

    this.handle = requestAnimationFrame(() => this.onFrame());
    this.last = now;
  }
  private onFrame(): void {
    this.step(Math.round(performance.now()));
  }
}
