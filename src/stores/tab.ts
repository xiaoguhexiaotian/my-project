import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'
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
      console.log(this.cacheList, this.tabList)
    }
  }
})
