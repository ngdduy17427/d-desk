import { memo, useLayoutEffect, useRef } from "react";

type TTexts = string | string[];

interface ITextTypingProps {
  texts: TTexts;
}

class TypeEffect {
  private element: HTMLElement;
  private index: number = 0;
  private timeoutId: NodeJS.Timeout;

  constructor(element: HTMLElement, texts: TTexts) {
    this.element = element;

    if (typeof texts === "string") this.doTypeEffect(texts);
  }

  doTypeEffect(text: string) {
    if (this.index < text.length) {
      this.element.innerHTML += text.charAt(this.index);
      this.index++;

      this.timeoutId = setTimeout(() => this.doTypeEffect(text), 50);
    }
  }

  public destroy() {
    clearTimeout(this.timeoutId);
  }
}

const TextTyping = ({ texts }: ITextTypingProps): JSX.Element => {
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect((): (() => void) => {
    const typeEffect = new TypeEffect(textRef.current, texts);
    return () => typeEffect.destroy();
  }, [texts]);

  return <p ref={textRef} />;
};

export default memo(TextTyping);
