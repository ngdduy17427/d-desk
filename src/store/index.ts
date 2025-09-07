import { createGlobalStore } from '@laguz'
import { appStore } from './app-store'

export const { useStore } = createGlobalStore({
  appStore,
})
