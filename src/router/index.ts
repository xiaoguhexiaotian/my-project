import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import { toArrayTree } from 'xe-utils'

interface Meta {
  id: string
  pid?: string
  title: string
  isHome?: boolean
  hideTab?: boolean
  isLowestLevel?: boolean
}

// 页面路由信息
const pages = import.meta.glob('../views/**/page.ts', {
  eager: true,
  import: 'default'
})
// 页面组件信息
const pageComps = import.meta.glob('../views/**/index.vue', {
  eager: true,
  import: 'default'
})

// 转换为路由信息
const routes: any = Object.entries(pages).map(([path, meta]: [string, Meta]) => {
  // 暂存页面路径
  const pageTsPath = path
  path = path.replace('../views', '').replace('/page.ts', '')
  path = path || '/'
  const name = path.split('/').filter(Boolean).join('-') || 'index'
  // 组件路径
  const componentPath = pageTsPath.replace('page.ts', 'index.vue')
  return {
    path,
    name,
    id: meta.id,
    pid: meta.pid || '-1',
    component: meta.isLowestLevel ? () => pageComps[componentPath] : undefined,
    meta
  }
})

// 通过每个page中的id，pid转化为树形菜单结构
export const menuData = toArrayTree(routes, {
  parentKey: 'pid',
  key: 'id',
  children: 'children'
})
console.log(routes, menuData)

/**
 * 404
 * @param route 即将跳转的路由信息
 */
export function go404(route: RouteLocationNormalized) {
  const { path } = route
  if (routes.filter((i) => i.component).findIndex((i) => i.path == path) > -1) {
    return true
  } else {
    router.push({ path: '/noPage' })
    return false
  }
}

// console.log(routes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 过滤掉父级路由
  routes: routes.filter((i) => i.component)
})

export default router
