import { ProgramFile } from 'program-files'
import { PlayerSettings } from '../@type'
import { Game } from './game'
import { GameLoop } from './game-loop'

export class GameService {
  private windowApp: ProgramFile

  game: Game | undefined
  gameLoop: GameLoop | undefined

  constructor(windowApp: ProgramFile) {
    this.windowApp = windowApp
  }

  async start(gameCanvas: HTMLCanvasElement, playerSettings: PlayerSettings): Promise<void> {
    this.game = new Game(this.windowApp)
    this.gameLoop = new GameLoop()

    return Promise.resolve()
      .then(() => this.game?.init(gameCanvas, playerSettings))
      .then(() => this.gameLoop?.start(<Game>this.game))
  }
  async destroy(): Promise<void> {
    return Promise.resolve()
      .then(() => this.gameLoop?.destroy())
      .then(() => this.game?.destroy())
  }
}
