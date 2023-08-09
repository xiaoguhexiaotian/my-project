import { defhttp } from '/@/utils/http/axios'
enum Api {
  message = '/api/hello'
}

export const getMessage = () => {
  return defhttp.get({ url: Api.message })
}
