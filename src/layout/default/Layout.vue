<template>
  <Layout style="min-height: 100vh">
    <Layout.Sider v-model:collapsed="collapsed" collapsible></Layout.Sider>
    <Layout>
      <Layout.Header style="background-color: gray; padding: 0"> <LayoutHeader /></Layout.Header>
      <Layout.Content>内容</Layout.Content>
      <Layout.Footer>底部</Layout.Footer>
    </Layout>
  </Layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Layout } from 'ant-design-vue'
import LayoutHeader from '/@/layout/default/LayoutHeader.vue'

const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>(['1'])
</script>
<style>
#components-Layout.demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-Layout.background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-Layout.background {
  background: #141414;
}
</style>
