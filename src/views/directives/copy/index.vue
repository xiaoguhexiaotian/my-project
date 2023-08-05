<template>
  <div>
    <span class="copy"> {{ data }}</span>
    <Button v-copy>copy</Button>
  </div>
  <Textarea class="copy" v-model:value="data2" style="width: 180px" />
  <Button v-copy class="copy2">copy2</Button>
  <div class="copy copy3" v-copy>这是一个单独的div盒子</div>

  <h1 class="text-24px copy copy4" v-copy>copy自定义指令</h1>
  <Codemirror :code="code" width="95%" height="600px" :isShowBtn="false" />
</template>
<script setup lang="ts">
import { Button, Textarea } from 'ant-design-vue'
import { ref } from 'vue'
import Codemirror from '/@/components/Codemirror/index.vue'
const data = ref('这是一段被复制的话')
const data2 = ref(10)

const code = ref(`/**
 * v-copy
 * 复制某个值至剪贴板
 */
import type { Directive } from 'vue'
import { message } from 'ant-design-vue'

interface ElType extends Element {
  copyData?: string | number
  __handleClick__?: any
  value?: string
}

const copy: Directive = {
  mounted(el: ElType) {
    el.addEventListener('click', handleCopy)
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.__handleClick__)
  }
}

async function handleCopy(this: any) {
  // 获取页面上所有有copy类名的元素
  const allTarget = document.querySelectorAll('.copy')
  // 具体复制的元素的下标
  let index: number = 0
  // copy目标
  let copyTarget: ElType
  // 当页面上多个元素都需要复制时，需要给绑定指令的元素添加类名，且类名必须在最后。规则为复制的内容在所有用有copy类名的顺序，例如页面上第二个有copy的元素，则添加copy2类名
  // 判断指令元素是否添加了类名，如有添加则需要找到对应的下标，这样才能正确的找到需要copy的目标
  if (this.className.indexOf('copy') > -1) {
    let classList = this.className.split(' ').pop()
    index = Number(classList.slice(-1) - 1)
    // 当index大于copy类名的数量时或者为NaN时说明使用错误
    if (index >= allTarget.length || isNaN(index)) {
      throw new Error(\`\${this.className}指令类名错误\`)
    }
  }
  index == 0 ? (copyTarget = allTarget![0]) : (copyTarget = allTarget![index])
  // copy数据
  let copyData: string
  // DOM结构上存在value说明有绑定的值，这时候直接取value，否则直接取DOM结构的textContent
  copyTarget!.value ? (copyData = copyTarget!.value) : (copyData = copyTarget!.textContent!)
  // 复制到剪贴板
  await navigator.clipboard
    .writeText(copyData)
    .then(() => {
      message.success(\`复制成功：\${copyData}\`)
    })
    .catch((err) => console.log('复制失败！', err))
}

export default copy
`)
</script>

<style scoped lang="less"></style>
