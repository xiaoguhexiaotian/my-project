<template>
  <div>
    <span class="copy"> {{ data }}</span>
    <Button v-copy="0">copy</Button>
    <span>{{ comment.content + `来自于${comment.contentTmie}` }}</span>
  </div>
  <Textarea class="copy" v-model:value="data2" style="width: 180px" />
  <Button v-copy="1">copy2</Button>
  <div class="copy" v-copy="2">这是一个单独的div盒子</div>

  <h1 class="text-24px copy" v-copy="3">copy自定义指令</h1>
  <Codemirror :code="code" width="95%" height="600px" :isShowBtn="false" />
</template>
<script setup lang="ts">
import { Button, Textarea } from 'ant-design-vue'
import { ref, reactive } from 'vue'

const data = ref('这是一段被复制的话')
const data2 = ref(10)

const comment = reactive({
  content: '这是一条评论',
  contentTmie: '刚刚',
  createTime: new Date() // 评论的创建时间
})
const update = () => {
  const now = new Date()
  // @ts-check
  const countdown = now - comment.createTime
  if (countdown > 0) {
    const seconds = Math.floor(countdown / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    if (seconds > 60 && seconds < 3600) {
      comment.contentTmie = `${minutes}分钟以前`
    }
    if (minutes > 60 && minutes < 1440) {
      comment.contentTmie = `${hours}个小时以前`
    }
    if (hours > 24 && hours < 720) {
      comment.contentTmie = `${hours}天以前`
    }
    if (days > 30) {
      comment.contentTmie = `${hours}个月以前`
    }
  }
}
setInterval(update, 1000)

console.log(comment)
const code = ref(`/**
 * v-copy
 * 复制某个值至剪贴板
 */
import type { Directive, DirectiveBinding } from 'vue'
import { message } from 'ant-design-vue'

interface ElType extends Element {
  copyData?: string | number
  copyIndex?: number | string
  __handleClick__?: any
  value?: string
}

const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyIndex = binding.value
    // 传值必须为number了类型或者字符串类型的数字
    if (Number.isNaN(Number(binding.value))) throw new Error('v-copy指令值类型错误')
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
  let index: number = this.copyIndex
  // 当index大于copy类名的数量时或者为NaN时说明使用错误
  if (index >= allTarget.length || isNaN(index)) {
    throw new Error('v-copy指令传值错误')
  }
  // copy目标
  const copyTarget: ElType = allTarget![index]
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
