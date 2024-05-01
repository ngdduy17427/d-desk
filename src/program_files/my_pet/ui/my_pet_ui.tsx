import DContainer from "components/d_container";
import { useCallback, useEffect, useRef } from "react";
import { randomNumber, repeat } from "utils/utils_helper";
import { GameEntity } from "../game/game_entity";
import { GameService } from "../game/game_service";
import { FoodSprite } from "../sprites/food_sprite";
import { PetSprite } from "../sprites/pet_sprite";
import MyPetGUI from "./my_pet_gui";

const MyPetUI = (): JSX.Element => {
  const gameServiceRef = useRef<GameService>(new GameService());

  const onAddGameEntity = (gameEntity: GameEntity): void => {
    gameServiceRef.current.game.addEntity(gameEntity);
  };

  const onAddFood = useCallback((event: MouseEvent): void => {
    if (event.button !== 0) return;

    onAddGameEntity(
      new FoodSprite(
        16,
        16,
        32,
        32,
        { x: event.clientX, y: event.clientY },
        `${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/fruits.png`,
        { IDLE: [[randomNumber(0, 3), randomNumber(0, 3)]] }
      )
    );
  }, []);

  useEffect((): void => {
    onAddGameEntity(
      new PetSprite(32, 32, 64, 64, `${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/cat.png`, {
        IDLE: [...repeat(2, [4, 4], [5, 4])],
        NORTH: [...repeat(3, [4, 1], [6, 1], [5, 1])],
        EAST: [...repeat(3, [4, 0], [6, 0], [5, 0])],
        SOUTH: [...repeat(3, [4, 2], [6, 2], [5, 2])],
        WEST: [...repeat(3, [4, 3], [6, 3], [5, 3])],
      })
    );
  }, []);

  useEffect((): (() => void) => {
    document.addEventListener("mousedown", onAddFood);
    return (): void => document.removeEventListener("mousedown", onAddFood);
  }, [onAddFood]);

  useEffect((): (() => void) => {
    const gameService = gameServiceRef.current;
    return (): void => gameService.destroy();
  }, []);

  return (
    <DContainer className="my-pet-container">
      <MyPetGUI gameService={gameServiceRef.current} />
    </DContainer>
  );
};

export default MyPetUI;
