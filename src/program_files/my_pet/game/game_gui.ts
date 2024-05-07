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
    this.gameGUIContext = <CanvasRenderingContext2D>this.gameGUI?.getContext("2d");
  }
  draw(): void {
    if (!this.gameGUI || !this.gameGUIContext) return;

    this.gameGUI.width = this.gameGUI.offsetWidth;
    this.gameGUI.height = this.gameGUI.offsetHeight;

    this.gameGUIContext.clearRect(0, 0, this.gameGUI.width, this.gameGUI.height);
    this.gameGUIContext.shadowColor = "#000";
    this.gameGUIContext.shadowOffsetX = 1;
    this.gameGUIContext.shadowOffsetY = 1;
    this.gameGUIContext.font = `bold 16px Source Code Pro`;
    this.gameGUIContext.fillStyle = "#fff";

    this.drawAvatarBox();
    this.drawAvatar();
    this.drawText(`Name: ${this.game.player?.petName}`, this.avatarBox.width + 10, 16);
    this.drawText(`FPS: ${Math.round(this.fps)}`, this.avatarBox.width + 10, 32);
    this.drawText(`X: ${this.game.player?.entity.position.x}`, this.avatarBox.width + 10, 48);
    this.drawText(`Y: ${this.game.player?.entity.position.y}`, this.avatarBox.width + 10, 64);
  }
  destroy(): void {
    this.gameGUI = undefined;
  }

  private drawAvatarBox(): void {
    if (!this.gameGUIContext) return;

    this.gameGUIContext.strokeRect(0, 0, this.avatarBox.width, this.avatarBox.height);
  }
  private drawAvatar(): void {
    if (!this.gameGUIContext) return;

    this.gameGUIContext.drawImage(
      <HTMLImageElement>this.game.gameAsset?.get(String(this.game.player?.entity.type)),
      Number(this.game.player?.entity.frameX) * Number(this.game.player?.entity.sw),
      Number(this.game.player?.entity.frameY) * Number(this.game.player?.entity.sh),
      Number(this.game.player?.entity.sw),
      Number(this.game.player?.entity.sh),
      0,
      0,
      this.avatarBox.width,
      this.avatarBox.height
    );
  }
  private drawText(text: string, x: number, y: number): void {
    if (!this.gameGUIContext) return;

    this.gameGUIContext.strokeStyle = "#000";
    this.gameGUIContext.strokeText(text, x, y);
    this.gameGUIContext.fillText(text, x, y);
  }
}
