import { useScreenDetector } from 'hooks/use-sreen-detector'
import { ProgramFile } from 'program-files'
import { ForwardedRef, memo } from 'react'
import { programFiles } from '..'

type MobileShortcutProps = {
  ref: ForwardedRef<HTMLUListElement>
  handleOpenWindow: (programFile: ProgramFile) => void
}

const MobileShortcutComp = ({ ref, handleOpenWindow }: MobileShortcutProps) => {
  const { isMobile, isTablet } = useScreenDetector()

  return isMobile || isTablet ? (
    <ul
      ref={ref}
      className='mobile-shortcut'
    >
      {programFiles.map((programFile) => (
        <li
          key={programFile.id}
          onClick={() => handleOpenWindow(programFile)}
        >
          {programFile.name}
        </li>
      ))}
    </ul>
  ) : (
    <></>
  )
}

export const MobileShortcut = memo(MobileShortcutComp)
