import { defineStore } from 'pinia'
import { getCacheToken } from '/@/hooks/sys/routeInit'
declare type Nullable<T> = T | null
interface UserInfo {
  userId: string
  username: string
  isManager: string
}
interface UserState {
  token: string
  userInfo: Nullable<UserInfo>
}

export const useUserStore = defineStore({
  id: 'user-info',
  state: (): UserState => ({
    token: '',
    userInfo: null
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
