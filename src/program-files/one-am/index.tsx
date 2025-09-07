import { DContainer } from 'components/d-container'
import { ProgramFile, createProgramFile } from 'program-files'
import { useEffect, useState } from 'react'
import './css.css'
import { OneAMUI } from './ui/one-am-ui'

const UI = (props: ProgramFile) => {
  const [playersOnline, setPlayersOnline] = useState<number | undefined>(undefined)

  useEffect((): void => {
    fetch(`${process.env.NEXT_PUBLIC_DUHI_HOME_SERVER_URL}/api/one-am/get-all-players-online`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => setPlayersOnline(response.data ?? undefined))
  }, [])

  return (
    <DContainer className='one-am-container'>
      <OneAMUI
        windowApp={props}
        playersOnline={playersOnline}
      />
    </DContainer>
  )
}

export const OneAMProgram = createProgramFile({
  name: '1AM',
  component: UI,
  windowState: {
    width: 1024,
    height: 768,
    isCenter: true,
  },
})
