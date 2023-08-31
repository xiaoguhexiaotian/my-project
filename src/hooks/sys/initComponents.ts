import { App } from 'vue'
import { ChenInput } from '/@/components/ChenInput'

export const registerGlobComp = (app: App) => {
  // 对应的组件必须声明组件name
  ChenInput.install!(app)
}
