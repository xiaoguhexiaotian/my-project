import { Component } from 'vue'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import { toArrayTree } from 'xe-utils'
import ifarme from '/@/router/module/iframe'

export interface Meta {
  id: string
  pid?: string
  title: string
  isHome?: boolean
  hideTab?: boolean
  hideMenu?: boolean
  isLowestLevel?: boolean
  icon: string
  sort: number
}
export interface IRoute {
  path: string
  name: string
  id: string
  pid: string
  component: Component | undefined
  meta: Meta
  children?: IRoute[]
}

// 页面路由信息
const pages = import.meta.glob('../views/**/page.ts', {
  eager: true,
  import: 'default'
})
// 2024.4.12优化为懒加载模式，这样就不会初始化去生成菜单的时候读取所有的index.vue文件了，性能拉满
// 页面组件信息
const pageComps = import.meta.glob('../views/**/index.vue')

// 转换为路由信息
const routes: IRoute[] = Object.entries(pages).map(([path, meta]: [string, Meta]) => {
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
    // 动态导入 pageComps中的每一个key的值都是一个异步函数 执行后获取到对应的组件 打包构建时也会对这种语法进行解析 拆分为不同的chunk
    component: meta.isLowestLevel ? () => pageComps[componentPath]() : undefined,
    meta
  }
})
routes.push(...(ifarme as any))
// 通过每个page中的id，pid转化为树形菜单结构
export const menuData: IRoute[] = toArrayTree(routes, {
  parentKey: 'pid',
  key: 'id',
  children: 'children'
})
  .filter((i) => !i.meta.hideMenu)
  .sort((a, b) => a.meta.sort - b.meta.sort)
console.log(menuData)

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

console.log(routes, `${import.meta.env.BASE_URL}`)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 过滤掉父级路由
  routes: routes.filter((i) => i.component) as unknown as RouteRecordRaw[]
})

export default router
