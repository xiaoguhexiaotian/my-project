<template>
  <SubMenu :key="menuInfo?.id">
    <template #title>{{ menuInfo!.meta.title }}</template>
    <template #icon><span :class="menuInfo!.meta.icon" /></template>
    <template v-for="item in menuInfo!.children" :key="item.key">
      <template v-if="item.children && item.children.length == 0">
        <MenuItem :key="item.id" @click="handleClick(item)">
          <template #icon><span :class="item.meta.icon" /></template>
          {{ item.meta.title }}
        </MenuItem>
      </template>
      <template v-else>
        <MySubMenu :menu-info="item" :key="item.id" />
      </template>
    </template>
  </SubMenu>
</template>
<script setup lang="ts">
import { MenuItem, SubMenu } from 'ant-design-vue'
import { object } from 'vue-types'
import router, { IRoute } from '/@/router'
import MySubMenu from './subMenu.vue'

const { menuInfo } = defineProps({
  menuInfo: object<IRoute>()
})
const handleClick = (item) => {
  router.push({ path: item.path })
  console.log('click ', item)
}
</script>

<style scoped lang="less"></style>
