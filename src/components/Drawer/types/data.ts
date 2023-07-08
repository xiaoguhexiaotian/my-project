import { ExtractPropTypes } from 'vue'
import { propTypes } from '/@/utils/propTypes'

/**
 * 组件接收参数
 * 支持ant-design-vue抽屉所有参数
 * @returns props
 */
export const ComponentProps = () => ({
  /**
   * 组件类名
   */
  className: propTypes.string.def('drawer'),
  /**
   * 显隐控制
   */
  visible: propTypes.bool.def(false)
})

/**
 * 组件回调事件
 */
export const ComponentEmits = ['close']

export type DrawerType = Partial<ExtractPropTypes<ReturnType<typeof ComponentProps>>>
