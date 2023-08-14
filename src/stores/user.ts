import { defineStore } from 'pinia'
import { getCacheToken } from '/@/hooks/sys/routeInit'
interface UserInfo {
  token: string
}

export const useUserStore = defineStore({
  id: 'user-info',
  state: (): UserInfo => ({
    token: ''
  }),
  getters: {
    getToken(): string {
      // token为空时从缓存中取token数据
      return this.token || getCacheToken()
    }
  },
  actions: {
    setToken(token: string): void {
      this.token = token
    }
  }
})
