import { getMyPetPlayerList } from "actions";
import { IProgramFile } from "program_files";
import { uuidv4 } from "utils/utils_helper";
import { PlayerPet, PlayerSettings } from "../@type";
import { MyPlayerEntity } from "../entities/my_player_entity";
import { PlayerEntity } from "../entities/player_entity";
import { calculateTileSize, createContext } from "../utils/utils_helper";
import { GameCamera } from "./game_camera";
import { GameMap } from "./game_map";
import { GameSocket } from "./game_socket";

export class Game {
  windowApp: IProgramFile;

  baseWidth: number = 1024;
  baseHeight: number = 576;
  baseTileSize: number = 32;

  tileSize: number = this.baseTileSize;

  gameCanvas: HTMLCanvasElement | undefined;
  gameContext: CanvasRenderingContext2D | undefined;

  gameAsset: HTMLImageElement | undefined;
  gameSocket: GameSocket | undefined;
  gameMap: GameMap | undefined;
  gameCamera: GameCamera | undefined;

  gamePlayers: Array<PlayerEntity> = [];
  player: MyPlayerEntity | undefined;

  debug: boolean = false;

  constructor(windowApp: IProgramFile) {
    this.windowApp = windowApp;

    addEventListener("resize", () => this.resizeGameCanvas());
    addEventListener(`resize-window-${this.windowApp.id}`, () => this.resizeGameCanvas());
  }

  load(): void {
    getMyPetPlayerList().then((response) =>
      response.forEach((playerPet: PlayerPet): number =>
        this.gamePlayers.push(
          new PlayerEntity(this, playerPet.id, playerPet.playerName, playerPet.x, playerPet.y)
        )
      )
    );
  }
  init(gameCanvas: HTMLCanvasElement, playerSettings: PlayerSettings): void {
    this.gameCanvas = gameCanvas;
    this.gameCanvas.width = this.gameCanvas.offsetWidth;
    this.gameCanvas.height = this.gameCanvas.offsetHeight;

    this.gameContext = createContext(this.gameCanvas);
    this.gameContext.imageSmoothingEnabled = false;
    this.gameContext.font = `bold 14px Source Code Pro`;
    this.gameContext.letterSpacing = `2px`;
    this.gameContext.wordSpacing = `2px`;
    this.gameContext.textRendering = `geometricPrecision`;

    this.tileSize = calculateTileSize(
      this.gameCanvas.width,
      this.gameCanvas.height,
      this.baseWidth,
      this.baseHeight,
      this.baseTileSize
    );

    this.gameAsset = new Image();
    this.gameAsset.src = `${process.env.NEXT_PUBLIC_BASE_URL}/images/one_am/assets.png`;

    this.gameAsset.onload = (): void => {
      this.player = new MyPlayerEntity(this, uuidv4(), playerSettings, 8.5, 25.5);
      this.gameMap = new GameMap(this);
      this.gameCamera = new GameCamera(this);
    };
  }
  update(delta: number): void {
    if (!this.gameMap || !this.gameCamera) return;

    this.gameMap.update(delta);
    this.gameCamera.update();
  }
  draw(): void {
    if (!this.gameCanvas || !this.gameContext || !this.gameMap) return;

    this.gameContext.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.gameContext.fillStyle = `#000`;
    this.gameContext.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.gameMap.draw();
  }
  destroy(): void {
    if (!this.gameMap || !this.gameCamera) return;

    this.gameMap.destroy();

    removeEventListener("resize", () => this.resizeGameCanvas());
    removeEventListener(`resize-window-${this.windowApp.id}`, () => this.resizeGameCanvas());
  }

  private resizeGameCanvas(): void {
    setTimeout((): void => {
      if (!this.gameCanvas || !this.gameContext || !this.gameMap || !this.gameCamera) return;

      this.gameCanvas.width = this.gameCanvas.offsetWidth;
      this.gameCanvas.height = this.gameCanvas.offsetHeight;

      this.gameContext.imageSmoothingEnabled = false;
      this.gameContext.font = `bold 14px Source Code Pro`;
      this.gameContext.letterSpacing = `2px`;
      this.gameContext.wordSpacing = `2px`;
      this.gameContext.textRendering = `geometricPrecision`;

      this.tileSize = calculateTileSize(
        this.gameCanvas.width,
        this.gameCanvas.height,
        this.baseWidth,
        this.baseHeight,
        this.baseTileSize
      );

      this.gameMap.updateMapSize();
      this.gameCamera.updateCameraSize();
    }, 300);
  }
}
