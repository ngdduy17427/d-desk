import Link from 'next/link'
import { ProgramFile } from 'program-files'
import { AboutMeProgram } from 'program-files/about-me'
import { ContactProgram } from 'program-files/contact'
import { ProjectsProgram } from 'program-files/projects'
import { SettingsProgram } from 'program-files/settings'
import { SkillsProgram } from 'program-files/skills'
import { TaskManagerProgram } from 'program-files/task-manager'
import { useRef } from 'react'
import { useStore } from 'store'
import { WCDTaskbar } from 'web-components'
import './css.css'
import { BtnFullscreen } from './ui/btn-fullscreen'
import { BtnMobileMenu } from './ui/btn-mobile-menu'
import { DesktopShortcut } from './ui/desktop-shortcut'
import { MobileShortcut } from './ui/mobile-shortcut'

export const programFiles = [
  AboutMeProgram,
  ProjectsProgram,
  SkillsProgram,
  ContactProgram,
  TaskManagerProgram,
  SettingsProgram,
]

export const DTaskbar = () => {
  const appProcesses = useStore((store) => store.appStore.appProcesses)
  const runProgram = useStore((store) => store.appStore.runProgram)
  const normalWindow = useStore((store) => store.appStore.normalWindow)

  const mobileShortcutRef = useRef<HTMLUListElement>(null)

  const handleToggleMobileMenu = () => {
    if (mobileShortcutRef.current?.classList.contains('show'))
      mobileShortcutRef.current.classList.remove('show')
    else {
      mobileShortcutRef.current?.classList.add('show')
    }
  }

  const handleOpenWindow = (programFile: ProgramFile) => {
    if (appProcesses.has(programFile.id)) {
      normalWindow(programFile.id)
    } else {
      runProgram(programFile)
    }
    handleToggleMobileMenu()
  }

  return (
    <WCDTaskbar>
      <Link
        href={String(process.env.NEXT_PUBLIC_BASE_URL)}
        className='title-name'
      >
        D-Desk
      </Link>
      <DesktopShortcut handleOpenWindow={handleOpenWindow} />
      <MobileShortcut
        ref={mobileShortcutRef}
        handleOpenWindow={handleOpenWindow}
      />
      <BtnMobileMenu handleToggleMobileMenu={handleToggleMobileMenu} />
      <BtnFullscreen />
    </WCDTaskbar>
  )
}
