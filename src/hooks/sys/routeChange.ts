/**
 * 路由变化时操作页签
 */

import mitt from '/@/utils/mitt'
import type { RouteLocationNormalized } from 'vue-router'

const emitter = mitt()

const key = Symbol()

let lastChangeTab: RouteLocationNormalized

/**
 * 路由变化时触发
 * @param lastChangeRoute 最后一个变化的路由
 */
export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  lastChangeTab = lastChangeRoute
  emitter.emit(key, lastChangeRoute)
}

/**
 *  监听
 * @param callback 接收的回调
 * @param immediate 执行时机
 */
export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  emitter.on(key, callback)
  immediate && lastChangeTab && callback(lastChangeTab)
}
/**
 * 清除
 */
export function removeTabChangeListener() {
  emitter.clear()
}
