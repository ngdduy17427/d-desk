import { useScreenDetector } from 'hooks/use-sreen-detector'
import { memo } from 'react'
import { MdMenu } from 'react-icons/md'

type BtnMobileMenuProps = {
  handleToggleMobileMenu: () => void
}

const BtnMobileMenuComp = ({ handleToggleMobileMenu }: BtnMobileMenuProps) => {
  const { isMobile, isTablet } = useScreenDetector()

  return isMobile || isTablet ? (
    <button
      type='button'
      className='btn-mobile-menu'
      onClick={handleToggleMobileMenu}
    >
      <MdMenu />
    </button>
  ) : (
    <></>
  )
}

export const BtnMobileMenu = memo(BtnMobileMenuComp)
