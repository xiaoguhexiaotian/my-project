import { App } from 'vue'
import { ChenAInput } from '/@/components/ChenAInput'
import { Codemirror } from '/@/components/Codemirror'
import { BodyLayout } from '/@/components/TemplateLayout'

export const registerGlobComp = (app: App) => {
  // 对应的组件必须声明组件name
  ChenAInput.install!(app)
  BodyLayout.install!(app)
  Codemirror.install!(app)
}
