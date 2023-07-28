<template>
  <!-- <div :class="`${prefixCls}`">首页</div> -->
  <TableTemplate>
    <template #content>
      <Codemirror />
    </template>
  </TableTemplate>
</template>

<script lang="ts" setup>
import TableTemplate from '/@/components/TemplateLayout/tableTemplate.vue'
import { useDesign } from '/@/hooks/useDesign'
import Codemirror from '/@/components/Codemirror/index.vue'
import { test } from '/@/api/init/menu'
import { interpolationSubscript } from '/@/utils/study/array'

const res = interpolationSubscript([-1, 0, 3, 5, 9, 12], 4)
console.log(res)

const { prefixCls } = useDesign('home')

test()
// console.log('测试缓存1')
</script>

<style lang="less" scoped></style>
