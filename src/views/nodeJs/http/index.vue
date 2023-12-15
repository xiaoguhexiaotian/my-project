<template>
  <a-button @click="http">请求</a-button>
  <!-- 读取文件信息 -->
  <input type="file" name="file" id="fileId" @change="check" />

  <a-select
    ref="select"
    v-model:value="value1"
    style="width: 120px"
    @focus="focus"
    @change="handleChange"
    :defaultOpen="true"
    v-scroll
  >
    <a-select-option value="jack">Jack</a-select-option>
    <a-select-option value="lucy">Lucy</a-select-option>
    <a-select-option value="disabled" disabled>Disabled</a-select-option>
    <a-select-option value="Yiming2he">yiminghe</a-select-option>
    <a-select-option value="Yimi5nghe">yiminghe</a-select-option>
    <a-select-option value="Yimi7n7ghe">yiminghe</a-select-option>
    <a-select-option value="Yim3inghe">yiminghe</a-select-option>
    <a-select-option value="Yimin7ghe">yiminghe</a-select-option>
    <a-select-option value="Yim5inghe">yiminghe</a-select-option>
    <a-select-option value="Yimi7nghe">yiminghe</a-select-option>
    <a-select-option value="Yimi3nghe">yiminghe</a-select-option>
    <a-select-option value="Yimi79nghe">yiminghe</a-select-option>
    <a-select-option value="Yim98inghe">yiminghe</a-select-option>
    <a-select-option value="Yimi98nghe">yiminghe</a-select-option>
  </a-select>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { getMessage } from '/@/api/nodeJs/http'
import { cloneDeep } from 'lodash'
import { createLocalStorage } from '/@/utils/cache/index'

const http = async () => {
  const res = await getMessage()
  console.log(res)
  test1.data = cloneDeep(test2.data)
  test1.data.name = 'test1111111111'
  console.log(test1.data, test2.data)
  localStorage.set('test', test1)
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

const localStorage = createLocalStorage()
console.log(localStorage)
</script>

<style lang="less" scoped></style>
