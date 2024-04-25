import React from "react";

export const useOnClickOutside = <T extends HTMLElement>(
  refs: T[],
  handler: (event: MouseEvent | TouchEvent) => void
): void => {
  React.useLayoutEffect((): (() => void) => {
    const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
      let isContain = false;
      const listSize = refs.length;

      for (let i = 0; i < listSize; i++)
        if ((refs[i] as T)?.contains(event.target as Node)) isContain = true;

      if (!isContain) handler(event);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [refs, handler]);
};
