import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 新增axios处理参数
export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string
  transform?: AxiosTransform
  requestOptions?: RequestOptions
  success?: (data: any) => void
}
// 响应接口参数
export interface Result<T = any> {
  code: number | string
  type: 'success' | 'error' | 'warning'
  message: string
  result: T
  success: boolean
  timestamp: number | string
}

//  用于定义请求数据和响应数据的转换函数。这些函数允许在发送请求之前对请求数据进行处理，以及在接收响应后对响应数据进行处理。在发送和接收数据时进行自定义处理，例如数据格式转换、数据加工等。
export abstract class AxiosTransform {
  /**
   * @description: Process configuration before request
   * @description: Process configuration before request
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

  /**
   * @description: Request successfully processed
   */
  transformResponseHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void
}
// 报错提示 方式
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined
// 成功提示 方式
export type SuccessMessageMode = 'none' | 'success' | 'error' | undefined
//  axios额外配置
export interface RequestOptions {
  // 将请求参数拼接到url
  joinParamsToUrl?: boolean
  // 格式化请求参数时间
  formatDate?: boolean
  // 是否处理请求结果
  isTransformResponse?: boolean
  // 是否返回本地响应头,需要获取响应头时使用此属性
  isReturnNativeResponse?: boolean
  // Whether to join url
  joinPrefix?: boolean
  // 接口地址，如果保留为空，则使用默认值
  apiUrl?: string
  // 请求拼接路径
  urlPrefix?: string
  // 错误消息提示类型
  errorMessageMode?: ErrorMessageMode
  // 成功消息提示类型
  successMessageMode?: SuccessMessageMode
  // 是否添加时间戳
  joinTime?: boolean
  ignoreCancelToken?: boolean
  //是否在标头中发送令牌
  withToken?: boolean
}
/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
