<template>
  <a-menu :mode="menuSetting.type == MenuTypeEnum.TOP ? 'horizontal' : 'vertical'" theme="dark">
    <template v-for="item in menuData" :key="item.id">
      <template v-if="item.children && item.children.length == 0">
        <a-menu-item :key="item.id" @click="handleClick(item)">
          <!-- <template #icon>
            <PieChartOutlined />
          </template> -->
          {{ item.meta.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :key="item.id" :menu-info="item" />
      </template>
    </template>
  </a-menu>
</template>
<script lang="ts" setup>
import { MenuTypeEnum } from '/@/enums/MenuTypeEnum'
import { useAppStore } from '/@/stores/app'
import SubMenu from './subMenu.vue'
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
