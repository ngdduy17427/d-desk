import { AppActionType } from "app/app_action";
import { useAppContext } from "app/app_context";
import { RefObject } from "react";
import { MdMinimize, MdOpenInNew } from "react-icons/md";
import { IWindowsSize } from ".";

const BtnMinimize = ({
  windowsRef,
  windowsSize,
  setWindowsSize,
}: {
  windowsRef: RefObject<HTMLDivElement>;
  windowsSize: IWindowsSize;
  setWindowsSize: React.Dispatch<React.SetStateAction<IWindowsSize>>;
}) => {
  const { appDispatch } = useAppContext();

  const handleMinimizeWindow = () => {
    if (windowsSize === IWindowsSize.MINIMIZE) {
      setWindowsSize(IWindowsSize.NORMAL);
      appDispatch(AppActionType.REMOVE_FROM_PROCESS_MINIMIZE, windowsRef.current?.id);
    } else {
      setWindowsSize(IWindowsSize.MINIMIZE);
      appDispatch(AppActionType.MINIMIZE_WINDOWS, windowsRef.current?.id);
    }
  };

  return (
    <span className="windows-nav-item" onClick={handleMinimizeWindow}>
      {windowsSize === IWindowsSize.MINIMIZE ? <MdOpenInNew /> : <MdMinimize />}
    </span>
  );
};

export default BtnMinimize;
