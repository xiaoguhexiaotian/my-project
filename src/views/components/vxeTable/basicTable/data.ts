import { CustomColumns } from '/@/components/ChenTable/types'
import { TableColumnType } from '/@/components/ChenTable/emuns/columnType'

export const columns: CustomColumns[] = [
  { type: 'seq', width: 50 },
  { field: 'name', title: 'name' },
  { field: 'sex', title: 'sex' },
  { field: 'address', title: 'Address' },
  { field: 'extra', title: '通用列', type: TableColumnType.TIP }
]
