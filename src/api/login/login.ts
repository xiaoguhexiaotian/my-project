import { defhttp } from '/@/utils/http/axios'
enum Api {
  login = '/auth/login'
}

interface Login {
  username: string
  password: string
}

export const login = (params: Login) => {
  return defhttp.post({ url: Api.login, params })
}
