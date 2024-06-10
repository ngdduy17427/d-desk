import { SpriteType } from "../@type";
import { PetSpriteType } from "../sprites/pet_sprite";
import { MapSpriteType } from "./game_map";

export type GameAssetMap = Map<SpriteType, HTMLImageElement>;

interface GameAssetObject {
  name: SpriteType;
  src: string;
}

export class GameAsset {
  assets: GameAssetMap = new Map();

  private assetPromiseArray: Array<Promise<void>> = [];
  private assetArray: Array<GameAssetObject> = [
    {
      name: MapSpriteType,
      src: `${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/map_assets.png`,
    },
    { name: PetSpriteType, src: `${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/cat.png` },
  ];

  constructor() {
    this.assetArray.forEach((asset): number =>
      this.assetPromiseArray.push(
        new Promise((resolve): void => {
          const image = new Image();
          image.onload = (): void => {
            this.assets?.set(asset.name, image);
            resolve();
          };
          image.src = asset.src;
        })
      )
    );
  }

  init(): Promise<Array<void>> {
    return Promise.all(this.assetPromiseArray);
  }

  get(key: string): HTMLImageElement {
    return <HTMLImageElement>this.assets?.get(key);
  }
}
