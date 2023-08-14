import { message } from 'ant-design-vue'
import { RouteLocationNormalized, Router } from 'vue-router'
import { setRouteChange } from '/@/hooks/sys/routeChange'
import { go404 } from '/@/router'
import { createLocalStorage } from '/@/utils/cache'
// 先订阅一个消息，路由变化时去通知，消费这个消息，然后去更新tabs库的状态

const localStorage = createLocalStorage()

export const getCacheToken = () => {
  return localStorage.get('TOKEN')
}

export const routeInit = (router: Router) => {
  routeBeforeEach(router)
}

/**
 * 路由监听，用于动态tabs展示
 * @param router 路由实例
 */
const routeBeforeEach = (router: Router) => {
  // 注册全局的导航守卫
  router.beforeEach((to: RouteLocationNormalized) => {
    // 跳转的页面非登录页且缓存中不存在token时，重定向到登录页
    if (to.path !== '/login' && !getCacheToken()) {
      message.warning('登录已过期,清重新登录')
      router.replace({ path: '/login' })
      return false
    }
    if (go404(to)) {
      // 在路由切换之前执行的逻辑
      setRouteChange(to)
      return true
    }
  })
}
