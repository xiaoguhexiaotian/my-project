import { AxiosRequestConfig } from 'axios'
import { isString } from 'xe-utils'
import { Axios } from './Axios'
import { AxiosTransform, RequestEnum } from '/@/utils/http/axios/type'

function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {}
  }
  const now = new Date().getTime()
  if (restful) {
    return `?_t=${now}`
  }
  return { _t: now }
}
// 请求拦截响应拦截方法集合
const transform: AxiosTransform = {
  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    // formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        // formatDate && formatRequestDate(params)
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },
  // 响应数据处理
  transformResponseHook: (res, requestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = requestOptions
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }
    // 不处理的情况下直接返回数据
    if (!isTransformResponse) {
      return res.data
    }
    const { data } = res
    if (!data) {
      return Promise.reject('请求出错,请稍后重试')
    }
  }
}

/**
 * 实例化axios方法
 */
const createAxios = (opt?: AxiosRequestConfig) => {
  // console.log('实例化一个axios')
  return new Axios({
    timeout: 10 * 1000,
    authenticationScheme: '',
    transform,
    // 配置项，下面的选项都可以在独立的接口请求中覆盖
    requestOptions: {
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      isReturnNativeResponse: false,
      // 需要对返回数据进行处理
      isTransformResponse: false,
      // post请求的时候添加参数到url
      joinParamsToUrl: false,
      // 格式化提交参数时间
      formatDate: true,
      // 接口地址 注意环境管理
      // apiUrl: globSetting.apiUrl,
      apiUrl: 'http://localhost:3101',
      // 默认不将prefix 添加到url
      joinPrefix: true,
      // 接口拼接地址
      urlPrefix: '/study',
      // 消息提示类型
      errorMessageMode: 'none',
      // 成功消息提示类型
      successMessageMode: 'success',
      //  是否加入时间戳
      joinTime: true,
      // 忽略重复请求
      ignoreCancelToken: true,
      // 是否携带token
      withToken: false
    }
    // 请求基础路径
    // baseURL: ''
    // withCredentials: false
  })
}

/**
 * 默认请求头
 */
export const defhttp = createAxios()
