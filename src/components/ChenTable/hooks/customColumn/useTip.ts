import { CustomColumns } from '/@/components/ChenTable/types'
import { merge } from 'xe-utils'
import { h } from 'vue'

export const useTip = (col: CustomColumns) => {
  const { title } = col
  return merge(col, {
    formatter: () => '通用列展示',
    slots: { header: () => h('span', `${title}-表头通用提示`) }
  })
}
