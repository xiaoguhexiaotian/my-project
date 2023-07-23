<template>
  <!-- <div :class="`${prefixCls}`">首页</div> -->
  <TableTemplate>
    <template #content>
      <HomeView />
    </template>
  </TableTemplate>
</template>

<script lang="ts" setup>
import TableTemplate from '/@/components/TemplateLayout/tableTemplate.vue'
import { useDesign } from '/@/hooks/useDesign'
import HomeView from '/@/layout/page/HomeView.vue'
import { test } from '/@/api/init/menu'

const { prefixCls } = useDesign('home')

test()
console.log('测试缓存1')
</script>

<style lang="less" scoped></style>
