<template>
  <BodyLayout>
    <template #content>
      <div class="box" v-longpress="longpress"></div>
      <h1 class="text-24px">长按指令</h1>
      <Codemirror :code="code" width="95%" height="600px" :isShowBtn="false" />
    </template>
  </BodyLayout>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import Codemirror from '/@/components/Codemirror/index.vue'

import { ref } from 'vue'

const longpress = () => {
  console.log('长按提示')
  message.success('长按提示')
}

const code = ref(`/**
 * v-longpress
 * 长按指令，长按时触发事件
 */
import type { Directive, DirectiveBinding } from 'vue'

const longpress: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (typeof binding.value !== 'function') {
      throw '必须传入长按需要执行的函数,callback must be a function'
    }
    // 定义变量
    let pressTimer: any = null
    // 创建计时器（ 2秒后执行函数 ）
    const start = (e: any) => {
      if (e.button) {
        if (e.type === 'click' && e.button !== 0) {
          return
        }
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler(e)
        }, 1000)
      }
    }
    // 取消计时器
    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }
    // 运行函数
    const handler = (e: MouseEvent | TouchEvent) => {
      binding.value(e)
    }
    // 添加事件监听器
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    // 取消计时器
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  }
}

export default longpress
`)
</script>

<style scoped lang="less">
.box {
  width: 200px;
  height: 200px;
  border-radius: 20px;
  background-color: #2d8cf0;
  z-index: 100;
  margin: 30px 5px;
}
</style>
