import { useScreenDetector } from 'hooks/use-sreen-detector'
import { ProgramFile } from 'program-files'
import { memo } from 'react'
import { programFiles } from '..'

type DesktopShortcutProps = {
  handleOpenWindow: (programFile: ProgramFile) => void
}

const DesktopShortcutComp = ({ handleOpenWindow }: DesktopShortcutProps) => {
  const { isDesktop } = useScreenDetector()

  return isDesktop ? (
    <ul className='desktop-shortcut'>
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

export const DesktopShortcut = memo(DesktopShortcutComp)
