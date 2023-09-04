import { defhttp } from '/@/utils/http/axios'
import { message } from 'ant-design-vue'

/**
 * 下载文件
 * @param url 下载接口路径
 * @param fileName 下载文件名
 * @param parameter 下载接口参数
 * @param method 下载请求方式
 * @returns {*}
 */
export const downloadFile = (url, fileName?, parameter?, method?) => {
  const down = (data) => {
    if (!data || data.size === 0) {
      message.warning('文件下载失败')
      return
    }
    // @ts-ignore
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // @ts-ignore
      window.navigator.msSaveBlob(new Blob([data]), fileName)
    } else {
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link) //下载完成移除元素
      window.URL.revokeObjectURL(url) //释放掉blob对象
    }
  }
  return fileblob(url, parameter, method).then((data) => {
    down(data)
  })
}

/**
 * 下载文件 用于excel导出
 * @param url 下载接口路径
 * @param parameter 下载接口参数
 * @param method 下载请求方式
 * @returns {*}
 */
export const fileblob = (url, parameter, method) => {
  return defhttp[method](
    {
      url: url,
      params: parameter,
      responseType: 'blob'
    },
    { isTransformResponse: false }
  )
}
