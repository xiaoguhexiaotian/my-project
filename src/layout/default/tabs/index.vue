<template>
  <Tabs
    v-model:activeKey="activeKey"
    type="editable-card"
    @change="handleChange"
    @edit="closeTab"
    :hideAdd="true"
  >
    <TabPane
      :key="homeRoute!.path"
      :tab="homeRoute!.meta.title"
      :closable="!homeRoute!.meta.isHome"
    />
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
const activeKey = ref()

// 获取需要展示的tab列表
const tabList = computed(() => {
  return tabStore.getTabList.filter((item) => !item.meta?.hideTab && !item.meta.isHome)
})
// 获取首页路由信息，首页始终展示
// 类型问题需要解决/或者直接拿到route类型
const homeRoute: any = router.getRoutes().find((i) => i.meta.isHome)
Object.assign(homeRoute!, { fullPath: homeRoute!.path })

listenerRouteChange((route: RouteLocationNormalized) => {
  // 先判断tabList中是否有首页，如果没有首页先添加首页进去
  if (tabStore.getTabList.findIndex((i) => i.path == homeRoute?.path) == -1) {
    tabStore.addTab(homeRoute)
  }
  const { fullPath } = route
  activeKey.value = fullPath
  // tabList中不存在且不是首页的情况下才添加
  if (
    !tabList.value.some((i) => i.fullPath == fullPath) &&
    !route.meta.isHome &&
    route.path !== '/login'
  ) {
    tabStore.addTab(route)
  }
})

// 点击切换
const handleChange = (val: string) => {
  activeKey.value = val
  const route = tabList.value.find((i) => i.fullPath == val)
  router.push({ path: val, query: route?.query })
}

// 点击关闭
const closeTab = (targetKey: string) => {
  tabStore.closeTabByKey(targetKey, router)
}
</script>
