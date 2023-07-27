<template>
  <Layout style="min-height: 100vh" :class="`${prefixCls}`">
    <!-- 左侧菜单封装公用组件使用 -->
    <Layout.Sider
      :class="`${prefixCls}-sider`"
      v-model:collapsed="menuSetting.collapsed"
      collapsible
      v-if="menuSetting.type == MenuTypeEnum.LEFT_TOP"
    >
      <Menu :menuData="menuData" />
    </Layout.Sider>
    <Layout>
      <Layout.Header style="background-color: #edeef0; padding: 0; height: 104px">
        <LayoutHeader />
      </Layout.Header>
      <Layout>
        <Layout.Sider
          :class="`${prefixCls}-sider`"
          v-model:collapsed="menuSetting.collapsed"
          collapsible
          v-if="menuSetting.type == MenuTypeEnum.TOP_LEFT"
        >
          <Menu :menuData="menuData" />
        </Layout.Sider>
        <Layout>
          <Layout.Content :class="`${prefixCls}-content`">
            <slot name="body"></slot>
          </Layout.Content>
          <Layout.Footer :class="`${prefixCls}-footer`">底部</Layout.Footer>
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
import Menu from '/@/layout/default/menu/index.vue'
import { menuData } from '/@/router'
import { useDesign } from '/@/hooks/useDesign'
const { prefixCls } = useDesign('layout')

const appStore = useAppStore()
const { menuSetting } = appStore.getProjectConfig
</script>
<style scoped lang="less">
@import '/@/design/sys/layout/index.less';
</style>
