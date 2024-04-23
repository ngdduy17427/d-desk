import useScreenDetector from "hooks/useScreenDetector";
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
  ) : null;
};

BtnMobileMenu.displayName = "Button Mobile Menu";

export default memo(BtnMobileMenu);
