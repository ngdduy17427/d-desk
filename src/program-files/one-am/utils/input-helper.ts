import { Direction, InputState } from '../@type'
import { MyPlayerEntity } from '../entities/my-player-entity'

export class InputHelper {
  private player: MyPlayerEntity
  private pressed: Record<Direction, boolean> = { I: false, N: false, E: false, S: false, W: false }

  constructor(player: MyPlayerEntity) {
    this.player = player
  }

  setFromKeyboard(code: string, down: boolean) {
    const direction = this.mapKey(code)
    if (!direction) return

    if (this.pressed[direction] === down) return
    this.pressed[direction] = down

    this.emit()
  }

  setFromJoystick(dir: Direction, down: boolean) {
    if (dir === Direction.IDLE) return
    if (this.pressed[dir] === down) return
    this.pressed[dir] = down
    this.emit()
  }

  clearJoystick() {
    const had = this.pressed.N || this.pressed.E || this.pressed.S || this.pressed.W
    if (!had) return
    this.pressed = { I: false, N: false, E: false, S: false, W: false }
    this.emit()
  }

  setFromJoystickVector(x: number, y: number) {
    const dead = 0.35
    const strong = 0.5

    const north = y > dead
    const south = y < -dead
    const east = x > dead
    const west = x < -dead

    const nStrong = y > strong
    const sStrong = y < -strong
    const eStrong = x > strong
    const wStrong = x < -strong

    this.setFromJoystick(Direction.NORTH, nStrong || (north && !south))
    this.setFromJoystick(Direction.SOUTH, sStrong || (south && !north))
    this.setFromJoystick(Direction.EAST, eStrong || (east && !west))
    this.setFromJoystick(Direction.WEST, wStrong || (west && !east))

    if (!north && !south && !east && !west) this.clearJoystick()
  }

  private mapKey(code: string): Direction | null {
    if (code === 'KeyW' || code === 'ArrowUp') return Direction.NORTH
    if (code === 'KeyD' || code === 'ArrowRight') return Direction.EAST
    if (code === 'KeyS' || code === 'ArrowDown') return Direction.SOUTH
    if (code === 'KeyA' || code === 'ArrowLeft') return Direction.WEST
    return null
  }

  private emit() {
    const payload: InputState = { pressed: { ...this.pressed } }
    this.player.game?.gameService?.gameSocket?.emit('player:input', payload)
  }
}
