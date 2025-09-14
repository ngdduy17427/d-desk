import { ProgramFile } from 'program-files'
import { Socket, io } from 'socket.io-client'
import { isUndefined } from 'utils/utils-helper'
import { PlayerSettings } from '../@type'
import { Game } from './game'
import { GameLoop } from './game-loop'

export class GameService {
  private windowApp: ProgramFile
  private isServerAlive: boolean

  game: Game | undefined
  gameLoop: GameLoop | undefined
  gameSocket: Socket | undefined

  constructor(windowApp: ProgramFile, playersOnline: number | undefined) {
    this.windowApp = windowApp
    this.isServerAlive = !isUndefined(playersOnline)

    this.gameSocket = this.isServerAlive
      ? io(String(process.env.NEXT_PUBLIC_DUHI_HOME_SERVER_URL), {
          path: '/socket.io',
          transports: ['websocket'],
        })
      : undefined
  }

  async start(gameCanvas: HTMLCanvasElement, playerSettings: PlayerSettings): Promise<void> {
    this.game = new Game(this.windowApp, this)
    this.gameLoop = new GameLoop()

    return Promise.resolve()
      .then(() => this.game?.init(gameCanvas, playerSettings))
      .then(() => this.gameLoop?.start(this.game!))
  }

  destroy() {
    this.gameSocket?.disconnect()
    this.gameLoop?.destroy()
    this.game?.destroy()
  }
}
