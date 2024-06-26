import { message } from 'ant-design-vue'
import { defhttp } from '/@/utils/http/axios'
enum Api {
  login = '/login/password', // 密码登录
  register = '/login/register', // 注册
  getCode = '/login/get/code', // 获取验证码
  loginCode = '/login/code' // 验证码登录
}

interface Login {
  username: string
  password: string
}

interface Register {
  username: string
  password: string
  email?: string
}

/**
 * @description 请求成功提示
 * @param res 响应数据
 */
const success = (res) => {
  res.success && message.success(res.message)
}
// 登录接口
export const login = (params: Login) => {
  return defhttp.post({ url: Api.login, params, success })
}
// 注册接口
export const register = (params: Register) => {
  return defhttp.post({ url: Api.register, params, success })
}
// 获取验证码
export const getCode = () => {
  return defhttp.get({ url: Api.getCode })
}
// 验证码登录接口
export const codeLogin = (params: Login) => {
  return defhttp.post({ url: Api.loginCode, params, success })
}
