import { uniqueId } from 'utils/utils-helper'
import { BigRockEntity } from '../entities/big-rock-entity'
import { CarrotEntity } from '../entities/carrot-entity'
import { GrassEntity } from '../entities/grass-entity'
import { NPCEntity } from '../entities/npc-entity'
import { OldTreeEntity } from '../entities/old-tree-entity'
import { SmallTreeEntity } from '../entities/small-tree-entity'
import { TreeEntity } from '../entities/tree-entity'
import { TulipEntity } from '../entities/tulip-entity'
import { WellsEntity } from '../entities/wells-entity'
import { layers } from '../utils/layer-helper'
import { reorderGameObjectsByY } from '../utils/utils-helper'
import { Game } from './game'
import { GameEntity } from './game-entity'

export class GameMap {
  private game: Game
  private gameEntities: Array<GameEntity> = []
  private sortedDrawable: Array<GameEntity> = []

  cols: number = 48
  rows: number = 27

  mapAssetCols: number = 0

  constructor(game: Game) {
    this.game = game
    this.mapAssetCols = Number(game.gameAsset?.width) / game.baseTileSize

    this.addEntity(new CarrotEntity(this.game, uniqueId(), 35.5, 13.5))
    this.addEntity(new CarrotEntity(this.game, uniqueId(), 36.5, 13.5))
    this.addEntity(new CarrotEntity(this.game, uniqueId(), 37.5, 13.5))
    this.addEntity(new CarrotEntity(this.game, uniqueId(), 35.5, 14.5))
    this.addEntity(new CarrotEntity(this.game, uniqueId(), 36.5, 14.5))
    this.addEntity(new CarrotEntity(this.game, uniqueId(), 37.5, 14.5))
    this.addEntity(new CarrotEntity(this.game, uniqueId(), 35.5, 15.5))
    this.addEntity(new CarrotEntity(this.game, uniqueId(), 36.5, 15.5))
    this.addEntity(new CarrotEntity(this.game, uniqueId(), 37.5, 15.5))
    this.addEntity(new CarrotEntity(this.game, uniqueId(), 35.5, 16.5))
    this.addEntity(new CarrotEntity(this.game, uniqueId(), 36.5, 16.5))
    this.addEntity(new CarrotEntity(this.game, uniqueId(), 37.5, 16.5))
    this.addEntity(new CarrotEntity(this.game, uniqueId(), 35.5, 17.5))
    this.addEntity(new CarrotEntity(this.game, uniqueId(), 36.5, 17.5))
    this.addEntity(new CarrotEntity(this.game, uniqueId(), 37.5, 17.5))

    this.addEntity(new WellsEntity(this.game, uniqueId(), 32.5, 18.5))

    this.addEntity(new GrassEntity(this.game, uniqueId(), 6.5, 26.5))
    this.addEntity(new GrassEntity(this.game, uniqueId(), 15.5, 21.5))
    this.addEntity(new GrassEntity(this.game, uniqueId(), 20.5, 20.5))
    this.addEntity(new GrassEntity(this.game, uniqueId(), 43.5, 8.5))

    this.addEntity(new TulipEntity(this.game, uniqueId(), 4.5, 23.5))
    this.addEntity(new TulipEntity(this.game, uniqueId(), 25.5, 22))
    this.addEntity(new TulipEntity(this.game, uniqueId(), 43.5, 24.5))
    this.addEntity(new TulipEntity(this.game, uniqueId(), 47.5, 11.5))

    this.addEntity(new BigRockEntity(this.game, uniqueId(), 24.5, 26.5))

    this.addEntity(new TreeEntity(this.game, uniqueId(), 10.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 11.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 12.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 14.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 15.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 16.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 17.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 18.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 19.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 20.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 21.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 22.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 26.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 27.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 28.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 29.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 30.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 31.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 32.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 33.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 34.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 35.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 37.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 38.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 39.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 43.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 44.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 45.5, 27))
    this.addEntity(new TreeEntity(this.game, uniqueId(), 47.5, 27))

    this.addEntity(new SmallTreeEntity(this.game, uniqueId(), 13.5, 27))
    this.addEntity(new SmallTreeEntity(this.game, uniqueId(), 23.5, 27))
    this.addEntity(new SmallTreeEntity(this.game, uniqueId(), 25.5, 27))
    this.addEntity(new SmallTreeEntity(this.game, uniqueId(), 36.5, 27))
    this.addEntity(new SmallTreeEntity(this.game, uniqueId(), 40.5, 27))
    this.addEntity(new SmallTreeEntity(this.game, uniqueId(), 41.5, 27))
    this.addEntity(new SmallTreeEntity(this.game, uniqueId(), 42.5, 27))
    this.addEntity(new SmallTreeEntity(this.game, uniqueId(), 46.5, 27))

    this.addEntity(new OldTreeEntity(this.game, uniqueId(), 45.5, 6.5))

    this.addEntity(new NPCEntity(this.game, uniqueId(), { name: 'Duy' }, 12, 22))
  }

  addEntity(entity: GameEntity) {
    this.gameEntities.push(entity)
  }

  update(delta: number) {
    const allEntities: GameEntity[] = [...this.gameEntities, ...this.collectPlayers()]
    this.sortedDrawable = reorderGameObjectsByY(allEntities)
    for (const entity of allEntities) entity.update(delta)
  }

  updateMapSize() {
    const allEntities: GameEntity[] = [...this.gameEntities, ...this.collectPlayers()]
    for (const entity of allEntities) entity.updateSpriteSize()
  }

  draw() {
    this.drawMap()
    for (const entity of this.sortedDrawable) entity.draw()

    if (this.game.debug) {
      this.drawGrid()
    }
  }

  destroy() {
    const allEntities: GameEntity[] = [...this.gameEntities, ...this.collectPlayers()]
    for (const entity of allEntities) entity.destroy()
  }

  private collectPlayers(): GameEntity[] {
    const out: GameEntity[] = []
    for (const [, p] of this.game.players) out.push(p)
    if (this.game.player) out.push(this.game.player)
    return out
  }

  private drawMap() {
    this.drawLayer(layers[0])
    this.drawLayer(layers[1])
  }

  private drawLayer(layer: Array<Array<number>>) {
    if (!this.game.gameContext || !this.game.gameAsset || !this.game.gameCamera) return

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
          this.game.tileSize,
        )
      }
    }
  }

  private getTileX(layer: Array<Array<number>>, row: number, col: number): number {
    return ((layer[row][col] - 1) * this.game.baseTileSize) % Number(this.game.gameAsset?.width)
  }

  private getTileY(layer: Array<Array<number>>, row: number, col: number): number {
    return Math.floor((layer[row][col] - 1) / this.mapAssetCols) * this.game.baseTileSize
  }

  private drawGrid() {
    if (!this.game.gameContext || !this.game.gameCamera) return

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.game.gameContext.strokeStyle = 'blue'
        this.game.gameContext.strokeRect(
          x * this.game.tileSize - this.game.gameCamera.position.x,
          y * this.game.tileSize - this.game.gameCamera.position.y,
          this.game.tileSize,
          this.game.tileSize,
        )
      }
    }
  }
}
