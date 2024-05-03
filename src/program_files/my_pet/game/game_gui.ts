import { Game } from "./game";

export class GameGUI {
  fps: number = 0;

  private game: Game;
  private gameGUI: HTMLCanvasElement | undefined;
  private gameGUIContext: CanvasRenderingContext2D | undefined;

  private avatarBox = {
    width: 64,
    height: 64,
  };

  constructor(game: Game) {
    this.game = game;
  }

  init(gameGUI: HTMLCanvasElement): void {
    this.gameGUI = gameGUI;
    this.gameGUIContext = <CanvasRenderingContext2D>this.gameGUI.getContext("2d");
  }
  draw(): void {
    if (!this.gameGUI || !this.gameGUIContext) return;

    this.gameGUI.width = this.gameGUI.offsetWidth;
    this.gameGUI.height = this.gameGUI.offsetHeight;

    this.gameGUIContext.clearRect(0, 0, this.gameGUI.width, this.gameGUI.height);

    this.drawAvatar();

    this.gameGUIContext.font = "16px Source Code Pro";
    this.drawInfo();
    this.drawStats();
  }
  destroy(): void {
    this.gameGUI = undefined;
  }

  private drawAvatar(): void {
    this.gameGUIContext?.strokeRect(0, 0, this.avatarBox.width, this.avatarBox.height);
    this.gameGUIContext?.drawImage(
      <CanvasImageSource>this.game.player?.entity.avatar,
      Number(this.game.player?.entity.frameX),
      Number(this.game.player?.entity.frameY),
      Number(this.game.player?.entity.sw),
      Number(this.game.player?.entity.sh),
      0,
      0,
      this.avatarBox.width,
      this.avatarBox.height
    );
  }
  private drawInfo(): void {
    this.gameGUIContext?.fillText(
      `Name: ${this.game.player?.petName}`,
      this.avatarBox.width + 5,
      16
    );
  }
  private drawStats(): void {
    this.gameGUIContext?.fillText(`FPS: ${Math.round(this.fps)}`, this.avatarBox.width + 5, 32);
    this.gameGUIContext?.fillText(
      `X: ${this.game.player?.entity.position.x}`,
      this.avatarBox.width + 5,
      48
    );
    this.gameGUIContext?.fillText(
      `Y: ${this.game.player?.entity.position.y}`,
      this.avatarBox.width + 5,
      64
    );
  }
}
