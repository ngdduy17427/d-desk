import classNames from 'classnames'
import { DButton } from 'components/d-button'
import { DInputField } from 'components/d-fields/d-input-field'
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, memo, useMemo } from 'react'
import { isUndefined } from 'utils/utils-helper'
import { PlayerSettings } from '../@type'

type OneAMGUIProps = {
  playersOnline: number | undefined | null
  playerSettings: PlayerSettings
  setPlayerSettings: Dispatch<SetStateAction<PlayerSettings>>
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const OneAMGUIComp = ({
  playersOnline,
  playerSettings,
  setPlayerSettings,
  onSubmit,
}: OneAMGUIProps) => {
  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerSettings((prevState) => ({ ...prevState, name: event.target.value }))
  }

  const isServerOnline = useMemo(() => !isUndefined(playersOnline), [playersOnline])

  return (
    <div className='one-am-gui-container'>
      <form
        className='one-am-login-box'
        onSubmit={onSubmit}
      >
        <DInputField
          id='oneAMName'
          label='Name:'
          placeholder='Enter name...'
          maxLength={20}
          value={playerSettings.name}
          onChange={handleChangeName}
          disabled={!isServerOnline}
        />
        <DButton
          type='submit'
          disabled={!isServerOnline}
        >
          Yes
        </DButton>
        <div className='one-am-server-status'>
          <span className={classNames('status-dot', { online: isServerOnline })} />
          <p className='status-description'>
            {isServerOnline ? `Server is online (${playersOnline})` : 'Server is offline'}
          </p>
        </div>
      </form>
    </div>
  )
}

export const OneAMGUI = memo(OneAMGUIComp)
