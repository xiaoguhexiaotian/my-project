<template>
  <a-button @click="http">请求</a-button>
</template>

<script lang="ts" setup>
import { getMessage } from '/@/api/nodeJs/http'

const http = async () => {
  const res = await getMessage()
  console.log(res)
}
</script>

<style lang="less" scoped></style>
