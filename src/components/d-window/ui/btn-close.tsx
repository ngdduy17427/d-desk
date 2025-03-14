import { TAppDispatch } from "@type";
import { AppActionType } from "store/actions";
import { withContext } from "store/context";
import { MdClose } from "react-icons/md";

interface IBtnCloseProps {
  appDispatch: TAppDispatch;
  windowId: string;
}

const BtnClose = ({ appDispatch, windowId }: IBtnCloseProps): JSX.Element => {
  return (
    <button
      type="button"
      className="window-nav-item"
      onClick={(): void => appDispatch(AppActionType.CLOSE_WINDOW, { programFileId: windowId })}
    >
      <MdClose />
    </button>
  );
};

export default withContext(BtnClose);
