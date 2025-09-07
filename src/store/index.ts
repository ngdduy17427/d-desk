import { createGlobalStore } from 'libs/laguz'
import { appStore } from './app-store'

export const { useStore } = createGlobalStore({
  appStore,
})
