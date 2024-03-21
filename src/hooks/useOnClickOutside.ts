import { useEffect } from "react";

export const useOnClickOutside = (
  isShowing: boolean,
  handler: (event: MouseEvent | TouchEvent) => void,
  ref: HTMLElement
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref || ref.contains(event.target as Node)) return;

      handler(event);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isShowing, handler, ref]);
};
