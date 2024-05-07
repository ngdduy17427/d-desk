import { SpriteImageSrc, SpriteType } from "../@type";
import { FoodSpriteType } from "../sprites/food_sprite";
import { PetSpriteType } from "../sprites/pet_sprite";

export type GameAssetMap = Map<SpriteType, HTMLImageElement>;

interface GameAssetObject {
  name: SpriteType;
  src: SpriteImageSrc;
}

export class GameAsset {
  assets: GameAssetMap | undefined = new Map();

  private promiseAssetArray: Array<Promise<void>> = [];
  private assetArray: Array<GameAssetObject> = [
    { name: PetSpriteType, src: `${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/cat.png` },
    { name: FoodSpriteType, src: `${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/fruits.png` },
  ];

  constructor() {
    this.promiseAssetArray = this.assetArray.map(
      (asset): Promise<void> =>
        new Promise((resolve): void => {
          const image = new Image();
          image.onload = (): void => {
            this.assets?.set(asset.name, image);
            resolve();
          };
          image.src = asset.src;
        })
    );
  }

  async init(): Promise<void> {
    await Promise.all(this.promiseAssetArray);
  }
  destroy(): void {
    this.assets = undefined;
  }

  get(key: string): HTMLImageElement {
    return <HTMLImageElement>this.assets?.get(key);
  }
}
