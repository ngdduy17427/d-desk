import { EntityId, PlayerSettings } from '../@type'
import { Game } from '../game/game'
import { InputHelper } from '../utils/input-helper'
import { PlayerEntity } from './player-entity'

export class MyPlayerEntity extends PlayerEntity {
  inputHelper?: InputHelper

  isChatting: boolean = false

  constructor(game: Game, id: EntityId, playerSettings: PlayerSettings, x: number, y: number) {
    super(game, id, playerSettings.name, x, y)

    this.inputHelper = new InputHelper(this)

    addEventListener('keydown', this.onKeyDown)
    addEventListener('keyup', this.onKeyUp)
  }

  update(delta: number) {
    if (this.game?.gameNetState && this.game.gameService?.gameSocket?.id) {
      const playerSnapshot = this.game.gameNetState.sample(this.game.gameService.gameSocket.id)
      if (playerSnapshot) this.applyNetSnapshot(playerSnapshot)
    }

    super.update(delta)
  }

  destroy() {
    removeEventListener('keydown', this.onKeyDown)
    removeEventListener('keyup', this.onKeyUp)
  }

  setIsChatting(isChatting: boolean) {
    this.isChatting = isChatting
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (!this.game?.windowApp.windowState.isFocus || this.isChatting) return
    this.inputHelper?.setFromKeyboard(event.code, true)
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (!this.game?.windowApp.windowState.isFocus || this.isChatting) return
    this.inputHelper?.setFromKeyboard(event.code, false)
  }
}
