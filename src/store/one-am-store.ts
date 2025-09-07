import { createStore, withDebug } from '@laguz'

type OneAMStore = {
  isOpenChat: boolean
  updateIsOpenChat: (v: boolean) => void
}

export const oneAMStore = createStore<OneAMStore>(
  withDebug((state) => ({
    isOpenChat: false,
    updateIsOpenChat: (value: boolean) => {
      state.isOpenChat = value
    },
  })),
)
