import { isNullOrUnDef } from '/@/utils/is'

export interface CreateStorageParams {
  prefixKey?: string
  storage: Storage
  timeout?: number | null
}

/**
 *
 * @param prefixKey key前缀名
 * @param storage 缓存类型
 * @param timeout 缓存有效时间
 */
export const createStorage = ({
  prefixKey = 'jian-hong-',
  storage = sessionStorage,
  timeout = null
}: CreateStorageParams) => {
  const WebStorage = class WebStorage {
    private storage: Storage
    private prefixKey?: string

    constructor() {
      this.storage = storage
      this.prefixKey = prefixKey
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }
    /**
     *
     *  写入缓存
     * @param {string} key
     * @param {*} value
     * @expire 过期时间
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null
      })
      const stringifyValue = stringData
      this.storage.setItem(this.getKey(key), stringifyValue)
    }
    /**
     *读取缓存
     * @param {string} key
     */
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key))
      if (!val) return def

      try {
        const decVal = val
        const data = JSON.parse(decVal)
        const { value, expire } = data
        // 当前过期时间为null或者undefind或者大于当前时间时，才返回数据，否则删除缓存
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value
        }
        this.remove(key)
      } catch (e) {
        return def
      }
    }
    /**
     * 根据key删除缓存
     * @param {string} key
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }

    /**
     * 清空所有缓存
     */
    clear(): void {
      this.storage.clear()
    }
  }
  return new WebStorage()
}
