<template>
  <Menu :mode="menuSetting.type == MenuTypeEnum.TOP ? 'horizontal' : 'vertical'" theme="dark">
    <template v-for="item in menuData" :key="item.id">
      <template v-if="item.children && item.children.length == 0">
        <Menu.Item :key="item.id" @click="handleClick(item)">
          <template #icon><span :class="`${item.meta.icon} iconfont`" /></template>
          {{ item.meta.title }}
        </Menu.Item>
      </template>
      <template v-else>
        <MySubMenu :key="item.id" :menu-info="item" />
      </template>
    </template>
  </Menu>
</template>
<script lang="ts" setup>
import { Menu } from 'ant-design-vue'
import { MenuTypeEnum } from '/@/enums/MenuTypeEnum'
import { useAppStore } from '/@/stores/app'
import MySubMenu from './subMenu.vue'
import { array } from 'vue-types'
import router, { IRoute } from '/@/router'

const { menuData } = defineProps({
  menuData: array<IRoute>()
})

const appStore = useAppStore()
const { menuSetting } = appStore.getProjectConfig

const handleClick = (item) => {
  router.push({ path: item.path })
  console.log('click ', item)
}
</script>
