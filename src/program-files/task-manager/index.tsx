import { DContainer } from 'components/d-container'
import { ProgramFile, createProgramFile } from 'program-files'
import { useEffect, useState } from 'react'
import { useStore } from 'store'
import './css.css'
import { AppTask } from './ui/app-task'

const UI = () => {
  const appProcesses = useStore((store) => Array.from(store.appStore.appProcesses.values()))

  const [clientIP, setClientIP] = useState<string | undefined>(undefined)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getClientIP`, {
      method: 'GET',
      cache: 'force-cache',
    })
      .then((response) => response.json())
      .then((response) => setClientIP(response.clientIP))
  }, [])

  return (
    <DContainer className='task-manager-container'>
      {appProcesses.map((appInProcess: ProgramFile) => (
        <AppTask
          key={appInProcess.id}
          appInProcess={appInProcess}
          clientIP={String(clientIP)}
        />
      ))}
    </DContainer>
  )
}

export const TaskManagerProgram = createProgramFile({
  name: 'Task Manager',
  component: UI,
  windowState: {
    width: 400,
    height: 500,
  },
})
