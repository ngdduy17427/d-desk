import { getMyPetPlayerList } from "actions";
import { IProgramFile } from "program_files";
import { uuidv4 } from "utils/utils_helper";
import { PetSettings, PlayerPet } from "../@type";
import { PetSprite } from "../sprites/pet_sprite";
import { PlayerSprite } from "../sprites/player_sprite";
import { createContext } from "../utils/utils_helper";
import { GameAsset } from "./game_asset";
import { GameCamera } from "./game_camera";
import { GameMap } from "./game_map";
import { GameSocket } from "./game_socket";

export class Game {
  windowApp: IProgramFile;

  baseWidth: number = 1024;
  baseHeight: number = 576;
  baseTileSize: number = 32;

  gameAsset: GameAsset;
  gameSocket: GameSocket;

  gameCanvas: HTMLCanvasElement | undefined;
  gameContext: CanvasRenderingContext2D | undefined;

  gameMap: GameMap | undefined;
  gameCamera: GameCamera | undefined;

  player: PlayerSprite | undefined;

  debug: boolean = false;

  constructor(windowApp: IProgramFile, gameAsset: GameAsset, gameSocket: GameSocket) {
    this.windowApp = windowApp;
    this.gameAsset = gameAsset;
    this.gameSocket = gameSocket;

    addEventListener("resize", () => this.resizeGameCanvas());
    addEventListener(`resize-window-${this.windowApp.id}`, () => this.resizeGameCanvas());
  }

  load(): void {
    getMyPetPlayerList().then((response) =>
      response.forEach((playerPet: PlayerPet): void =>
        this.gameMap?.addObject(
          new PetSprite(
            this,
            playerPet.id,
            playerPet.spriteName,
            playerPet.spriteAvatar,
            playerPet.x,
            playerPet.y
          )
        )
      )
    );
  }
  init(gameCanvas: HTMLCanvasElement, playerSettings: PetSettings): void {
    this.gameCanvas = gameCanvas;

    this.gameCanvas.width = this.gameCanvas.offsetWidth;
    this.gameCanvas.height = this.gameCanvas.offsetHeight;

    this.gameContext = createContext(this.gameCanvas);

    this.gameMap = new GameMap(this);
    this.gameCamera = new GameCamera(this);
    this.player = new PlayerSprite(this, uuidv4(), playerSettings, 8.5, 25.5);

    this.gameMap.init();
  }
  update(delta: number): void {
    if (!this.gameMap || !this.gameCamera) return;

    this.gameMap.update(delta);
    this.gameCamera.update();
  }
  draw(): void {
    if (!this.gameCanvas || !this.gameContext || !this.gameMap) return;

    this.gameContext.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.gameContext.imageSmoothingEnabled = false;
    this.gameContext.font = `bold 14px Source Code Pro`;
    this.gameContext.fillStyle = `#fff`;
    this.gameContext.letterSpacing = `2px`;
    this.gameContext.wordSpacing = `2px`;
    this.gameContext.textRendering = `geometricPrecision`;

    this.gameContext.fillStyle = `#000`;
    this.gameContext.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

    this.gameMap.draw();
  }
  destroy(): void {
    if (!this.gameMap || !this.gameCamera) return;

    this.gameMap.destroy();
    this.gameCamera.destroy();

    removeEventListener("resize", () => this.resizeGameCanvas());
    removeEventListener(`resize-window-${this.windowApp.id}`, () => this.resizeGameCanvas());
  }

  private resizeGameCanvas(): void {
    setTimeout((): void => {
      if (!this.gameCanvas || !this.gameContext || !this.gameMap || !this.gameCamera) return;

      this.gameCanvas.width = this.gameCanvas.offsetWidth;
      this.gameCanvas.height = this.gameCanvas.offsetHeight;

      this.gameMap.updateTileSize();
      this.gameCamera.updateCameraSize();
    }, 300);
  }
}
