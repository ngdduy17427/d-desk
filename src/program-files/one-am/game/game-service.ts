import { IProgramFile } from "program-files";
import { PlayerSettings } from "../@type";
import { Game } from "./game";
import { GameLoop } from "./game-loop";

export class GameService {
  private windowApp: IProgramFile;

  game: Game | undefined;
  gameLoop: GameLoop | undefined;

  constructor(windowApp: IProgramFile) {
    this.windowApp = windowApp;
  }

  async start(gameCanvas: HTMLCanvasElement, playerSettings: PlayerSettings): Promise<void> {
    this.game = new Game(this.windowApp);
    this.gameLoop = new GameLoop();

    return Promise.resolve()
      .then((): void => this.game?.init(gameCanvas, playerSettings))
      .then((): void => this.gameLoop?.start(<Game>this.game));
  }
  async destroy(): Promise<void> {
    return Promise.resolve()
      .then((): void => this.gameLoop?.destroy())
      .then((): void => this.game?.destroy());
  }
}
