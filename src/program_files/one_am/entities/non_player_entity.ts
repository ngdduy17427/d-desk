import { EntityId, PlayerSettings } from "../@type";
import { Game } from "../game/game";
import { PlayerEntity } from "./player_entity";

export class NonPlayerEntity extends PlayerEntity {
  private messages: Array<string> = [
    "Hello, my name is Duy.",
    "Welcome to my 1AM small game.",
    "Use WASD or Joystick to move around.",
  ];
  private messageIndex: number = 0;

  constructor(game: Game, id: EntityId, playerSettings: PlayerSettings, x: number, y: number) {
    super(game, id, playerSettings.playerName, x, y);

    this.setPlayerMessage(this.messages[this.messageIndex]);

    setInterval(() => {
      this.messageIndex += 1;
      if (this.messageIndex > this.messages.length) this.messageIndex = 0;

      this.setPlayerMessage(this.messages[this.messageIndex]);
    }, 5000);
  }
}
