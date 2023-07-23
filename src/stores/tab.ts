import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'
import router from '/@/router'
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
    }
  },
  actions: {
    addTab(route: RouteLocationNormalized) {
      this.cacheList.add(route.fullPath)
      this.tabList.push(route)
    },
    closeTabByKey(fullPath: string) {
      const index = this.tabList.findIndex((i) => i.fullPath == fullPath)
      this.tabList.splice(index, 1)
      router.push({ path: this.tabList[index - 1].fullPath })
    }
  }
})
