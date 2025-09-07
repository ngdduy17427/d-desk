import { createGlobalStore } from '@ngdduy17427/laguz'
import { appStore } from './app-store'

export const { useStore } = createGlobalStore({
  appStore,
})
