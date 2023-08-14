import { createStorage } from '/@/utils/cache/storageCache'

//  默认缓存时间一周
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

export const createSessionStorage = (options = {}) => {
  return createStorage({ storage: sessionStorage, ...options, timeout: DEFAULT_CACHE_TIME })
}

export const createLocalStorage = (options = {}) => {
  return createStorage({ storage: localStorage, ...options, timeout: DEFAULT_CACHE_TIME })
}
