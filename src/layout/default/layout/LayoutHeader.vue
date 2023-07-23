<template>
  <div :class="`${prefixCls} px-5px`">
    <div :style="headerStyle">
      <span v-if="menuSetting.type != MenuTypeEnum.LEFT_TOP" :class="`${prefixCls}-left`">
        非LEFT_Top模式下header左侧
      </span>
      <span @click="jump">header</span>
      <Button type="text" shape="circle" @click="openSetting">
        <template #icon>
          <SettingOutlined />
        </template>
      </Button>
    </div>
  </div>
  <div :class="`${prefixCls}-tabs `">
    <div
      :class="`${prefixCls}-logo`"
      :style="{ width: menuSetting.collapsed ? '80px' : '200px' }"
      v-if="menuSetting.type == MenuTypeEnum.TOP_LEFT"
    >
      LOGO
    </div>
    <Tabs />
  </div>
  <MenuSettingDrawer
    :class-name="'menu-setting-drawer'"
    :visible="menuVisible"
    @close="openSetting"
    title="布局设置"
  >
    <template #extra>
      <SettingOutlined />
    </template>
    <template #body>
      <h3 :class="`${prefixCls}-menu-type-title`">导航栏模式</h3>
      <div :class="`${prefixCls}-menu-type-picker`">
        <div
          v-for="i in layouts"
          :class="`${prefixCls}-menu-type-picker-${i.type}`"
          @click="settingMenuType(i.type)"
        >
          <div class="box"></div>
        </div>
      </div>
    </template>
    <template #footer>
      <Button type="primary" block @click="reset">重置</Button>
    </template>
  </MenuSettingDrawer>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDesign } from '/@/hooks/useDesign'
import { Button } from 'ant-design-vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import MenuSettingDrawer from '/@/components/Drawer/index.vue'
import { MenuTypeEnum } from '/@/enums/MenuTypeEnum'
import { useAppStore } from '/@/stores/app'
import Tabs from '/@/layout/default/tabs/index.vue'
import router from '/@/router'

const appStore = useAppStore()

const { prefixCls } = useDesign('header')

const menuVisible = ref(false)

const openSetting = () => {
  menuVisible.value = !menuVisible.value
}
const layouts = [{ type: 'left-top' }, { type: 'top-left' }, { type: 'top' }]

const { menuSetting } = appStore.getProjectConfig

const headerStyle = computed(() => {
  return {
    height: menuSetting.type == MenuTypeEnum.TOP ? '100%' : ''
  }
})
/**
 * 设置布局类型
 * @param type 布局类型
 */
const settingMenuType = (type) => {
  menuSetting.type =
    { 'left-top': MenuTypeEnum.LEFT_TOP, 'top-left': MenuTypeEnum.TOP_LEFT }[type] ||
    MenuTypeEnum.TOP
  appStore.setProjectConfig(menuSetting)
}
/**
 * 重置
 */
const reset = () => {
  // appStore.setProjectConfig(Object.assign(menuSetting, { type: MenuTypeEnum.TOP }))
}
/**
 * 路由跳转
 */
const jump = () => {
  router.push({ path: '/dataScenario/array/doubleTabs' })
}
</script>

<style scoped lang="less">
@import '/src/design/sys/index.less';
</style>
