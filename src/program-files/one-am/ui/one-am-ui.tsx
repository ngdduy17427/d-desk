import { ProgramFile } from 'program-files'
import { FormEvent, memo, useState } from 'react'
import { PlayerSettings } from '../@type'
import { OneAMGame } from './one-am-game'
import { OneAMGUI } from './one-am-gui'

type OneAMUIProps = {
  windowApp: ProgramFile
  playersOnline: number | undefined
}

export const OneAMUIComp = ({ windowApp, playersOnline }: OneAMUIProps) => {
  const [isLogin, setIsLogin] = useState(false)
  const [playerSettings, setPlayerSettings] = useState<PlayerSettings>({
    playerName: '',
  })

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (playerSettings.playerName !== '') setIsLogin(true)
  }

  return isLogin ? (
    <OneAMGame
      windowApp={windowApp}
      playerSettings={playerSettings}
    />
  ) : (
    <OneAMGUI
      playersOnline={playersOnline}
      playerSettings={playerSettings}
      setPlayerSettings={setPlayerSettings}
      onSubmit={onSubmit}
    />
  )
}

export const OneAMUI = memo(OneAMUIComp)
