import { AppActionType } from "app/app_action";
import { useAppContext } from "app/app_context";
import { RefObject } from "react";
import { MdWebAsset, MdWebAssetOff } from "react-icons/md";
import { IWindowsSize } from ".";

const BtnMaximize = ({
  windowsRef,
  windowsSize,
  setWindowsSize,
}: {
  windowsRef: RefObject<HTMLDivElement>;
  windowsSize: IWindowsSize;
  setWindowsSize: React.Dispatch<React.SetStateAction<IWindowsSize>>;
}) => {
  const { appDispatch } = useAppContext();

  const handleMaximizeWindow = () => {
    if (windowsSize === IWindowsSize.MAXIMIZE) setWindowsSize(IWindowsSize.NORMAL);
    else setWindowsSize(IWindowsSize.MAXIMIZE);

    appDispatch(AppActionType.REMOVE_FROM_PROCESS_MINIMIZE, windowsRef.current?.id);
  };

  return (
    <span className="windows-nav-item" onClick={handleMaximizeWindow}>
      {windowsSize === IWindowsSize.MAXIMIZE ? <MdWebAssetOff /> : <MdWebAsset />}
    </span>
  );
};

export default BtnMaximize;
