import { Game } from "./game";

export class GameLoop {
  private game: Game | undefined;

  private handle: number | undefined;
  private last: number = Math.round(performance.now());
  private lastFps: number = Math.round(performance.now());
  private frames: number = 0;

  fps: number = 0;

  constructor(game: Game) {
    this.game = game;
  }

  start(): void {
    this.handle = requestAnimationFrame(() => this.onFrame());
  }
  destroy(): void {
    cancelAnimationFrame(Number(this.handle));
  }

  private step(now: number): void {
    if (!this.game) return this.destroy();

    this.frames++;

    if (now - this.lastFps > 1000) {
      this.fps = (this.frames * 1000) / (now - this.lastFps);
      this.frames = 0;
      this.lastFps = now;
    }

    try {
      this.game.update(now - this.last);
      this.game.draw();
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
