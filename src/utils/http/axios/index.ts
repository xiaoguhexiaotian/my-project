import { Axios } from './Axios'

/**
 * 实例化axios方法
 */
const createAxios = () => {
  // console.log('实例化一个axios')
  return new Axios()
}

/**
 * 默认请求头
 */
export const defhttp = createAxios()
