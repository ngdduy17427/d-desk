import { IProgramFile } from "program_files";
import { PetSettings } from "../@type";
import { Game } from "./game";
import { GameAsset } from "./game_asset";
import { GameLoop } from "./game_loop";
import { GameSocket } from "./game_socket";

export class GameService {
  private gameAsset: GameAsset;
  private gameSocket: GameSocket;
  private gameLoop: GameLoop;

  game: Game;

  constructor(windowApp: IProgramFile) {
    this.gameAsset = new GameAsset();
    this.gameSocket = new GameSocket();

    this.game = new Game(windowApp, this.gameAsset, this.gameSocket);
    this.gameLoop = new GameLoop(this.game);
  }

  async startOnline(gameCanvas: HTMLCanvasElement, petSettings: PetSettings): Promise<void> {
    return Promise.resolve()
      .then((): Promise<Array<void>> => this.gameAsset.init())
      .then((): void => this.gameSocket.init())
      .then((): void => this.game.load())
      .then((): Promise<void> => this.start(gameCanvas, petSettings));
  }
  async startOffline(gameCanvas: HTMLCanvasElement, petSettings: PetSettings): Promise<void> {
    return Promise.resolve()
      .then((): Promise<Array<void>> => this.gameAsset.init())
      .then((): Promise<void> => this.start(gameCanvas, petSettings));
  }

  destroy(): void {
    this.gameLoop.destroy();
    this.game.destroy();
    this.gameSocket.destroy();
  }

  private async start(gameCanvas: HTMLCanvasElement, petSettings: PetSettings): Promise<void> {
    return Promise.resolve()
      .then((): void => this.game.init(gameCanvas, petSettings))
      .then((): void => this.gameLoop.start());
  }
}
