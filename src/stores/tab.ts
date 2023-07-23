import { defineStore } from 'pinia'
import type { RouteLocationNormalized, Router } from 'vue-router'
export interface tabState {
  cacheList: Set<string>
  tabList: RouteLocationNormalized[]
}

export const usetabStore = defineStore({
  id: 'tabs',
  state: (): tabState => ({
    cacheList: new Set(),
    tabList: []
  }),
  getters: {
    getTabList(): RouteLocationNormalized[] {
      return this.tabList
    },
    getCacheList(): Set<string> {
      return this.cacheList
    }
  },
  actions: {
    addTab(route: RouteLocationNormalized) {
      this.cacheList.add(route.fullPath)
      // 首页添加到数组第一项,防止关闭最后一个页签时无数据
      if (route.meta.isHome) {
        this.tabList.unshift(route)
        return
      }
      this.tabList.push(route)
      console.log(this.tabList)
    },
    closeTabByKey(fullPath: string, router: Router) {
      // 根据全路径找到下标
      const index = this.tabList.findIndex((i) => i.fullPath == fullPath)
      const { push } = router
      if (index !== -1) {
        this.tabList.splice(index, 1)
        this.cacheList.delete(fullPath)
        // 删除后跳转到左边的页签
        push({ path: this.tabList[index - 1].fullPath })
      }
      console.log(this.cacheList)
    }
  }
})
