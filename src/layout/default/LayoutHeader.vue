<template>
  <div :class="`${prefixCls} px-5px`">
    <span>头部</span>
    <Button type="text" shape="circle" @click="openSetting">
      <template #icon><SettingOutlined /></template>
    </Button>
  </div>
  <MenuSettingDrawer
    :class-name="'menu-setting-drawer'"
    :visible="menuVisible"
    @close="openSetting"
    title="布局设置"
  >
    <template #extra><SettingOutlined /> </template>
    <template #body>
      <div>body</div>
    </template>
    <template #footer>
      <Button type="primary" block>重置</Button>
    </template>
  </MenuSettingDrawer>
</template>
<script setup lang="ts">
import { useDesign } from '/@/hooks/useDesign'
import { Button } from 'ant-design-vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import MenuSettingDrawer from '/@/components/Drawer/index.vue'
import { ref } from 'vue'

const { prefixCls } = useDesign('header')

const menuVisible = ref(false)

const openSetting = () => {
  menuVisible.value = !menuVisible.value
}
</script>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-header';

.@{prefix-cls}{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
