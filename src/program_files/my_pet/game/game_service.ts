import { getMyPetServer } from "actions";
import { PetSettings } from "../@type";
import { Game } from "./game";
import { GameAsset } from "./game_asset";
import { GameGUI } from "./game_gui";
import { GameLoop } from "./game_loop";
import { GameSocket } from "./game_socket";

export class GameService {
  private gameAsset: GameAsset;
  private gameSocket: GameSocket;

  game: Game;

  private gameGUI: GameGUI;
  private gameLoop: GameLoop;

  constructor() {
    this.gameAsset = new GameAsset();
    this.gameSocket = new GameSocket();

    this.game = new Game(this.gameAsset, this.gameSocket);
    this.gameGUI = new GameGUI(this.game);
    this.gameLoop = new GameLoop(this.game, this.gameGUI);
  }

  async startOnline(petSettings: PetSettings, gameGUIRef: HTMLCanvasElement): Promise<void> {
    return getMyPetServer()
      .then((response): void => this.game.load(response.entityMap))
      .then((): Promise<void> => this.gameAsset.init())
      .then((): void => this.gameSocket.init())
      .then((): void => this.game.init(petSettings))
      .then((): void => this.gameGUI.init(gameGUIRef))
      .then((): void => this.gameLoop.start());
  }
  async startOffline(petSettings: PetSettings, gameGUIRef: HTMLCanvasElement): Promise<void> {
    return Promise.resolve()
      .then((): Promise<void> => this.gameAsset.init())
      .then((): void => this.game.init(petSettings))
      .then((): void => this.gameGUI.init(gameGUIRef))
      .then((): void => this.gameLoop.start());
  }
  destroy(): void {
    this.gameLoop.destroy();
    this.gameGUI.destroy();
    this.game.destroy();
    this.gameAsset.destroy();
    this.gameSocket.destroy();
  }

  getGameSocket(): GameSocket {
    return this.gameSocket;
  }
}
