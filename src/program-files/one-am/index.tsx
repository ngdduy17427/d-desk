import { DContainer } from 'components/d-container'
import { EDWindowSizing } from 'components/d-window'
import { ProgramFile, createProgramFile } from 'program-files'
import { useState } from 'react'
import './css.css'
import { OneAMUI } from './ui/one-am-ui'

const UI = (props: ProgramFile) => {
  const [playersOnline] = useState<number | undefined>(undefined)

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
  name: '1AM 🌕',
  component: UI,
  windowState: {
    width: 1024,
    height: 616,
    sizing: EDWindowSizing.MAXIMIZE,
    isCenter: true,
  },
})
