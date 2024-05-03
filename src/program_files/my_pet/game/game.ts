import { Socket } from "socket.io-client";
import { EntityMap } from "../@type";
import { PetSprite } from "../sprites/pet_sprite";
import { PlayerSprite } from "../sprites/player_sprite";
import { createCanvas } from "../utils/utils_helper";

export class Game {
  socket: Socket | undefined;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  player: PlayerSprite | undefined;
  entityList: Map<string, PetSprite> = new Map();

  constructor(socket: Socket) {
    this.socket = socket;
    this.canvas = createCanvas();
    this.context = <CanvasRenderingContext2D>(
      this.canvas.getContext("2d", { willReadFrequently: true })
    );
  }

  load(entityMap: Array<EntityMap>): void {
    entityMap.forEach((entity): void => {
      const petEntity = new PetSprite(entity.id, entity.petName, entity.x, entity.y);
      this.entityList.set(entity.id, petEntity);
    });
  }
  init(player: PlayerSprite): void {
    this.entityList.forEach((entity): void => entity.init(this));
    this.player = player;
    this.player?.init(this);

    this.socket?.on("playerJoin", (player): void => {
      const petEntity = new PetSprite(player.id, player.petName, player.x, player.y);
      petEntity.init(this);

      this.entityList.set(player.id, petEntity);
    });
    this.socket?.on("playerDisconnect", (playerId): void => {
      this.entityList.delete(playerId);
    });
  }
  update(delta: number): void {
    this.entityList.forEach((entity): void => entity.update(delta));
    this.player?.update(delta);
  }
  draw(): void {
    this.context.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);

    this.context.shadowColor = "#000";
    this.context.shadowBlur = 1;

    this.drawEntity();
  }
  destroy(): void {
    if (!document.body.contains(this.canvas)) return;

    this.socket?.emit("playerDisconnect", this.player?.entity.id);

    document.body.removeChild(this.canvas);
  }

  private drawEntity(): void {
    this.entityList.forEach((entity): void => entity.draw());
    this.player?.draw();
  }
}
