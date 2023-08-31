import { App, Component, Plugin } from 'vue'

// 用于给组件添加一个install方法,方便部分组件直接全局注册
export const withInstall = <T>(component: Component, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}
