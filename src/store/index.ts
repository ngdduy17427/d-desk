import { createGlobalStore } from '@laguz'
import { appStore } from './app-store'
import { oneAMStore } from './one-am-store'

export const { useStore } = createGlobalStore({
  appStore,
  oneAMStore,
})
