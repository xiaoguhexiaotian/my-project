<template>
  <div :class="`${prefixCls}`">首页</div>
</template>

<script lang="ts" setup>
import { useDesign } from '/@/hooks/useDesign'
import { test } from '/@/api/init/menu'

const { prefixCls } = useDesign('home')

test()
</script>

<style lang="less" scoped></style>
