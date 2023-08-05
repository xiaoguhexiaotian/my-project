import { App } from 'vue'

import copy from '/@/directives/copy'

/**
 * 注册全局自定义指令
 * @param app
 */
export function setupDirectives(app: App) {
  // 复制指令
  app.directive('copy', copy)
}
