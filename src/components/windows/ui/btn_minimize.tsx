import { AppActionType } from "context/actions";
import { useAppContext } from "context/context";
import { MdMinimize, MdOpenInNew } from "react-icons/md";
import { IWindowsSize } from "..";

const BtnMinimize = ({
  windowsId,
  windowsSize,
  setWindowsSize,
}: {
  windowsId: string;
  windowsSize: IWindowsSize;
  setWindowsSize: React.Dispatch<React.SetStateAction<IWindowsSize>>;
}) => {
  const { appDispatch } = useAppContext();

  const handleMinimizeWindow = () => {
    if (windowsSize === IWindowsSize.MINIMIZE) {
      setWindowsSize(IWindowsSize.NORMAL);
      appDispatch(AppActionType.REMOVE_FROM_PROCESS_MINIMIZE, { programFileId: windowsId });
    } else {
      setWindowsSize(IWindowsSize.MINIMIZE);
      appDispatch(AppActionType.MINIMIZE_WINDOWS, { programFileId: windowsId });
    }
  };

  return (
    <span className="windows-nav-item" onClick={handleMinimizeWindow}>
      {windowsSize === IWindowsSize.MINIMIZE ? <MdOpenInNew /> : <MdMinimize />}
    </span>
  );
};

export default BtnMinimize;
