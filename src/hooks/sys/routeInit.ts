import { RouteLocationNormalized } from 'vue-router'
import { setRouteChange } from '/@/hooks/sys/routeChange'
import { go404 } from '/@/router'
// 先订阅一个消息，路由变化时去通知，消费这个消息，然后去更新tabs库的状态

export const routeInit = (router) => {
  routeBeforeEach(router)
}

/**
 * 路由监听，用于动态tabs展示
 * @param router 路由实例
 */
const routeBeforeEach = (router) => {
  // 注册全局的导航守卫
  router.beforeEach((to: RouteLocationNormalized) => {
    if (go404(to)) {
      // 在路由切换之前执行的逻辑
      setRouteChange(to)
      return true
    }
  })
}
