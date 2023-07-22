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
import { initProjectConfig } from '/@/hooks/sys/initProjectConfig'

const initProject = () => {
  const app = createApp(App)
  app.use(createPinia())
  app.use(Antd)
  app.use(VXETable)

  initProjectConfig()

  // 注册路由
  app.use(router)
  // 路由处理
  routeInit(router)

  app.mount('#app')
}

initProject()
