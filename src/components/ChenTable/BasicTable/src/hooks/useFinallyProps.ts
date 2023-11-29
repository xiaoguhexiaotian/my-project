// 处理最终表格配置
import { unref, Ref, computed } from 'vue'
import { merge } from 'lodash-es'
import { CustomVxeTableProps } from '/@/components/ChenTable/types'
import { useColumns } from './useColumns'

export const useFinallyProps = (props: CustomVxeTableProps, tableRef: Ref) => {
  const { finallyColumns } = useColumns(props, tableRef)

  const finallyProps = computed(() => {
    return merge(props, { columns: unref(finallyColumns) })
  })
  return { ...unref(finallyProps) }
}
