import { defineStore } from 'pinia'

export const useTabsStore = defineStore({
  id: 'tabs',
  state: () => ({
    cacheList: new Set(),
    tabsList: []
  }),
  getters: {},
  actions: {}
})
