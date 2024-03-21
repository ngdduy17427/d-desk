import { MyGame } from "..";
import { MySprite } from "../sprite";
import { GameLoop, startGameLoop } from "../utils/GameLoop";
import { SpriteSheet } from "../utils/Interface";

export class GameService {
  private gameLoop?: GameLoop;
  private myGame: MyGame;

  constructor() {
    this.myGame = new MyGame();
  }

  handleGameError(error: Error) {
    console.log(error);
  }

  join(
    id: HTMLDivElement,
    width: number,
    height: number,
    speed: number,
    avatar: string,
    spriteSheet: SpriteSheet
  ) {
    const entity = new MySprite(id, width, height, speed, avatar, spriteSheet);

    this.myGame.startup(entity);

    this.gameLoop = startGameLoop(this.myGame, (e) => this.handleGameError(e));
    this.gameLoop.started.then();
  }
}
