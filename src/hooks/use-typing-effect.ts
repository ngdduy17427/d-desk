import React from "react";

export type TTexts = string | Array<string>;

interface ITypingEffect {
  isFinish: boolean;
}

const useTypingEffect = <T extends HTMLElement>(
  element: T,
  texts: TTexts,
  speed: number = 50
): ITypingEffect => {
  const [isFinishTypeAnimation, setIsFinishTypeAnimation] = React.useState<boolean>(false);
  const [isFinish, setIsFinish] = React.useState<boolean>(false);

  const doTypeAnimation = React.useCallback(
    async (texts: string, parent: HTMLElement): Promise<void> => {
      if (!parent) return;

      setIsFinishTypeAnimation(false);
      let textsLength = texts.length;
      for (const char of texts)
        await new Promise(
          (resolve): NodeJS.Timeout =>
            setTimeout((): void => {
              if (!--textsLength) setIsFinishTypeAnimation(true);
              resolve((parent.innerHTML += char));
            }, speed)
        );
    },
    [speed]
  );

  const doCreateNode = React.useCallback(
    async (texts: string, parent: HTMLElement): Promise<void> => {
      const textsDoc = new DOMParser().parseFromString(texts, "text/html");
      let textsDocLength = textsDoc.body.childNodes.length;

      for await (const childNode of textsDoc.body.childNodes) {
        if (!--textsDocLength) setIsFinish(true);

        const deepElement = <HTMLElement>childNode.cloneNode(true);
        const shallowElement = <HTMLElement>childNode.cloneNode(false);

        if (deepElement.nodeName === "#text") {
          await doTypeAnimation(String(deepElement.nodeValue), parent);
        } else {
          parent?.appendChild(shallowElement);
          await doCreateNode(deepElement.innerHTML, shallowElement);
        }
      }
    },
    [doTypeAnimation]
  );

  const doTypeEffect = React.useCallback(
    (texts: TTexts): void => {
      if (typeof texts === "string") doCreateNode(texts, element);
    },
    [doCreateNode, element]
  );

  React.useEffect((): void => doTypeEffect(texts), [doTypeEffect, texts]);

  return { isFinish: isFinishTypeAnimation && isFinish };
};

export default useTypingEffect;
