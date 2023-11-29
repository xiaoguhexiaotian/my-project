// 处理通用列，减少重复性代码
import { Ref, computed } from 'vue'
import { CustomVxeTableProps } from '/@/components/ChenTable/types'
import { TableColumnType } from '/@/components/ChenTable/emuns/columnType'
import { useTip } from '/@/components/ChenTable/hooks/customColumn/useTip'

export const useColumns = (props: CustomVxeTableProps, tableRef: Ref) => {
  const finallyColumns = computed(() => {
    return handleColumn(props.columns)
  })
  return { finallyColumns }
}

const handleColumn = (column) => {
  column.forEach((col) => {
    const { type } = col
    if (type == TableColumnType.TIP) {
      col = useTip(col)
    }
  })
}
