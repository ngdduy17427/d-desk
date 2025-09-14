import { PlayerSnapshot, WorldSnapshot } from '../@type'
import { Game } from './game'

interface BufferedSnap {
  t: number
  map: Map<string, PlayerSnapshot>
}

export class GameNetState {
  private game: Game

  private buffer: BufferedSnap[] = []
  private delay = 120

  private boundOnSnapshot = (snap: WorldSnapshot) => this.onSnapshot(snap)

  constructor(game: Game) {
    this.game = game

    this.game.gameService?.gameSocket?.on('world:snapshot', this.boundOnSnapshot)
  }

  destroy() {
    this.game.gameService?.gameSocket?.off('world:snapshot', this.boundOnSnapshot)
  }

  sample(id: string) {
    const now = Date.now()
    const target = now - this.delay
    if (this.buffer.length < 2) return null

    let i = 0
    while (i < this.buffer.length && this.buffer[i].t <= target) i++
    const a = this.buffer[Math.max(0, i - 1)]
    const b = this.buffer[Math.min(this.buffer.length - 1, i)]

    const pa = a.map.get(id) ?? b.map.get(id)
    const pb = b.map.get(id) ?? a.map.get(id)
    if (!pa || !pb) return pa || pb || null

    const alpha = a.t === b.t ? 1 : (target - a.t) / (b.t - a.t)
    const t = Math.max(0, Math.min(1, alpha))
    return {
      x: pa.x + (pb.x - pa.x) * t,
      y: pa.y + (pb.y - pa.y) * t,
      lastDir: t < 0.5 ? pa.lastDir : pb.lastDir,
      vx: (pb.x - pa.x) / Math.max(1, b.t - a.t),
      vy: (pb.y - pa.y) / Math.max(1, b.t - a.t),
    }
  }

  private onSnapshot(snap: WorldSnapshot) {
    const map = new Map<string, PlayerSnapshot>(snap.players.map((player) => [player.id, player]))
    this.buffer.push({ t: snap.serverTime, map })
    const cutoff = Date.now() - 1000
    this.buffer = this.buffer.filter((b) => b.t >= cutoff)
  }
}
