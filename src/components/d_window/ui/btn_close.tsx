import { TAppDispatch } from "@type";
import { AppActionType } from "context/actions";
import { withContext } from "context/context";
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
      onClick={() =>
        appDispatch(AppActionType.CLOSE_WINDOW, {
          programFileId: windowId,
        })
      }
    >
      <MdClose />
    </button>
  );
};

export default withContext(BtnClose);
