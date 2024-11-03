import { TAppDispatch } from "@type";
import { AppActionType } from "store/actions";
import { withContext } from "store/context";
import { IProgramFile } from "program-files";
import { MdMinimize, MdOpenInNew } from "react-icons/md";
import { EDWindowSizing } from "..";

interface IBtnMinimizeProps {
  windowApp: IProgramFile;
  appDispatch: TAppDispatch;
}

const BtnMinimize = ({ windowApp, appDispatch }: IBtnMinimizeProps): JSX.Element => {
  const { windowState } = windowApp;

  const handleMinimizeWindow = (): void => {
    if (windowState?.sizing === EDWindowSizing.MINIMIZE)
      appDispatch(AppActionType.NORMAL_WINDOW, { programFileId: windowApp.id });
    else {
      appDispatch(AppActionType.MINIMIZE_WINDOW, { programFileId: windowApp.id });
    }
  };

  return (
    <button type="button" className="window-nav-item" onClick={handleMinimizeWindow}>
      {windowState?.sizing === EDWindowSizing.MINIMIZE ? <MdOpenInNew /> : <MdMinimize />}
    </button>
  );
};

export default withContext(BtnMinimize);
