import { Game } from "./game";

export class GameLoop {
  private handle: number | undefined;
  private last: number = Math.round(performance.now());
  private lastFps: number = Math.round(performance.now());
  private frames: number = 0;

  fps: number = 0;

  start(game: Game): void {
    this.handle = requestAnimationFrame(() => this.onFrame(game));
  }
  destroy(): void {
    cancelAnimationFrame(Number(this.handle));
  }

  private onFrame(game: Game): void {
    try {
      this.step(game, Math.round(performance.now()));
    } catch (error: any) {
      console.error(error);
    }
  }
  private step(game: Game, now: number): void {
    this.frames++;

    if (now - this.lastFps > 1000) {
      this.fps = (this.frames * 1000) / (now - this.lastFps);
      this.frames = 0;
      this.lastFps = now;
    }

    try {
      game.update(now - this.last);
      game.draw();
    } catch (error: any) {
      console.error(error);
    }

    this.last = now;
    this.handle = requestAnimationFrame(() => this.onFrame(game));
  }
}
