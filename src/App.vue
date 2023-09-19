<template>
  <RouterView>
    <template #default="{ Component, route }">
      <!-- 只有非登录页才嵌套在模板中 -->
      <Layout v-if="route.path !== '/login'">
        <template #body>
          <keep-alive :include="getCache">
            <component :is="compBox(route.fullPath, Component)" :key="route.fullPath" />
          </keep-alive>
        </template>
      </Layout>
      <component v-else :is="Component" :key="route.fullPath" />
    </template>
  </RouterView>
</template>

<script setup lang="ts" name="App">
import { computed, h, watch } from 'vue'
import Layout from '/@/layout/default/layout/Layout.vue'
import { usetabStore } from '/@/stores/tab'
// const compBoxMap = new Map()
// const compBox = (fullPath: string, Component) => {
//   let compBox
//   const compBoxName = fullPath
//   if (compBoxMap.has(compBoxName)) {
//     compBox = compBoxMap.get(compBoxName)
//   } else {
//     compBox = {
//       name: compBoxName,
//       render() {
//         return h('div', Component)
//       }
//     }
//     compBoxMap.set(compBoxName, compBox)
//   }
//   console.log(compBox)
//   return h(compBox)
// }

// 闭包写法，将map集合放在compBoxCache中进行私有化，避免map集合被外部直接访问修改。
const compBoxCache = (() => {
  // 组件盒子集合
  const cache = new Map()
  return {
    get(fullPath: string) {
      return cache.get(fullPath)
    },
    set(fullPath: string, Component) {
      const compBoxName = fullPath
      if (!cache.has(compBoxName)) {
        // 这样就可以实现多个相同页面单独缓存，不会存在刷新一个页面的同时，其他页面也刷新
        // 根据全路径和页面组件生成一个由全路径作为组件name的盒子
        const compBox = {
          name: compBoxName,
          render() {
            return h('div', { class: 'comp-box' }, Component)
          }
        }
        cache.set(compBoxName, compBox)
      }
      return cache.get(compBoxName)
    }
  }
})()

const compBox = (fullPath: string, Component) => {
  return compBoxCache.set(fullPath, Component)
}

const tabStore = usetabStore()

const getCache = computed(() => {
  return [...tabStore.getCacheList]
})

watch(
  () => getCache,
  () => {
    console.log(getCache.value)
  },
  { deep: true }
)
</script>

<style lang="less" scoped></style>
