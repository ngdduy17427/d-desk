import { Game } from "./game";
import { GameGUI } from "./game_gui";
import { GameLoop } from "./game_loop";

export class GameService {
  game: Game;
  gameGUI: GameGUI;

  private gameLoop: GameLoop;

  constructor() {
    this.game = new Game();
    this.gameGUI = new GameGUI(this.game);
    this.gameLoop = new GameLoop(this.game, this.gameGUI);
  }

  destroy(): void {
    this.gameLoop.cancel();
    this.gameGUI.destroy();
    this.game.destroy();
  }
}
