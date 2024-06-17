import { uuidv4 } from "utils/utils_helper";
import { BigRockEntity } from "../entities/big_rock_entity";
import { CarrotEntity } from "../entities/carrot_entity";
import { GrassEntity } from "../entities/grass_entity";
import { MoonEntity } from "../entities/moon_entity";
import { NonPlayerEntity } from "../entities/non_player_entity";
import { OldTreeEntity } from "../entities/old_tree_entity";
import { PlayerEntity } from "../entities/player_entity";
import { SmallTreeEntity } from "../entities/small_tree_entity";
import { TreeEntity } from "../entities/tree_entity";
import { TulipEntity } from "../entities/tulip_entity";
import { WellsEntity } from "../entities/wells_entity";
import { layers } from "../utils/layer_helper";
import { reorderGameObjectsByY } from "../utils/utils_helper";
import { Game } from "./game";
import { GameEntity } from "./game_entity";

export class GameMap {
  private game: Game;
  private gameSkyObjects: Array<GameEntity> = [];
  private gameEntities: Array<GameEntity> = [];

  cols: number = 48;
  rows: number = 27;

  mapAssetCols: number = 0;

  constructor(game: Game) {
    this.game = game;
    this.mapAssetCols = Number(game.gameAsset?.width) / game.baseTileSize;

    this.addSky(new MoonEntity(this.game, uuidv4(), 2.5, 2.5, { width: 2, height: 2 }));
    this.addObject(new CarrotEntity(this.game, uuidv4(), 35.5, 13.5));
    this.addObject(new CarrotEntity(this.game, uuidv4(), 36.5, 13.5));
    this.addObject(new CarrotEntity(this.game, uuidv4(), 37.5, 13.5));
    this.addObject(new CarrotEntity(this.game, uuidv4(), 35.5, 14.5));
    this.addObject(new CarrotEntity(this.game, uuidv4(), 36.5, 14.5));
    this.addObject(new CarrotEntity(this.game, uuidv4(), 37.5, 14.5));
    this.addObject(new CarrotEntity(this.game, uuidv4(), 35.5, 15.5));
    this.addObject(new CarrotEntity(this.game, uuidv4(), 36.5, 15.5));
    this.addObject(new CarrotEntity(this.game, uuidv4(), 37.5, 15.5));
    this.addObject(new CarrotEntity(this.game, uuidv4(), 35.5, 16.5));
    this.addObject(new CarrotEntity(this.game, uuidv4(), 36.5, 16.5));
    this.addObject(new CarrotEntity(this.game, uuidv4(), 37.5, 16.5));
    this.addObject(new CarrotEntity(this.game, uuidv4(), 35.5, 17.5));
    this.addObject(new CarrotEntity(this.game, uuidv4(), 36.5, 17.5));
    this.addObject(new CarrotEntity(this.game, uuidv4(), 37.5, 17.5));
    this.addObject(new WellsEntity(this.game, uuidv4(), 32.5, 18.5));
    this.addObject(new GrassEntity(this.game, uuidv4(), 6.5, 26.5));
    this.addObject(new GrassEntity(this.game, uuidv4(), 15.5, 21.5));
    this.addObject(new GrassEntity(this.game, uuidv4(), 20.5, 20.5));
    this.addObject(new GrassEntity(this.game, uuidv4(), 43.5, 8.5));
    this.addObject(new TulipEntity(this.game, uuidv4(), 4.5, 23.5));
    this.addObject(new TulipEntity(this.game, uuidv4(), 25.5, 22));
    this.addObject(new TulipEntity(this.game, uuidv4(), 43.5, 24.5));
    this.addObject(new TulipEntity(this.game, uuidv4(), 47.5, 11.5));
    this.addObject(new BigRockEntity(this.game, uuidv4(), 24.5, 26.5));
    this.addObject(new TreeEntity(this.game, uuidv4(), 10.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 11.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 12.5, 27));
    this.addObject(new SmallTreeEntity(this.game, uuidv4(), 13.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 14.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 15.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 16.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 17.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 18.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 19.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 20.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 21.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 22.5, 27));
    this.addObject(new SmallTreeEntity(this.game, uuidv4(), 23.5, 27));
    this.addObject(new SmallTreeEntity(this.game, uuidv4(), 25.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 26.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 27.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 28.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 29.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 30.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 31.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 32.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 33.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 34.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 35.5, 27));
    this.addObject(new SmallTreeEntity(this.game, uuidv4(), 36.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 37.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 38.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 39.5, 27));
    this.addObject(new SmallTreeEntity(this.game, uuidv4(), 40.5, 27));
    this.addObject(new SmallTreeEntity(this.game, uuidv4(), 41.5, 27));
    this.addObject(new SmallTreeEntity(this.game, uuidv4(), 42.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 43.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 44.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 45.5, 27));
    this.addObject(new SmallTreeEntity(this.game, uuidv4(), 46.5, 27));
    this.addObject(new TreeEntity(this.game, uuidv4(), 47.5, 27));
    this.addObject(new OldTreeEntity(this.game, uuidv4(), 45.5, 6.5));

    this.addObject(new NonPlayerEntity(this.game, uuidv4(), { playerName: "Duy" }, 12, 22));

    this.game.gamePlayers.forEach((otherPlayer: PlayerEntity): void => this.addObject(otherPlayer));
    this.addObject(<PlayerEntity>this.game.player);
  }

  addSky(entity: GameEntity): void {
    this.gameSkyObjects.push(entity);
  }
  addObject(entity: GameEntity): void {
    this.gameEntities.push(entity);
  }
  update(delta: number): void {
    this.gameSkyObjects.forEach((entity): void => entity.update(delta));

    this.gameEntities = reorderGameObjectsByY(this.gameEntities);
    this.gameEntities.forEach((entity): void => entity.update(delta));
  }
  updateMapSize(): void {
    if (!this.game.gameCanvas) return;

    this.gameSkyObjects.forEach((entity): void => entity.updateSpriteSize());
    this.gameEntities.forEach((entity): void => entity.updateSpriteSize());
  }
  draw(): void {
    if (!this.game.gameContext) return;

    this.gameSkyObjects.forEach((entity): void => entity.draw());
    this.drawMap();
    this.gameEntities.forEach((entity): void => entity.draw());

    this.game.debug && this.drawGrid();
  }
  destroy(): void {
    this.gameEntities.forEach((entity) => entity.destroy());
  }

  private drawMap(): void {
    this.drawLayer(layers[0]);
    this.drawLayer(layers[1]);
  }
  private drawLayer(layer: Array<Array<number>>): void {
    if (!this.game.gameContext || !this.game.gameAsset || !this.game.gameCamera) return;

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.game.gameContext.drawImage(
          this.game.gameAsset,
          this.getTileX(layer, row, col),
          this.getTileY(layer, row, col),
          this.game.baseTileSize,
          this.game.baseTileSize,
          col * this.game.tileSize - this.game.gameCamera.position.x,
          row * this.game.tileSize - this.game.gameCamera.position.y,
          this.game.tileSize,
          this.game.tileSize
        );
      }
    }
  }
  private drawGrid(): void {
    if (!this.game.gameContext || !this.game.gameCamera) return;

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.game.gameContext.strokeStyle = `blue`;
        this.game.gameContext.strokeRect(
          x * this.game.tileSize - this.game.gameCamera.position.x,
          y * this.game.tileSize - this.game.gameCamera.position.y,
          this.game.tileSize,
          this.game.tileSize
        );
      }
    }
  }
  private getTileX(layer: Array<Array<number>>, row: number, col: number): number {
    return ((layer[row][col] - 1) * this.game.baseTileSize) % Number(this.game.gameAsset?.width);
  }
  private getTileY(layer: Array<Array<number>>, row: number, col: number): number {
    return Math.floor((layer[row][col] - 1) / this.mapAssetCols) * this.game.baseTileSize;
  }
}
