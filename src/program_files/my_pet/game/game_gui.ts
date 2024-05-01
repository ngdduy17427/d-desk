import { PetSpriteType } from "../sprites/pet_sprite";
import { Game } from "./game";
import { GameEntity } from "./game_entity";

export class GameGUI {
  fps: number;

  private game: Game;
  private petSprite: GameEntity;

  private gameGUI: HTMLCanvasElement | undefined;
  private gameGUIContext: CanvasRenderingContext2D | undefined;

  constructor(game: Game) {
    this.game = game;
  }

  init(gameGUI: HTMLCanvasElement): void {
    this.gameGUI = gameGUI;
    this.gameGUIContext = this.gameGUI.getContext("2d");
  }
  draw(): void {
    this.gameGUI.width = this.gameGUI.offsetWidth;
    this.gameGUI.height = this.gameGUI.offsetHeight;

    this.petSprite = this.game.entityList.get(PetSpriteType);

    this.gameGUIContext.clearRect(0, 0, this.gameGUI.offsetWidth, this.gameGUI.offsetHeight);
    this.gameGUIContext.restore();

    this.gameGUIContext.font = "16px Source Code Pro";
    this.gameGUIContext.fillText(`FPS: ${Math.round(this.fps)}`, 10, 16);
    this.gameGUIContext.fillText(`X: ${this.petSprite.entity.position.x}`, 10, 32);
    this.gameGUIContext.fillText(`Y: ${this.petSprite.entity.position.y}`, 10, 48);

    this.gameGUIContext.save();
  }
  destroy(): void {
    this.gameGUI = undefined;
  }
}
