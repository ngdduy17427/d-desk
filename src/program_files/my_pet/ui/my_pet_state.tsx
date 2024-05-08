import DImage from "components/d_image";
import { useState } from "react";
import { GameService } from "../game/game_service";
import { PlayerState } from "../sprites/player_sprite";
import classNames from "classnames";

interface IMyPetStateProps {
  gameService: GameService;
}

const MyPetState = ({ gameService }: IMyPetStateProps): JSX.Element => {
  const [playerState, setPlayerState] = useState<PlayerState>(PlayerState.MOVE);

  const handlePlayerState = (state: PlayerState): void => {
    setPlayerState(state);
    gameService.game.player?.setPlayerState(state);
  };

  return (
    <div className="my-pet-state-container">
      <DImage
        id="my-pet-state-idle"
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/cat_state_idle.png`}
        alt="Cat State Idle"
        className={classNames({ active: playerState === PlayerState.IDLE })}
        onClick={() => handlePlayerState(PlayerState.IDLE)}
      />
      <DImage
        id="my-pet-state-move"
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/cat_state_move.png`}
        alt="Cat State Move"
        className={classNames({ active: playerState === PlayerState.MOVE })}
        onClick={() => handlePlayerState(PlayerState.MOVE)}
      />
      <DImage
        id="my-pet-state-sleep"
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/cat_state_sleep.png`}
        alt="Cat State Sleep"
        className={classNames({ active: playerState === PlayerState.SLEEP })}
        onClick={() => handlePlayerState(PlayerState.SLEEP)}
      />
    </div>
  );
};

export default MyPetState;
