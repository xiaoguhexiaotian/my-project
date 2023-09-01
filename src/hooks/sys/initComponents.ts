import { App } from 'vue'
import { ChenInput } from '/@/components/ChenInput'
import { BodyLayout } from '/@/components/TemplateLayout'

export const registerGlobComp = (app: App) => {
  // 对应的组件必须声明组件name
  ChenInput.install!(app)
  BodyLayout.install!(app)
}
