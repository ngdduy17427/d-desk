import { uuidv4 } from "utils/utils_helper";
import { SpriteType } from "../@type";
import { BigRockSprite } from "../sprites/big_rock_sprite";
import { CarrotSprite } from "../sprites/carrot_sprite";
import { GrassSprite } from "../sprites/grass_sprite";
import { MoonSprite } from "../sprites/moon_sprite";
import { OldTreeSprite } from "../sprites/old_tree_sprite";
import { PlayerSprite } from "../sprites/player_sprite";
import { TulipSprite } from "../sprites/tulip_sprite";
import { WellsSprite } from "../sprites/wells_sprite";
import { layers } from "../utils/layer_helper";
import { calculateTileSize, reorderGameObjectsByY } from "../utils/utils_helper";
import { Game } from "./game";
import { GameSprite } from "./game_sprite";
import { TreeSprite } from "../sprites/tree_sprite";
import { SmallTreeSprite } from "../sprites/small_tree_sprite";

export const MapSpriteType: SpriteType = "MAP_SPRITE";

export class GameMap {
  private game: Game;
  private gameSkyObjects: Array<GameSprite> = [];
  private gameObjects: Array<GameSprite> = [];

  cols: number = 48;
  rows: number = 27;
  tileSize: number = 32;

  mapAssets: HTMLImageElement | undefined;
  mapAssetCols: number = 0;

  constructor(game: Game) {
    this.game = game;
    this.mapAssets = game.gameAsset.assets.get(MapSpriteType);
    this.mapAssetCols = Number(this.mapAssets?.width) / this.game.baseTileSize;

    this.updateTileSize();
  }

  init(): void {
    this.addSky(new MoonSprite(this.game, uuidv4(), 2.5, 2.5, { width: 2, height: 2 }));

    this.addObject(new CarrotSprite(this.game, uuidv4(), 35.5, 13.5));
    this.addObject(new CarrotSprite(this.game, uuidv4(), 36.5, 13.5));
    this.addObject(new CarrotSprite(this.game, uuidv4(), 37.5, 13.5));
    this.addObject(new CarrotSprite(this.game, uuidv4(), 35.5, 14.5));
    this.addObject(new CarrotSprite(this.game, uuidv4(), 36.5, 14.5));
    this.addObject(new CarrotSprite(this.game, uuidv4(), 37.5, 14.5));
    this.addObject(new CarrotSprite(this.game, uuidv4(), 35.5, 15.5));
    this.addObject(new CarrotSprite(this.game, uuidv4(), 36.5, 15.5));
    this.addObject(new CarrotSprite(this.game, uuidv4(), 37.5, 15.5));
    this.addObject(new CarrotSprite(this.game, uuidv4(), 35.5, 16.5));
    this.addObject(new CarrotSprite(this.game, uuidv4(), 36.5, 16.5));
    this.addObject(new CarrotSprite(this.game, uuidv4(), 37.5, 16.5));
    this.addObject(new CarrotSprite(this.game, uuidv4(), 35.5, 17.5));
    this.addObject(new CarrotSprite(this.game, uuidv4(), 36.5, 17.5));
    this.addObject(new CarrotSprite(this.game, uuidv4(), 37.5, 17.5));
    this.addObject(new WellsSprite(this.game, uuidv4(), 32.5, 18.5));
    this.addObject(new GrassSprite(this.game, uuidv4(), 6.5, 26.5));
    this.addObject(new GrassSprite(this.game, uuidv4(), 15.5, 21.5));
    this.addObject(new GrassSprite(this.game, uuidv4(), 20.5, 20.5));
    this.addObject(new GrassSprite(this.game, uuidv4(), 43.5, 8.5));
    this.addObject(new TulipSprite(this.game, uuidv4(), 4.5, 23.5));
    this.addObject(new TulipSprite(this.game, uuidv4(), 25.5, 22));
    this.addObject(new TulipSprite(this.game, uuidv4(), 43.5, 24.5));
    this.addObject(new TulipSprite(this.game, uuidv4(), 47.5, 11.5));
    this.addObject(new BigRockSprite(this.game, uuidv4(), 24.5, 26.5));
    this.addObject(new TreeSprite(this.game, uuidv4(), 10.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 11.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 12.5, 27));
    this.addObject(new SmallTreeSprite(this.game, uuidv4(), 13.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 14.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 15.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 16.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 17.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 18.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 19.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 20.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 21.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 22.5, 27));
    this.addObject(new SmallTreeSprite(this.game, uuidv4(), 23.5, 27));
    this.addObject(new SmallTreeSprite(this.game, uuidv4(), 25.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 26.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 27.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 28.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 29.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 30.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 31.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 32.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 33.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 34.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 35.5, 27));
    this.addObject(new SmallTreeSprite(this.game, uuidv4(), 36.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 37.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 38.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 39.5, 27));
    this.addObject(new SmallTreeSprite(this.game, uuidv4(), 40.5, 27));
    this.addObject(new SmallTreeSprite(this.game, uuidv4(), 41.5, 27));
    this.addObject(new SmallTreeSprite(this.game, uuidv4(), 42.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 43.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 44.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 45.5, 27));
    this.addObject(new SmallTreeSprite(this.game, uuidv4(), 46.5, 27));
    this.addObject(new TreeSprite(this.game, uuidv4(), 47.5, 27));
    this.addObject(new OldTreeSprite(this.game, uuidv4(), 45.5, 6.5));

    this.addObject(<PlayerSprite>this.game.player);
  }
  addSky(gameSprite: GameSprite): void {
    this.gameSkyObjects.push(gameSprite);
  }
  addObject(gameSprite: GameSprite): void {
    this.gameObjects.push(gameSprite);
  }
  update(delta: number): void {
    this.gameSkyObjects.forEach((sprite): void => sprite.update(delta));

    this.gameObjects = reorderGameObjectsByY(this.gameObjects);
    this.gameObjects.forEach((sprite): void => sprite.update(delta));
  }
  updateTileSize(): void {
    if (!this.game.gameCanvas) return;

    this.tileSize = calculateTileSize(
      this.game.gameCanvas.width,
      this.game.gameCanvas.height,
      this.game.baseWidth,
      this.game.baseHeight,
      this.game.baseTileSize
    );

    this.gameSkyObjects.forEach((sprite): void => sprite.updateSpriteSize());
    this.gameObjects.forEach((sprite): void => sprite.updateSpriteSize());
  }
  draw(): void {
    if (!this.game.gameContext) return;

    this.gameSkyObjects.forEach((sprite): void => sprite.draw());
    this.drawMap();
    this.gameObjects.forEach((sprite): void => sprite.draw());

    this.game.debug && this.drawGrid();
  }
  destroy(): void {
    this.gameObjects.forEach((sprite) => sprite.destroy());
  }

  private drawMap(): void {
    this.drawLayer(layers[0]);
    this.drawLayer(layers[1]);
  }
  private drawLayer(layer: Array<Array<number>>): void {
    if (!this.game.gameContext || !this.mapAssets || !this.game.gameMap || !this.game.gameCamera)
      return;

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.game.gameContext.drawImage(
          this.mapAssets,

          this.getTileX(layer, row, col),
          this.getTileY(layer, row, col),

          this.game.baseTileSize,
          this.game.baseTileSize,

          col * this.tileSize - this.game.gameCamera.position.x,
          row * this.tileSize - this.game.gameCamera.position.y,

          this.tileSize,
          this.tileSize
        );
      }
    }
  }
  private drawGrid(): void {
    if (!this.game.gameContext || !this.game.gameMap || !this.game.gameCamera) return;

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.game.gameContext.strokeStyle = `blue`;
        this.game.gameContext.strokeRect(
          x * this.tileSize - this.game.gameCamera.position.x,
          y * this.tileSize - this.game.gameCamera.position.y,
          this.tileSize,
          this.tileSize
        );
      }
    }
  }
  private getTileX(layer: Array<Array<number>>, row: number, col: number): number {
    return ((layer[row][col] - 1) * this.game.baseTileSize) % Number(this.mapAssets?.width);
  }
  private getTileY(layer: Array<Array<number>>, row: number, col: number): number {
    return Math.floor((layer[row][col] - 1) / this.mapAssetCols) * this.game.baseTileSize;
  }
}
