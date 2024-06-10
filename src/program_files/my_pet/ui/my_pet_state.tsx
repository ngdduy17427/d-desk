import classNames from "classnames";
import DImage from "components/d_image";
import { useState } from "react";
import { SpriteActionState } from "../@type";

const MyPetState = (): JSX.Element => {
  const [playerActionState, setPlayerActionState] = useState<SpriteActionState>(
    SpriteActionState.MOVING
  );

  const handlePlayerState = (state: SpriteActionState): void => {
    setPlayerActionState(state);
  };

  return (
    <div className="my-pet-state-container">
      <DImage
        id="my-pet-state-idle"
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/cat_state_idle.png`}
        alt="Cat State Idle"
        className={classNames({ active: playerActionState === SpriteActionState.IDLE })}
        onClick={() => handlePlayerState(SpriteActionState.IDLE)}
      />
      <DImage
        id="my-pet-state-move"
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/cat_state_move.png`}
        alt="Cat State Move"
        className={classNames({ active: playerActionState === SpriteActionState.MOVING })}
        onClick={() => handlePlayerState(SpriteActionState.MOVING)}
      />
      <DImage
        id="my-pet-state-sleep"
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/cat_state_sleep.png`}
        alt="Cat State Sleep"
        className={classNames({ active: playerActionState === SpriteActionState.SLEEP })}
        onClick={() => handlePlayerState(SpriteActionState.SLEEP)}
      />
    </div>
  );
};

export default MyPetState;
