import { Direction, EntityId, PlayerSettings } from "../@type";
import { Game } from "../game/game";
import { PlayerEntity } from "./player_entity";

export class MyPlayerEntity extends PlayerEntity {
  isChatting: boolean = false;

  constructor(game: Game, id: EntityId, playerSettings: PlayerSettings, x: number, y: number) {
    super(game, id, playerSettings.playerName, x, y);

    addEventListener("keydown", (event: KeyboardEvent) => this.playerMoving(event));
    addEventListener("keyup", (event: KeyboardEvent) => this.playerStopMoving(event));
  }

  destroy(): void {
    removeEventListener("keydown", (event: KeyboardEvent) => this.playerMoving(event));
    removeEventListener("keyup", (event: KeyboardEvent) => this.playerStopMoving(event));
  }

  setIsChatting(isChatting: boolean): void {
    this.isChatting = isChatting;
  }

  private playerMoving(event: KeyboardEvent): void {
    if (!this.game?.windowApp.windowState?.isFocus || this.isChatting) return;

    if (event.code === "KeyW" || event.code === "ArrowUp") this.directions.NORTH = true;
    if (event.code === "KeyD" || event.code === "ArrowRight") this.directions.EAST = true;
    if (event.code === "KeyS" || event.code === "ArrowDown") this.directions.SOUTH = true;
    if (event.code === "KeyA" || event.code === "ArrowLeft") this.directions.WEST = true;
  }
  private playerStopMoving(event: KeyboardEvent): void {
    if (!this.game?.windowApp.windowState?.isFocus || this.isChatting) return;

    if (event.code === "KeyW" || event.code === "ArrowUp") {
      this.directions.NORTH = false;
      this.directions.lastDirection = Direction.NORTH;
    }
    if (event.code === "KeyD" || event.code === "ArrowRight") {
      this.directions.EAST = false;
      this.directions.lastDirection = Direction.EAST;
    }
    if (event.code === "KeyS" || event.code === "ArrowDown") {
      this.directions.SOUTH = false;
      this.directions.lastDirection = Direction.SOUTH;
    }
    if (event.code === "KeyA" || event.code === "ArrowLeft") {
      this.directions.WEST = false;
      this.directions.lastDirection = Direction.WEST;
    }
  }
}
