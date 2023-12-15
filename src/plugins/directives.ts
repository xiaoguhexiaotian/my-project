import { App } from 'vue'

import copy from '/@/directives/copy'
import draggable from '/@/directives/draggable'
import longpress from '/@/directives/longpress'
import scroll from '/@/directives/scroll'

/**
 * 注册全局自定义指令
 * @param app
 */
export function setupDirectives(app: App) {
  // 复制指令
  app.directive('copy', copy)
  // 拖拽指令
  app.directive('draggable', draggable)
  // 长按指令
  app.directive('longpress', longpress)
  // 滚动测试
  app.directive('scroll',scroll)
}
