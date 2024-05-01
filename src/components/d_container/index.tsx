import { memo } from "react";
import { WCDContainer } from "web_components";
import "./css.css";

interface IDContainerProps {
  children?: React.ReactNode;
  id?: string;
  className: string;
}

const DContainer = ({ children, id, className }: IDContainerProps): JSX.Element => {
  return (
    <WCDContainer id={id} className={className}>
      {children}
    </WCDContainer>
  );
};

export default memo(DContainer);
