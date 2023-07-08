<template>
  <div :class="prefixCls">这是头部</div>
</template>
<script setup lang="ts">
import { useDesign } from '/@/hooks/useDesign'

const { prefixCls } = useDesign('header')
</script>

<style scoped lang="less"></style>
