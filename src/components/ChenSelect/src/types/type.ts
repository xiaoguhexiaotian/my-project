import { array, string, bool } from 'vue-types'
import { ExtractPropTypes, PropType } from 'vue'

export const ComponentProps = () => ({
  /** 值 */
  value: [String, Number, Array] as PropType<string | Number | string[] | Number[]>,
  /** 宽度 */
  width: string().def('180px'),
  /** 源数据 */
  options: array<{ label: string; value: string; [key: string]: any }>().def([]),
  /** 选择方式 */
  mode: string<'multiple' | 'tags' | 'combobox'>().def('combobox'),
  /** 下拉框额外操作 */
  isShowDropdownRender: bool().def(false),
  /** 下拉框额外操作icon */
  dropdownRenderIcon: string().def('chen-bawangcan')
})

export const SelectEmits = ['change', 'update:value']

export type ChenSelectProps = ExtractPropTypes<ReturnType<typeof ComponentProps>>
