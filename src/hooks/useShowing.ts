import { useState } from "react";
import { useOnClickOutside } from "./useOnClickOutside";

export const useShowing = (initialMode: boolean = false) => {
  const [isShowing, setIsShowing] = useState<boolean>(initialMode);
  const [innerRef, setInnerRef] = useState<HTMLElement | null>(null);

  const toggle = (event: any) => {
    event && event.stopPropagation();

    setIsShowing(!isShowing);
  };

  const useRef = (ref: HTMLElement | null) => setInnerRef(ref);

  useOnClickOutside(isShowing, toggle, innerRef as HTMLElement);

  return [isShowing, toggle, useRef];
};
