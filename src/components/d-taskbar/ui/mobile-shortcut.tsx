import useScreenDetector from "hooks/use-sreen-detector";
import { IProgramFile } from "program-files";
import { ForwardedRef, forwardRef, memo } from "react";
import { programFiles } from "..";

interface IMobileShortcutProps {
  handleOpenWindow: (programFile: IProgramFile) => void;
}

const MobileShortcut = forwardRef(
  (
    { handleOpenWindow }: IMobileShortcutProps,
    ref: ForwardedRef<HTMLUListElement>
  ): JSX.Element => {
    const { isMobile, isTablet } = useScreenDetector();

    return isMobile || isTablet ? (
      <ul ref={ref} className="mobile-shortcut">
        {programFiles.map(
          (programFile): JSX.Element => (
            <li key={programFile.id} onClick={(): void => handleOpenWindow(programFile)}>
              {programFile.name}
            </li>
          )
        )}
      </ul>
    ) : (
      <></>
    );
  }
);

MobileShortcut.displayName = "Mobile Shortcut";

export default memo(MobileShortcut);
