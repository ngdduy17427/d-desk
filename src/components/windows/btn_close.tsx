import { AppActionType } from "app/app_action";
import { useAppContext } from "app/app_context";
import { RefObject } from "react";
import { MdClose } from "react-icons/md";

const BtnClose = ({ windowsRef }: { windowsRef: RefObject<HTMLDivElement> }) => {
  const { appDispatch } = useAppContext();

  return (
    <span
      className="windows-nav-item"
      onClick={() => appDispatch(AppActionType.CLOSE_WINDOWS, windowsRef.current?.id)}
    >
      <MdClose />
    </span>
  );
};

export default BtnClose;
