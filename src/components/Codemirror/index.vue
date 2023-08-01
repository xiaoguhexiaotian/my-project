<template>
  <div class="main">
    <CodeMirror
      placeholder="Please enter the code..."
      v-model="codeVal"
      basic
      :style="{ height: height, width: width }"
      :indent-with-tab="true"
      :tabSize="2"
      :extensions="extensions"
    />
    <Button type="primary" @click="handle" v-if="isShowBtn">执行</Button>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CodeMirror from 'vue-codemirror6'
import { oneDark } from '@codemirror/theme-one-dark'
import { javascript } from '@codemirror/lang-javascript'
import { autocompletion } from '@codemirror/autocomplete'
import { Button } from 'ant-design-vue'
import { propTypes } from '/@/utils/propTypes'

const { code } = defineProps({
  code: propTypes.string, // 页面代码
  height: propTypes.string.def('400px'),
  width: propTypes.string.def('700px'),
  isShowBtn: propTypes.bool.def(true)
})

// 初始化
const codeVal = ref(`function test() {
  const param = 'gggg'
  const test = (param)=>{
    console.log(param)
  }
  test(param)
}`)

const handle = () => {
  try {
    const func = new Function(`return ${codeVal.value}`)()
    func()
  } catch (error) {
    console.error('error: ' + error)
    return null
  }
}

// 扩展
const extensions = [javascript(), oneDark, autocompletion()]
const init = () => {
  if (code) codeVal.value = code
}

onMounted(() => {
  init()
})
</script>

<style>
/* required! */
.cm-editor {
  height: 100%;
}
</style>
