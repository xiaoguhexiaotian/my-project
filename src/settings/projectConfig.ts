import { MenuTypeEnum } from '/@/enums/MenuTypeEnum'

export interface ProjectConfig {
  menuSetting: {
    fixed: boolean
    collapsed: boolean
    collapsedShowTitle: boolean
    canDrag: boolean
    show: boolean
    hidden: boolean
    menuWidth: number
    type: MenuTypeEnum
    split: boolean
    topMenuAlign: 'left' | 'center' | 'right'
    accordion: boolean
    closeMixSidebarOnChange: boolean
    mixSideFixed: boolean
    isHover: boolean
  }
}

// ! 改动后需要清空浏览器缓存
const setting: ProjectConfig = {
  // 菜单配置
  menuSetting: {
    // 是否固定住左侧菜单
    fixed: true,
    // 菜单折叠
    collapsed: true,
    // 折叠菜单时候是否显示菜单名
    collapsedShowTitle: false,
    // 是否可拖拽
    // Only limited to the opening of the left menu, the mouse has a drag bar on the right side of the menu
    canDrag: false,
    // Whether to show no dom
    show: true,
    // Whether to show dom
    hidden: false,
    // 菜单宽度
    menuWidth: 160,
    // // 菜单模式
    // mode: MenuModeEnum.INLINE,
    // 菜单类型
    type: MenuTypeEnum.LEFT_TOP,
    // // 菜单主题
    // theme: ThemeEnum.DARK,
    // 分割菜单
    split: false,
    // 顶部菜单布局
    topMenuAlign: 'center',
    // 折叠触发器的位置
    // trigger: TriggerEnum.FOOTER,
    // 手风琴模式，只展示一个菜单
    accordion: true,
    // 在路由切换的时候关闭左侧混合菜单展开菜单
    closeMixSidebarOnChange: false,
    // 左侧混合菜单模块切换触发方式 ‘click’ |'hover'
    // mixSideTrigger: MixSidebarTriggerEnum.HOVER,
    // 是否固定左侧混合菜单
    mixSideFixed: false,
    // 菜单是否hover状态
    isHover: false
  }
}

export default setting
