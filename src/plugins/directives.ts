import { App } from 'vue'

import copy from '/@/directives/copy'
import draggable from '/@/directives/draggable'

/**
 * 注册全局自定义指令
 * @param app
 */
export function setupDirectives(app: App) {
  // 复制指令
  app.directive('copy', copy)
  // 拖拽指令
  app.directive('draggable', draggable)
}
