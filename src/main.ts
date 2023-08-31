import './assets/main.css'
import '/@/design/index.less'
import 'virtual:windi.css'
import 'vxe-table/lib/style.css'
import 'ant-design-vue/dist/antd.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import VXETable from 'vxe-table'
import { routeInit } from './hooks/sys/routeInit'
import { registerGlobComp } from '/@/hooks/sys/initComponents'
import { initProjectConfig } from '/@/hooks/sys/initProjectConfig'
import { setupDirectives } from '/@/plugins'

const initProject = () => {
  const app = createApp(App)
  app.use(createPinia())
  app.use(Antd)
  app.use(VXETable)

  initProjectConfig()

  // 初始化注册全局组件
  registerGlobComp(app)

  // 注册指令
  setupDirectives(app)

  // 注册路由
  app.use(router)
  // 路由处理
  routeInit(router)

  app.mount('#app')
}

initProject()
