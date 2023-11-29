import { propTypes } from '/@/utils/propTypes'

export const vxeProps = () => ({
  keyFieId: propTypes.string.def('ROW_KEY'),
  // 列信息
  columns: {
    type: Array,
    required: true
  },
  // 数据源
  data: propTypes.oneOfType([propTypes.array, propTypes.any]),
  // 选择行表头文字
  selectionTitle: propTypes.string,
  // 页面是否在加载中
  loading: propTypes.bool.def(false),
  // 页面加载中提示语
  loadingText: propTypes.string.def('努力加载中...'),
  // 表格高度
  height: propTypes.oneOfType([propTypes.number, propTypes.string]).def('auto'),
  // 测试TS语法，排除该类型
  TsOmit: propTypes.bool
})

export const vxeEmits = ['dragged', 'draggeStart', 'selectRowChange', 'cellClick', 'sortClick']
