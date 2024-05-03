import { EDWindowSizing } from "components/d_window";
import { memo, useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { WCDIcon } from "web_components";
import "./css.css";

interface IDIconProps {
  children: React.ReactNode;
  className?: string;
  windowSizing?: EDWindowSizing;
}

const DIcon = ({ children, className, windowSizing }: IDIconProps): JSX.Element => {
  const iconRef = useRef<HTMLElement>(null);

  const isDisabled = useMemo(
    (): boolean => windowSizing === EDWindowSizing.MINIMIZE,
    [windowSizing]
  );

  const onMove = useCallback((x: number, y: number): void => {
    requestAnimationFrame((): void => {
      if (!iconRef.current) return;

      const box = iconRef.current.getBoundingClientRect();
      const calcY = (x - box?.x - box?.width / 2) / 15;
      const calcX = -(y - box?.y - box?.height / 2) / 15;

      iconRef.current.style.transform = `perspective(${iconRef.current.offsetWidth}px) rotateX(${calcX}deg) rotateY(${calcY}deg)`;
    });
  }, []);

  const onMouseMove = useCallback(
    (event: MouseEvent): void => {
      if (isDisabled) return;
      onMove(event.pageX, event.pageY);
    },
    [isDisabled, onMove]
  );

  const onTouchMove = useCallback(
    (event: TouchEvent): void => {
      if (isDisabled) return;
      onMove(event.targetTouches[0].pageX, event.targetTouches[0].pageY);
    },
    [isDisabled, onMove]
  );

  useLayoutEffect((): (() => void) => {
    addEventListener("mousemove", onMouseMove);
    addEventListener("touchmove", onTouchMove);
    return (): void => {
      removeEventListener("mousemove", onMouseMove);
      removeEventListener("touchmove", onTouchMove);
    };
  }, [onMouseMove, onTouchMove]);

  return (
    <WCDIcon ref={iconRef} className={className}>
      {children}
    </WCDIcon>
  );
};

export default memo(DIcon);
