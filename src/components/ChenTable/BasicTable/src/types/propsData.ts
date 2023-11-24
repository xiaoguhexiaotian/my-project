import { func } from 'vue-types'
import { propTypes } from '/@/utils/propTypes'

export const vxeProps = () => ({
  keyFieId: propTypes.string.def('_HUI_ROW_KEY'),
  // 复选框勾选状态记忆
  checkReverce: propTypes.bool.def(false),
  // 列信息
  columns: {
    type: Array,
    required: true
  },
  // 是否根据父盒子计算宽度
  autoResize: propTypes.bool.def(true),
  // 数据源
  dataSource: propTypes.oneOfType([propTypes.array, propTypes.any]),
  // 是否可拖拽
  dragSort: propTypes.bool.def(false),
  // 行样式类名称
  rowClass: propTypes.oneOfType([propTypes.string, func<(data) => string | undefined>()]).def(''),
  // 是否显示行号
  rowNumber: propTypes.bool.def(false),
  // 是否可选择行
  rowSelection: propTypes.bool.def(false),
  // 选择行类型
  rowSelectionType: propTypes.oneOf(['checkbox', 'radio']).def('checkbox'),
  // 选择行表头文字
  selectionTitle: propTypes.string,
  // 页面是否在加载中
  loading: propTypes.bool.def(false),
  // 页面加载中提示语
  loadingText: propTypes.string.def('努力加载中...'),
  // 表格高度
  height: propTypes.oneOfType([propTypes.number, propTypes.string]).def('auto'),
  // 最大高度
  maxHeight: {
    type: [Number, String],
    default: () => null
  },
  // 表格的尺寸
  size: propTypes.oneOf(['medium', 'small', 'mini']).def('medium'),
  // selection触发方式 参照vxe-grid checkboxConfig/radioConfig trigger
  selectionTrigger: propTypes.oneOf(['default', 'cell', 'row']).def('default'),
  // 是否显示边框线
  border: propTypes.oneOfType([propTypes.bool, propTypes.string]).def(true),
  // 是否禁用编辑
  editDisabled: propTypes.bool.def(false),
  // 键盘编辑是否启用
  keyboardEdit: propTypes.bool.def(false),
  // 是否启用气泡框编辑栏
  showPopoverEdit: propTypes.oneOfType([propTypes.bool, propTypes.func]).def(true),
  // 是否启用表格配置编辑栏
  showColumnEdit: propTypes.bool.def(false),
  // 编辑栏
  editPopoverConfig: propTypes.array.def([]),
  // 是否显示分页
  isShowPager: propTypes.bool.def(true),
  // 分页配置
  pageConfig: propTypes.object.def({}),
  // 是否显示合计
  isShowFooter: propTypes.bool.def(false),
  // 合计行配置
  footerConfig: propTypes.object.def({}),
  // 排序
  sortConfig: propTypes.object.def({}),
  // 表格编码
  tableCode: propTypes.string.isRequired,
  // 是否启用列设置
  useColSetting: propTypes.bool.def(false),
  // 是否显示全屏按钮
  isShowFullScreenBtn: propTypes.bool.def(false),
  // 列设置Modal挂载Class, 默认body
  colModalMountClass: propTypes.string,
  //是否默认第一次触发 onSizeChange 事件
  refreshFirst: propTypes.bool.def(true),
  //是否简单分页
  isSimplePage: propTypes.bool.def(false),
  //是否分页条数记忆
  isPageReverce: propTypes.bool.def(true),
  // 是否全字段排序, 默认启动
  isAllSort: propTypes.bool.def(false),
  // 行号取消显示
  rowNumberUnShow: propTypes.bool.def(false),
  // 是否报表
  isReport: propTypes.bool.def(false),
  // 取消统一列宽width设置，使用列设置当前属性无效
  noSetWidth: propTypes.bool.def(false),
  // 取消列固定设置功能, 启动列设置有效
  noSetFixed: propTypes.bool.def(false)
})

export const vxeEmits = ['dragged', 'draggeStart', 'selectRowChange', 'cellClick', 'sortClick']
