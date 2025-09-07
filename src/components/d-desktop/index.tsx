import { DWindow } from 'components/d-window'
import { ProgramFile } from 'program-files'
import { AboutMeProgram } from 'program-files/about-me'
import { useEffect, useRef } from 'react'
import { useStore } from 'store'
import { WCDDesktop } from 'web-components'
import './css.css'

export const DDesktop = () => {
  const runProgram = useStore((store) => store.appStore.runProgram)
  const appSettings = useStore((store) => store.appStore.appSettings)
  const appProcesses = useStore((store) => Array.from(store.appStore.appProcesses.values()))

  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => runProgram(AboutMeProgram), [runProgram])

  return (
    <WCDDesktop
      ref={containerRef}
      style={{
        backgroundImage: `url(${appSettings.appBackground?.image})`,
      }}
    >
      {appProcesses.map((appInProcess: ProgramFile) => (
        <DWindow
          key={appInProcess.id}
          windowApp={appInProcess}
          container={containerRef.current as HTMLElement}
        />
      ))}
    </WCDDesktop>
  )
}
