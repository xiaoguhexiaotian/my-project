<template>
  <a-sub-menu :key="menuInfo?.id">
    <template #title>{{ menuInfo!.meta.title }}</template>
    <template v-for="item in menuInfo!.children" :key="item.key">
      <template v-if="item.children && item.children.length == 0">
        <a-menu-item :key="item.id" @click="handleClick(item)">
          <!-- <template #icon>
            <PieChartOutlined />
          </template> -->
          {{ item.meta.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" :key="item.id" />
      </template>
    </template>
  </a-sub-menu>
</template>
<script setup lang="ts">
import { object } from 'vue-types'
import router, { IRoute } from '/@/router'
import SubMenu from './subMenu.vue'

const { menuInfo } = defineProps({
  menuInfo: object<IRoute>()
})
const handleClick = (item) => {
  router.push({ path: item.path })
  console.log('click ', item)
}
</script>

<style scoped lang="less"></style>
