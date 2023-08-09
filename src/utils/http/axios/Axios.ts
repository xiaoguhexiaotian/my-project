import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance } from 'axios'
import { isFunction } from 'xe-utils'
import { cloneDeep } from 'lodash'
import { CreateAxiosOptions } from '/@/utils/http/axios/type'

export class Axios {
  // private 私有
  private axiosInstance: AxiosInstance
  private options: CreateAxiosOptions

  // 实例动作
  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }
  private getTransform() {
    const { transform } = this.options
    return transform
  }

  setupInterceptors() {
    // console.log('设置拦截器')
  }

  get<T = any>(config: AxiosRequestConfig, options?): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post<T = any>(config: AxiosRequestConfig, options?): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  put<T = any>(config: AxiosRequestConfig, options?): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any>(config: AxiosRequestConfig, options?): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }

  request<T = any>(config: CreateAxiosOptions, options?): Promise<T> {
    let conf = cloneDeep(config)
    const transform = this.getTransform()

    const { requestOptions } = this.options

    const opt = Object.assign({}, requestOptions, options)

    const { beforeRequestHook, requestCatchHook, transformResponseHook } = transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }
    conf.requestOptions = opt

    // conf = this.supportFormData(conf)

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(res, opt)
              config.success && config.success(res.data)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('request error!'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          if (axios.isAxiosError(e)) {
            // 在此处重写来自axios的错误消息
          }
          reject(e)
        })
    })
  }
}
