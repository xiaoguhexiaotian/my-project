import { createRouter, createWebHistory } from 'vue-router'
import doubleTabs from '/@/views/dataScenario/array/doubleTabs.vue'
import HomeView from '/@/layout/page/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dbTabs',
    name: 'dbTabs',
    component: doubleTabs
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
