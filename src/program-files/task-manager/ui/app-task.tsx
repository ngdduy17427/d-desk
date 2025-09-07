import { EDWindowSizing } from 'components/d-window'
import { ProgramFile } from 'program-files'
import { useEffect, useState } from 'react'
import { MdArrowRight } from 'react-icons/md'
import { useStore } from 'store'

type AppTaskProps = {
  appInProcess: ProgramFile
  clientIP: string
}

export const AppTask = ({ appInProcess, clientIP }: AppTaskProps) => {
  const closeWindow = useStore((store) => store.appStore.closeWindow)

  const { windowState } = appInProcess
  const [appRuntime, setAppRuntime] = useState('00:00:00')

  useEffect((): (() => void) => {
    const formatHMS = (value: number): number | string =>
      value < 10 ? '0'.concat(String(value)) : value

    const timer = setInterval(() => {
      const currentRuntime = new Date().getTime()
      const distance = currentRuntime - Number(windowState.runtime?.getTime())

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setAppRuntime(`${formatHMS(hours)}:${formatHMS(minutes)}:${formatHMS(seconds)}`)
    }, 1000)

    return () => clearInterval(timer)
  }, [windowState.runtime])

  const handleEndTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    closeWindow(appInProcess.id)
  }

  return (
    <div className='app-task'>
      <div className='app-task-summary'>
        <MdArrowRight className='text-[1.5rem]' />
        <h1 className='app-name'>{appInProcess.name}</h1>
        <p className='runtime'>{appRuntime}</p>
        <button
          type='button'
          className='btn-end-task'
          onClick={handleEndTask}
        >
          End task
        </button>
      </div>
      <div className='app-task-detail'>
        <span>
          ID: <p>{appInProcess.id}</p>
        </span>
        <span>
          Sizing: <p>{EDWindowSizing[windowState.sizing as EDWindowSizing]}</p>
        </span>
        <span>
          User: <p>{clientIP}</p>
        </span>
      </div>
    </div>
  )
}
