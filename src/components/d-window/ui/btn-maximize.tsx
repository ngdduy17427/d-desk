import { TAppDispatch } from "@type";
import { AppActionType } from "store/actions";
import { withContext } from "store/context";
import { IProgramFile } from "program-files";
import { MdWebAsset, MdWebAssetOff } from "react-icons/md";
import { EDWindowSizing } from "..";

interface IBtnMaximizeProps {
  windowApp: IProgramFile;
  appDispatch: TAppDispatch;
}

const BtnMaximize = ({ windowApp, appDispatch }: IBtnMaximizeProps): JSX.Element => {
  const { windowState } = windowApp;

  const handleMaximizeWindow = (): void => {
    if (windowState?.sizing === EDWindowSizing.MAXIMIZE)
      appDispatch(AppActionType.NORMAL_WINDOW, { programFileId: windowApp.id });
    else {
      appDispatch(AppActionType.MAXIMIZE_WINDOW, { programFileId: windowApp.id });
    }
  };

  return (
    <button type="button" className="window-nav-item" onClick={handleMaximizeWindow}>
      {windowState?.sizing === EDWindowSizing.MAXIMIZE ? <MdWebAssetOff /> : <MdWebAsset />}
    </button>
  );
};

export default withContext(BtnMaximize);
