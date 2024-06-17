import { Joystick } from "react-joystick-component";
import { Direction } from "../@type";
import { GameService } from "../game/game_service";

interface IOneAMChatProps {
  gameService: GameService;
}

const OneAMJoystick = ({ gameService }: IOneAMChatProps): JSX.Element => {
  const handleJoystickMove = (x: number, y: number): void => {
    if (x > -0.35 && x < 0.35 && y > 0.5)
      gameService.game?.player?.setPlayerDirection({
        NORTH: true,
        EAST: false,
        SOUTH: false,
        WEST: false,
        lastDirection: Direction.NORTH,
      });
    if (x > 0.35 && y > 0.35)
      gameService.game?.player?.setPlayerDirection({
        NORTH: true,
        EAST: true,
        SOUTH: false,
        WEST: false,
        lastDirection: gameService.game?.player?.directions.lastDirection,
      });
    if (x > 0.5 && y > -0.35 && y < 0.35)
      gameService.game?.player?.setPlayerDirection({
        NORTH: false,
        EAST: true,
        SOUTH: false,
        WEST: false,
        lastDirection: Direction.EAST,
      });
    if (x > 0.35 && y < -0.35)
      gameService.game?.player?.setPlayerDirection({
        NORTH: false,
        EAST: true,
        SOUTH: true,
        WEST: false,
        lastDirection: gameService.game?.player?.directions.lastDirection,
      });
    if (x > -0.35 && x < 0.35 && y < -0.5)
      gameService.game?.player?.setPlayerDirection({
        NORTH: false,
        EAST: false,
        SOUTH: true,
        WEST: false,
        lastDirection: Direction.SOUTH,
      });
    if (x < -0.35 && y < -0.35)
      gameService.game?.player?.setPlayerDirection({
        NORTH: false,
        EAST: false,
        SOUTH: true,
        WEST: true,
        lastDirection: gameService.game?.player?.directions.lastDirection,
      });
    if (x < -0.5 && y > -0.35 && y < 0.35)
      gameService.game?.player?.setPlayerDirection({
        NORTH: false,
        EAST: false,
        SOUTH: false,
        WEST: true,
        lastDirection: Direction.WEST,
      });
    if (x < -0.35 && y > 0.35)
      gameService.game?.player?.setPlayerDirection({
        NORTH: true,
        EAST: false,
        SOUTH: false,
        WEST: true,
        lastDirection: gameService.game?.player?.directions.lastDirection,
      });
  };

  const handleJoystickStop = (): void =>
    gameService.game?.player?.setPlayerDirection({
      NORTH: false,
      EAST: false,
      SOUTH: false,
      WEST: false,
      lastDirection: gameService.game?.player?.directions.lastDirection,
    });

  return (
    <div className="one-am-game-joystick-container">
      <Joystick
        size={75}
        baseColor="#4b4b4b70"
        stickColor="#fcd53f80"
        move={(event) => handleJoystickMove(Number(event.x), Number(event.y))}
        stop={handleJoystickStop}
      />
    </div>
  );
};

export default OneAMJoystick;
