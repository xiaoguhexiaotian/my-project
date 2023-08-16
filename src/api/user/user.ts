import { message } from 'ant-design-vue'
import { defhttp } from '/@/utils/http/axios'
enum Api {
  userList = '/login/userList',
  deleteUser = '/login/delUser'
}

/**
 * @description 请求成功提示
 * @param res 响应数据
 */
const success = (res) => {
  res.success && message.success(res.message)
}
// 用户列表查询
export const getUserList = () => {
  return defhttp.get({ url: Api.userList })
}

// 用户删除接口
export const delUser = (params: { id: string }) => {
  return defhttp.post({ url: Api.deleteUser, params, success })
}
