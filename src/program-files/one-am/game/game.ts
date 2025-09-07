import { ProgramFile } from 'program-files'
import { uniqueId } from 'utils/utils-helper'
import { PlayerSettings } from '../@type'
import { MyPlayerEntity } from '../entities/my-player-entity'
import { PlayerEntity } from '../entities/player-entity'
import { calculateTileSize, createContext } from '../utils/utils-helper'
import { GameCamera } from './game-camera'
import { GameMap } from './game-map'

export class Game {
  windowApp: ProgramFile

  baseWidth: number = 1024
  baseHeight: number = 576
  baseTileSize: number = 32

  tileSize: number = this.baseTileSize

  gameCanvas: HTMLCanvasElement | undefined
  gameContext: CanvasRenderingContext2D | undefined

  gameAsset: HTMLImageElement | undefined
  gameMap: GameMap | undefined
  gameCamera: GameCamera | undefined

  gamePlayers: Array<PlayerEntity> = []
  player: MyPlayerEntity | undefined

  debug: boolean = false

  constructor(windowApp: ProgramFile) {
    this.windowApp = windowApp

    addEventListener('resize', () => this.resizeGameCanvas())
    addEventListener(`resize-window-${this.windowApp.id}`, () => this.resizeGameCanvas())
  }

  load() {}
  init(gameCanvas: HTMLCanvasElement, playerSettings: PlayerSettings) {
    this.gameCanvas = gameCanvas
    this.gameCanvas.width = this.gameCanvas.offsetWidth
    this.gameCanvas.height = this.gameCanvas.offsetHeight

    this.gameContext = createContext(this.gameCanvas)
    this.gameContext.imageSmoothingEnabled = false
    this.gameContext.font = 'bold 14px Source Code Pro'
    this.gameContext.letterSpacing = '2px'
    this.gameContext.wordSpacing = '2px'
    this.gameContext.textRendering = 'geometricPrecision'

    this.tileSize = calculateTileSize(
      this.gameCanvas.width,
      this.gameCanvas.height,
      this.baseWidth,
      this.baseHeight,
      this.baseTileSize,
    )

    this.gameAsset = new Image()
    this.gameAsset.src = `${process.env.NEXT_PUBLIC_BASE_URL}/images/one-am/assets.png`

    this.gameAsset.onload = () => {
      this.player = new MyPlayerEntity(this, uniqueId(), playerSettings, 8.5, 25.5)
      this.gameMap = new GameMap(this)
      this.gameCamera = new GameCamera(this)
    }
  }
  update(delta: number) {
    if (!this.gameMap || !this.gameCamera) return

    this.gameMap.update(delta)
    this.gameCamera.update()
  }
  draw() {
    if (!this.gameCanvas || !this.gameContext || !this.gameMap) return

    this.gameContext.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height)

    this.gameContext.fillStyle = '#000'
    this.gameContext.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height)

    this.gameMap.draw()
  }
  destroy() {
    if (!this.gameMap || !this.gameCamera) return

    this.gameMap.destroy()

    removeEventListener('resize', () => this.resizeGameCanvas())
    removeEventListener(`resize-window-${this.windowApp.id}`, () => this.resizeGameCanvas())
  }

  private resizeGameCanvas() {
    setTimeout(() => {
      if (!this.gameCanvas || !this.gameContext || !this.gameMap || !this.gameCamera) return

      this.gameCanvas.width = this.gameCanvas.offsetWidth
      this.gameCanvas.height = this.gameCanvas.offsetHeight

      this.gameContext.imageSmoothingEnabled = false
      this.gameContext.font = 'bold 14px Source Code Pro'
      this.gameContext.letterSpacing = '2px'
      this.gameContext.wordSpacing = '2px'
      this.gameContext.textRendering = 'geometricPrecision'

      this.tileSize = calculateTileSize(
        this.gameCanvas.width,
        this.gameCanvas.height,
        this.baseWidth,
        this.baseHeight,
        this.baseTileSize,
      )

      this.gameMap.updateMapSize()
      this.gameCamera.updateCameraSize()
    }, 300)
  }
}
