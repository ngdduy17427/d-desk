import useScreenDetector from "hooks/use-sreen-detector";
import { IProgramFile } from "program-files";
import { memo } from "react";
import { programFiles } from "..";

interface IDesktopShortcutProps {
  handleOpenWindow: (programFile: IProgramFile) => void;
}

const DesktopShortcut = ({ handleOpenWindow }: IDesktopShortcutProps): JSX.Element => {
  const { isDesktop } = useScreenDetector();

  return isDesktop ? (
    <ul className="desktop-shortcut">
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
};

export default memo(DesktopShortcut);
