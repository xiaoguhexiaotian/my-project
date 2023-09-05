<template>
  <div class="main" :style="{ height: height, width: width }">
    <CodeMirror
      class="codeMirror"
      placeholder="Please enter the code..."
      v-model="codeVal"
      basic
      :style="{ height: height, width: width }"
      :indent-with-tab="true"
      :tabSize="2"
      :extensions="extensions"
      scrollbarStyle="simple"
    />
    <Button class="copy-btn" @click="copy">copy</Button>
    <Button type="primary" @click="handle" v-if="isShowBtn">执行</Button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Codemirror'
}
</script>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CodeMirror from 'vue-codemirror6'
import { oneDark } from '@codemirror/theme-one-dark'
import {
  autoCloseTags,
  javascript,
  javascriptLanguage,
  jsxLanguage,
  tsxLanguage,
  typescriptLanguage
} from '@codemirror/lang-javascript'
import { autocompletion } from '@codemirror/autocomplete'
import { Button, message } from 'ant-design-vue'
import { propTypes } from '/@/utils/propTypes'
// import 'codemirror/addon/scroll/simplescrollbars.css'
// import 'codemirror/addon/scroll/simplescrollbars'

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
const extensions = [
  javascript({ jsx: true, typescript: true }),
  typescriptLanguage,
  javascriptLanguage,
  jsxLanguage,
  tsxLanguage,
  autoCloseTags,
  oneDark,
  autocompletion()
]
const init = () => {
  if (code) codeVal.value = code
}

const copy = () => {
  navigator.clipboard
    .writeText(codeVal.value)
    .then(() => {
      message.success(`复制成功`)
    })
    .catch((err) => console.log('复制失败！', err))
}

onMounted(() => {
  init()
})
</script>

<style lang="less">
.main {
  position: relative;
  .copy-btn {
    position: absolute;
    top: 5%;
    right: 10%;
    background: #282c34;
    color: gray;
    border-color: #282c34;
    &:hover {
      border-color: #fff;
      color: #fff;
    }
  }
}
/* required! */
.cm-editor {
  height: 100%;
}

/*滚动条样式*/
.codeMirror::-webkit-scrollbar {
  width: 8px;
}
.codeMirror::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba#D8D8D8;
  background: rgba(0, 0, 0, 0.2);
}
.codeMirror::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba#D8D8D8;
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>
