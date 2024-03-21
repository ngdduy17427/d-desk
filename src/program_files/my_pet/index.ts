import React from "react";
import ReactDom from "react-dom";
import { AssetAvatars } from "./assets/AssetAvatars";
import { GameService } from "./game/service";
import { repeat } from "./game/utils/GameUtils";
import { SpriteSheet } from "./game/utils/Interface";

const MyPet = () => {
  const MyPetId = "my-pet";

  React.useEffect(() => {
    const MyPetGameService = new GameService();
    const MyPetSpriteSheet: SpriteSheet = {
      IDLE: [...repeat(2, [3, 0], [2, 0], [1, 0])],
      NORTH: [...repeat(2, [3, 2], [2, 2], [1, 2])],
      EAST: [...repeat(2, [1, 3], [2, 3], [3, 3])],
      SOUTH: [...repeat(2, [3, 0], [2, 0], [1, 0])],
      WEST: [...repeat(2, [1, 1], [2, 1], [3, 1])],
    };

    MyPetGameService.join(
      document.getElementById(MyPetId) as HTMLDivElement,
      32,
      32,
      160,
      AssetAvatars.PurpleBat,
      MyPetSpriteSheet
    );
  }, []);

  return ReactDom.createPortal(
    React.createElement("div", { id: MyPetId }),
    document.getElementsByTagName("body")[0]
  );
};

export default MyPet;
