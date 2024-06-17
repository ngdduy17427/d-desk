import { EntityId } from "../@type";
import { Game } from "../game/game";
import { GameEntity } from "../game/game_entity";

export class CarrotEntity extends GameEntity {
  private stepOnTimeout: NodeJS.Timeout | undefined;

  constructor(game: Game, id: EntityId, x: number, y: number) {
    super(game, id, 32, 32, { x, y }, { width: 1, height: 1 }, 0, {
      IDLE: [[9, 6]],
    });
  }

  update(delta: number): void {
    super.update(delta);

    if (
      Math.floor(Number(this.game?.player?.position.x)) === Math.floor(this.position.x) &&
      Math.floor(Number(this.game?.player?.position.y)) === Math.floor(this.position.y)
    ) {
      clearTimeout(this.stepOnTimeout);
      this.animation.spriteSheet = { IDLE: [[8, 6]] };
      this.animation.spriteSheetState = [[8, 6]];

      this.stepOnTimeout = setTimeout(() => {
        clearTimeout(this.stepOnTimeout);
        this.animation.spriteSheet = { IDLE: [[9, 6]] };
        this.animation.spriteSheetState = [[9, 6]];
      }, 2000);
    }
  }
}
