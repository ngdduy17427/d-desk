import { EDWindowSizing } from "components/d_window";
import { memo, useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { WCDIcon } from "web_components";

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

  const onMouseMove = useCallback(
    (event: MouseEvent): void => {
      if (isDisabled) return;

      window.requestAnimationFrame((): void => {
        const box = (iconRef.current as HTMLElement)?.getBoundingClientRect();
        const calcY = (event.pageX - box?.x - box.width / 2) / 15;
        const calcX = -(event.pageY - box?.y - box.height / 2) / 15;

        (iconRef.current as HTMLElement).style.transform =
          `perspective(${iconRef.current?.offsetWidth}px) rotateX(${calcX}deg) rotateY(${calcY}deg)`;
      });
    },
    [isDisabled]
  );

  useLayoutEffect((): (() => void) => {
    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <WCDIcon ref={iconRef} className={className}>
      {children}
    </WCDIcon>
  );
};

export default memo(DIcon);
