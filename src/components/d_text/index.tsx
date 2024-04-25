import useTypingEffect, { TTexts } from "hooks/useTypingEffect";
import { memo, useEffect, useRef } from "react";
import { WCDText } from "web_components";
import "./css.css";

interface ITextTypingProps {
  texts: TTexts;
  className?: string;
  speed?: number;
  onFinish?: (isFinish: boolean) => void;
}

const DText = ({ texts, className, speed, onFinish }: ITextTypingProps): JSX.Element => {
  const textRef = useRef<HTMLElement>(null);
  const { isFinish } = useTypingEffect(textRef, texts, speed);

  useEffect((): void => {
    if (isFinish) onFinish?.(isFinish);
  }, [onFinish, isFinish]);

  return <WCDText ref={textRef} className={className} />;
};

export default memo(DText);
