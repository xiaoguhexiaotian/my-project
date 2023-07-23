<template>
  <Tabs
    v-model:activeKey="activeKey"
    type="editable-card"
    @change="handleChange"
    @edit="closeTab"
    :hideAdd="true"
  >
    <TabPane
      v-for="i in tabList"
      :key="i.fullPath"
      :tab="i.meta.title"
      :closable="!i.meta.isHome"
    />
  </Tabs>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Tabs, TabPane } from 'ant-design-vue'
import { usetabStore } from '/@/stores/tab'
import { listenerRouteChange } from '/@/hooks/sys/routeChange'
import type { RouteLocationNormalized } from 'vue-router'
import router from '/@/router'

const tabStore = usetabStore()

listenerRouteChange((route: RouteLocationNormalized) => {
  const { fullPath } = route
  activeKey.value = fullPath

  if (!tabList.value.some((i) => i.fullPath == fullPath)) tabStore.addTab(route)
})

// 获取需要展示的tab列表
const tabList = computed(() => {
  return tabStore.getTabList.filter((item) => !item.meta?.hideTab)
})

const activeKey = ref()

// 点击切换
const handleChange = (val) => {
  activeKey.value = val
  router.push({ path: val })
}

// 点击关闭
const closeTab = (targetKey: string) => {
  tabStore.closeTabByKey(targetKey)
}
</script>
