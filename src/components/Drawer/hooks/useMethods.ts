import { DrawerType } from '/@/components/Drawer/types/data'

export function useMethods(_props: DrawerType, _emit) {
  /**
   * 关闭弹窗
   */
  const closeDrawer = () => {
    _emit('close')
  }

  return { closeDrawer }
}
