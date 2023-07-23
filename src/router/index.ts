import { createRouter, createWebHistory } from 'vue-router'

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
const routes: any = Object.entries(pages).map(([path, meta]) => {
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
    component: () => pageComps[componentPath],
    meta
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
