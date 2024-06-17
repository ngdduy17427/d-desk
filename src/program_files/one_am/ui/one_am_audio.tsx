import { useEffect, useRef } from "react";

const OneAMAudio = (): JSX.Element => {
  const gameAudioRef = useRef<HTMLAudioElement>(null);

  useEffect((): void => {
    if (gameAudioRef.current) gameAudioRef.current.volume = 0.5;
  }, []);

  return (
    <audio ref={gameAudioRef} autoPlay loop>
      <source src={`${process.env.NEXT_PUBLIC_BASE_URL}/sounds/8bit_1am.mp3`} type="audio/mpeg" />
    </audio>
  );
};

export default OneAMAudio;
