import { Socket, io } from "socket.io-client";
import { PlayerSprite } from "../sprites/player_sprite";
import { Game } from "./game";
import { GameGUI } from "./game_gui";
import { GameLoop } from "./game_loop";

export class GameService {
  game: Game;
  private isServerAlive: boolean = true;
  private gameGUI: GameGUI;
  private gameLoop: GameLoop;
  private socket: Socket | undefined;

  constructor(isServerAlive: boolean) {
    this.isServerAlive = isServerAlive;

    this.socket = this.isServerAlive
      ? io(String(process.env.NEXT_PUBLIC_SERVER_SOCKET_URL), {
          upgrade: false,
          transports: ["websocket"],
          reconnection: false,
        })
      : undefined;

    this.game = new Game(<Socket>this.socket);
    this.gameGUI = new GameGUI(this.game);
    this.gameLoop = new GameLoop(this.game, this.gameGUI);
  }

  async start(player: PlayerSprite, gameGUIRef: HTMLCanvasElement): Promise<void> {
    if (this.isServerAlive) {
      return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/getMyPetServer`, {
        method: "GET",
        cache: "no-cache",
      })
        .then((response): Promise<any> => response.json())
        .then((response): void => this.game.load(response.entityMap))
        .then((): void => this.game.init(player))
        .then((): void => this.gameGUI.init(gameGUIRef))
        .then((): void => this.gameLoop.start());
    }

    return await Promise.resolve()
      .then((): void => this.game.init(player))
      .then((): void => this.gameGUI.init(gameGUIRef))
      .then((): void => this.gameLoop.start());
  }
  destroy(): void {
    this.gameLoop.destroy();
    this.gameGUI.destroy();
    this.game.destroy();
    this.socket?.disconnect();
  }
}
