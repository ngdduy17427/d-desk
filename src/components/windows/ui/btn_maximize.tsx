import { TAppDispatch } from "@type";
import { AppActionType } from "context/actions";
import { withContext } from "context/context";
import { MdWebAsset, MdWebAssetOff } from "react-icons/md";
import { IWindowsSize } from "..";

const BtnMaximize = ({
  windowsId,
  windowsSize,
  setWindowsSize,
  appDispatch,
}: {
  windowsId: string;
  windowsSize: IWindowsSize;
  setWindowsSize: React.Dispatch<React.SetStateAction<IWindowsSize>>;
  appDispatch: TAppDispatch;
}) => {
  const handleMaximizeWindow = () => {
    if (windowsSize === IWindowsSize.MAXIMIZE) setWindowsSize(IWindowsSize.NORMAL);
    else setWindowsSize(IWindowsSize.MAXIMIZE);

    appDispatch(AppActionType.REMOVE_FROM_PROCESS_MINIMIZE, { programFileId: windowsId });
  };

  return (
    <span className="windows-nav-item" onClick={handleMaximizeWindow}>
      {windowsSize === IWindowsSize.MAXIMIZE ? <MdWebAssetOff /> : <MdWebAsset />}
    </span>
  );
};

export default withContext(BtnMaximize);
