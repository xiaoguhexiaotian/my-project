<template>
  <Layout>
    <template #body>
      <RouterView>
        <template #default="{ Component, route }">
          <keep-alive>
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </template>
      </RouterView>
    </template>
  </Layout>
</template>

<script setup lang="ts" name="App">
import Layout from '/@/layout/default/Layout.vue'
</script>

<style lang="less" scoped></style>
