import { MdClose } from "react-icons/md";

const BtnClose = ({ onClick }: { onClick: () => void }) => {
  return (
    <span className="windows-nav-item" onClick={onClick}>
      <MdClose />
    </span>
  );
};

export default BtnClose;
