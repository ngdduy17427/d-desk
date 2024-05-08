import { uuidv4 } from "utils/utils_helper";
import { EntityMap, PetSettings } from "../@type";
import { PetSprite } from "../sprites/pet_sprite";
import { PlayerSprite } from "../sprites/player_sprite";
import { createCanvas, createContext } from "../utils/utils_helper";
import { GameAsset } from "./game_asset";
import { GameEntity } from "./game_entity";
import { GameSocket } from "./game_socket";

export class Game {
  gameAsset: GameAsset | undefined;
  gameSocket: GameSocket | undefined;

  canvas: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined;
  player: PlayerSprite | undefined;

  private gameEntities: Array<GameEntity> = [];

  constructor(gameAsset: GameAsset, gameSocket: GameSocket) {
    this.gameAsset = gameAsset;
    this.gameSocket = gameSocket;
  }

  load(entityMap: Array<EntityMap>): void {
    entityMap.forEach((entity): number =>
      this.gameEntities.push(
        new PetSprite(entity.id, entity.petName, entity.petAvatar, entity.x, entity.y)
      )
    );
  }
  init(playerSettings: PetSettings): void {
    this.initCanvas();
    this.initPlayer(playerSettings);

    if (!this.player) return;

    this.gameEntities.push(this.player);
    this.gameEntities.forEach((gEntity): void => gEntity.init(this));

    this.initSocket();
  }
  update(delta: number): void {
    this.updateGameEntityOrder();
    this.gameEntities.forEach((gEntity): void => gEntity.update(delta));
  }
  draw(): void {
    if (!this.canvas || !this.context) return;

    this.context.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.context.imageSmoothingEnabled = true;
    this.context.imageSmoothingQuality = `high`;

    this.context.font = `bold 14px Source Code Pro`;
    this.context.fillStyle = `#fff`;
    this.context.letterSpacing = "2px";
    this.context.wordSpacing = "2px";
    this.context.textRendering = "geometricPrecision";

    this.context.shadowColor = `#000`;
    this.context.shadowOffsetX = 1;
    this.context.shadowOffsetY = 1;

    this.gameEntities.forEach((gEntity) => gEntity.draw());
  }
  destroy(): void {
    if (!this.canvas || !document.body.contains(this.canvas)) return;

    this.gameSocket?.emit("playerDisconnect", this.player?.entity.id);
    document.body.removeChild(this.canvas);
  }

  private initCanvas(): void {
    this.canvas = createCanvas(document.body.offsetWidth, document.body.offsetHeight);
    this.context = createContext(this.canvas);

    document.body.appendChild(this.canvas);
  }
  private initPlayer(playerSettings: PetSettings): void {
    this.player = new PlayerSprite(
      uuidv4(),
      playerSettings,
      Number(this.canvas?.width) / 2,
      Number(this.canvas?.height) / 2
    );
  }
  private initSocket(): void {
    this.gameSocket?.on("playerJoinGame", (player: EntityMap): void => {
      const petEntity = new PetSprite(
        player.id,
        player.petName,
        player.petAvatar,
        player.x,
        player.y
      );
      petEntity.init(this);

      this.gameEntities.push(petEntity);
    });
    this.gameSocket?.on("playerDisconnect", (playerId: string): void => {
      this.gameEntities = this.gameEntities.filter((gEntity) => gEntity.entity.id !== playerId);
    });
  }
  private updateGameEntityOrder(): void {
    this.gameEntities.sort(
      (sEntity, dEntity) =>
        sEntity.entity.position.y +
        sEntity.entity.dh -
        (dEntity.entity.position.y + dEntity.entity.dh)
    );
  }
}
