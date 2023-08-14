<template>
  <a-button @click="http">请求</a-button>
  <!-- 读取文件信息 -->
  <input type="file" name="file" id="fileId" @change="check" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { getMessage } from '/@/api/nodeJs/http'
import { cloneDeep } from 'lodash'
import { createSessionStorage } from '/@/utils/cache/index'

const http = async () => {
  const res = await getMessage()
  console.log(res)
  test1.data = cloneDeep(test2.data)
  test1.data.name = 'test1111111111'
  console.log(test1.data, test2.data)
  sessionStorage.set('test', test1)
}
// 读取文件信息
function check(e) {
  const reader = new FileReader()
  reader.readAsText(e.target.files[0], 'UTF-8')
  reader.onload = function (evt) {
    const fileString = evt.target!.result
    console.log(fileString)
  }
}

const test1 = reactive({
  data: {
    name: 'test1'
  }
})
const test2 = reactive({
  data: {
    name: 'test2'
  }
})

const sessionStorage = createSessionStorage()
console.log(sessionStorage)
</script>

<style lang="less" scoped></style>
