import { AxiosRequestConfig } from 'axios'
import { Axios } from './Axios'

/**
 * 实例化axios方法
 */
const createAxios = (opt?: AxiosRequestConfig) => {
  // console.log('实例化一个axios')
  return new Axios({
    timeout: 30 * 1000,
    authenticationScheme: '',
    // 配置项，下面的选项都可以在独立的接口请求中覆盖
    requestOptions: {
      // 默认将prefix 添加到url
      joinPrefix: true,
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      isReturnNativeResponse: false,
      // 需要对返回数据进行处理
      isTransformResponse: true,
      // post请求的时候添加参数到url
      joinParamsToUrl: false,
      // 格式化提交参数时间
      formatDate: true,
      // 接口地址 注意环境管理
      // apiUrl: globSetting.apiUrl,
      apiUrl: 'http:localhost:3001',
      // 接口拼接地址
      urlPrefix: '/api/',
      // 消息提示类型
      errorMessageMode: 'none',
      // 成功消息提示类型
      successMessageMode: 'success',
      //  是否加入时间戳
      joinTime: true,
      // 忽略重复请求
      ignoreCancelToken: true,
      // 是否携带token
      withToken: true
    },
    // 请求基础路径
    baseURL: 'http://localhost:3100/study',
    withCredentials: false
  })
}

/**
 * 默认请求头
 */
export const defhttp = createAxios()
