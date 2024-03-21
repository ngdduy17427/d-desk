import { MySprite } from "./sprite";
import { Game } from "./utils/GameLoop";

export class MyGame implements Game {
  fps = 0;

  private myEntity: MySprite | undefined = undefined;

  startup(entity: MySprite) {
    this.myEntity = entity;
  }

  load() {
    return;
  }
  init() {
    if (this.myEntity) this.myEntity.init();
  }
  update(delta: number, now: number, last: number) {
    if (this.myEntity) this.myEntity.update(delta, now, last);
  }
  draw() {
    return;
  }
}
