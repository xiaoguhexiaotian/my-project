import { usetabStore } from '/@/stores/tab'
import { useAppStore } from '/@/stores/app'

export const initProjectConfig = () => {
  const appStore = useAppStore()
  const tabStore = usetabStore()
  // console.log(appStore, tabStore)
}
