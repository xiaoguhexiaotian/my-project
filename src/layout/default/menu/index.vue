<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :mode="menuSetting.type == MenuTypeEnum.TOP ? 'horizontal' : 'vertical'"
    theme="dark"
    @click="handleClick"
  >
    <a-menu-item key="1">
      <template #icon>
        <MailOutlined />
      </template>
      Navigation One
    </a-menu-item>
    <a-menu-item key="2">
      <template #icon>
        <CalendarOutlined />
      </template>
      Navigation Two
    </a-menu-item>
    <a-sub-menu key="sub1">
      <template #icon>
        <AppstoreOutlined />
      </template>
      <template #title>Navigation Three</template>
      <a-menu-item key="3">Option 3</a-menu-item>
      <a-menu-item key="4">Option 4</a-menu-item>
      <a-sub-menu key="sub1-2" title="Submenu">
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
      </a-sub-menu>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <template #icon>
        <SettingOutlined />
      </template>
      <template #title>Navigation Four</template>
      <a-menu-item key="7">Option 7</a-menu-item>
      <a-menu-item key="8">Option 8</a-menu-item>
      <a-menu-item key="9">Option 9</a-menu-item>
      <a-menu-item key="10">Option 10</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { MenuTypeEnum } from '/@/enums/MenuTypeEnum'
import { useAppStore } from '/@/stores/app'

export default defineComponent({
  components: {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined
  },
  setup() {
    const appStore = useAppStore()
    const { menuSetting } = appStore.getProjectConfig
    const state = reactive({
      selectedKeys: [],
      openKeys: []
    })
    const handleClick: MenuProps['onClick'] = (menuInfo) => {
      console.log('click ', menuInfo)
    }
    return {
      ...toRefs(state),
      handleClick,
      menuSetting,
      MenuTypeEnum
    }
  }
})
</script>
