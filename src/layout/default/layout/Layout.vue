<template>
  <Layout style="min-height: 100vh">
    <!-- 左侧菜单封装公用组件使用 -->
    <Layout.Sider
      v-model:collapsed="menuSetting.collapsed"
      collapsible
      v-if="menuSetting.type == MenuTypeEnum.LEFT_TOP"
    />
    <Layout>
      <Layout.Header style="background-color: #edeef0; padding: 0; height: 104px">
        <LayoutHeader
      /></Layout.Header>
      <Layout>
        <Layout.Sider
          v-model:collapsed="menuSetting.collapsed"
          collapsible
          v-if="menuSetting.type == MenuTypeEnum.TOP_LEFT"
        />
        <Layout>
          <Layout.Content>
            <slot name="body"></slot>
          </Layout.Content>
          <Layout.Footer>底部</Layout.Footer>
        </Layout>
      </Layout>
    </Layout>
  </Layout>
</template>
<script lang="ts" setup>
import { Layout } from 'ant-design-vue'
import LayoutHeader from '/@/layout/default/layout/LayoutHeader.vue'
import { MenuTypeEnum } from '/@/enums/MenuTypeEnum'
import { useAppStore } from '/@/stores/app'

const appStore = useAppStore()
const { menuSetting } = appStore.getProjectConfig
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
