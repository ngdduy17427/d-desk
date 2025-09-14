import { PlayerMessage, WorldSnapshotLite } from '../@type'
import { PlayerEntity } from '../entities/player-entity'
import type { Game } from './game'

export class GamePlayer {
  private game: Game

  private boundOnSnapshot = (snap: WorldSnapshotLite) => this.onSnapshot(snap)
  private boundOnMessage = (playerMessage: PlayerMessage) => this.onMessage(playerMessage)
  private boundOnDisconnect = (id: string) => this.onDisconnect(id)

  constructor(game: Game) {
    this.game = game

    this.game.gameService?.gameSocket?.emit('player:join', {
      name: this.game.player?.name,
      x: this.game.player?.position.x,
      y: this.game.player?.position.y,
    })

    this.game.gameService?.gameSocket?.on('player:message', this.boundOnMessage)
    this.game.gameService?.gameSocket?.on('player:disconnect', this.boundOnDisconnect)
    this.game.gameService?.gameSocket?.on('world:snapshot', this.boundOnSnapshot)
  }

  destroy() {
    this.game.gameService?.gameSocket?.off('player:message', this.boundOnMessage)
    this.game.gameService?.gameSocket?.off('player:disconnect', this.boundOnDisconnect)
    this.game.gameService?.gameSocket?.off('world:snapshot', this.boundOnSnapshot)
  }

  private onMessage(playerMessage: PlayerMessage) {
    const player = this.game.players.get(playerMessage.id)
    player?.setPlayerMessage(playerMessage.message)
  }

  private onDisconnect(id: string) {
    if (this.game.players.has(id)) {
      this.game.players.delete(id)
    }
  }

  private onSnapshot(snap: WorldSnapshotLite) {
    for (const player of snap.players) {
      if (player.id === this.game.gameService?.gameSocket?.id) continue

      if (!this.game.players.has(player.id)) {
        const entity = new PlayerEntity(this.game, player.id, player.name, player.x, player.y)
        this.game.players.set(player.id, entity)
      }
    }
  }
}
