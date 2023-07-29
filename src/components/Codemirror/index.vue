<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    ref="cmRef"
    height="400"
    width="600"
    @change="onChange"
    @input="onInput"
    @ready="onReady"
  >
  </Codemirror>
  <a-button @click="handle">执行</a-button>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
// import 'codemirror/mode/javascript/javascript.js'
import Codemirror from 'codemirror-editor-vue3'
import type { CmComponentRef } from 'codemirror-editor-vue3'
import type { Editor, EditorConfiguration } from 'codemirror'

const code = ref(
  `function tttt (param)  {
    console.log(param)
  }
  param = [3,5,7]
`
)
const cmRef = ref<CmComponentRef>()
const cmOptions: EditorConfiguration = {
  mode: 'text/javascript'
}

const onChange = (val: string, cm: Editor) => {
  // console.log(val)
  // console.log(cm.getValue())
}

const onInput = (val: string) => {
  // console.log(val)
}

const onReady = (cm: Editor) => {
  // console.log(cm.focus())
}

const isJson = (param) => {
  try {
    JSON.parse(param)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const handle = () => {
  try {
    let param = code.value.split('param = ')[1]
    const func = new Function(`return ${code.value.split('param = ')[0].trim()}`)
    if (isJson(param)) param = JSON.parse(param)
    return func()(param)
  } catch (error) {
    return null
  }
}

onMounted(() => {
  // setTimeout(() => {
  //   cmRef.value?.refresh()
  // }, 1000)
  // setTimeout(() => {
  //   cmRef.value?.resize(300, 200)
  // }, 2000)
  // setTimeout(() => {
  //   cmRef.value?.cminstance.isClean()
  // }, 3000)
})

onUnmounted(() => {
  cmRef.value?.destroy()
})
</script>
