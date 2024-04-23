import { memo } from "react";
import { WCDContainer } from "web_components";
import "./css.css";

interface IDContainerProps {
  children: React.ReactNode;
  className: string;
}

const DContainer = ({ children, className }: IDContainerProps): JSX.Element => {
  return <WCDContainer className={className}>{children}</WCDContainer>;
};

export default memo(DContainer);
