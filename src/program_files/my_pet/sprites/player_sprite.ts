import { PetSettings, SpriteId } from "../@type";
import { Game } from "../game/game";
import { PetSprite } from "./pet_sprite";

export class PlayerSprite extends PetSprite {
  constructor(game: Game, id: SpriteId, petSettings: PetSettings, x: number, y: number) {
    super(game, id, petSettings.petName, petSettings.petSelectOption.value, x, y);

    addEventListener("keydown", (event: KeyboardEvent) => this.playerMoving(event));
    addEventListener("keyup", (event: KeyboardEvent) => this.playerStopMoving(event));
  }

  destroy(): void {
    removeEventListener("keydown", (event: KeyboardEvent) => this.playerMoving(event));
    removeEventListener("keyup", (event: KeyboardEvent) => this.playerStopMoving(event));
  }

  private playerMoving(event: KeyboardEvent): void {
    if (!this.game?.windowApp.windowState?.isFocus) return;

    if (event.code === "KeyW" || event.code === "ArrowUp") this.spriteDirections.NORTH = true;
    if (event.code === "KeyD" || event.code === "ArrowRight") this.spriteDirections.EAST = true;
    if (event.code === "KeyS" || event.code === "ArrowDown") this.spriteDirections.SOUTH = true;
    if (event.code === "KeyA" || event.code === "ArrowLeft") this.spriteDirections.WEST = true;
  }
  private playerStopMoving(event: KeyboardEvent): void {
    if (!this.game?.windowApp.windowState?.isFocus) return;

    if (event.code === "KeyW" || event.code === "ArrowUp") this.spriteDirections.NORTH = false;
    if (event.code === "KeyD" || event.code === "ArrowRight") this.spriteDirections.EAST = false;
    if (event.code === "KeyS" || event.code === "ArrowDown") this.spriteDirections.SOUTH = false;
    if (event.code === "KeyA" || event.code === "ArrowLeft") this.spriteDirections.WEST = false;
  }
}
