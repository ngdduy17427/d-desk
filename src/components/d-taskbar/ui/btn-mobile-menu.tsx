import useScreenDetector from "hooks/use-sreen-detector";
import { memo } from "react";
import { MdMenu } from "react-icons/md";

interface IBtnMobileMenuProps {
  handleToggleMobileMenu: () => void;
}

const BtnMobileMenu = ({ handleToggleMobileMenu }: IBtnMobileMenuProps): JSX.Element => {
  const { isMobile, isTablet } = useScreenDetector();

  return isMobile || isTablet ? (
    <button type="button" className="btn-mobile-menu" onClick={handleToggleMobileMenu}>
      <MdMenu />
    </button>
  ) : (
    <></>
  );
};

BtnMobileMenu.displayName = "Button Mobile Menu";

export default memo(BtnMobileMenu);
