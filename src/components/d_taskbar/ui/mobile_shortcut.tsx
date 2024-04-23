import useScreenDetector from "hooks/useScreenDetector";
import { IProgramFile } from "program_files";
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
        {programFiles.map((programFile) => (
          <li key={programFile.id} onClick={() => handleOpenWindow(programFile)}>
            {programFile.name}
          </li>
        ))}
      </ul>
    ) : null;
  }
);

MobileShortcut.displayName = "Mobile Shortcut";

export default memo(MobileShortcut);
