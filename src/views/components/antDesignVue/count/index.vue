<template>
  <CountButton v-model="state" :count="test" />
  <h1 class="text-24px">倒计时组件</h1>
  <Codemirror :code="code" height="600px" width="1000px" :isShowBtn="false" />
  <h1 class="text-24px">倒计时hook</h1>
  <Codemirror :code="code2" height="600px" width="1000px" :isShowBtn="false" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { CountButton } from '/@/components/ChenCountDown/index'

const test = ref(3)

const state = ref(true)

watch(
  () => state.value,
  () => {
    console.log('倒计时状态变化=>', state.value)
  },
  { immediate: true, deep: true }
)

const code = ref(`<template>
  <Button v-bind="$attrs" :disabled="isStart" @click="handleStart" :loading="loading">
    {{ getButtonText }}
  </Button>
</template>
<script lang="ts" name="CountButton" setup>
import { isFunction } from '/@/utils/is'
import { propTypes } from '/@/utils/propTypes'
import { ref, computed, unref } from 'vue'
import { Button } from 'ant-design-vue'
import { useCountdown } from './useCountdown'

const props = defineProps({
  modelValue: propTypes.bool.def(false), // 双向绑定值
  count: propTypes.number.def(60), // 计时数
  beforeStartFunc: propTypes.func.def(null), // 开始计时前额外操作
  startText: propTypes.string.def('开始倒计时') // 计时开始文本
})

const emit = defineEmits(['update:modelValue'])

const loading = ref(false)

const { currentCount, isStart, start } = useCountdown(props.count, emit)

const getButtonText = computed(() => {
  return !unref(isStart) ? props.startText : \`\${unref(currentCount)}后重新获取\`
})

/**
 * @description: 执行前判断是否有外部功能，执行后决定是否启动
 */
async function handleStart() {
  const { beforeStartFunc } = props
  if (beforeStartFunc && isFunction(beforeStartFunc)) {
    loading.value = true
    try {
      const canStart = await beforeStartFunc()
      canStart && start()
    } finally {
      loading.value = false
    }
  } else {
    start()
  }
}
// 当v-model双向绑定的值为true时，则自动开始计时
props.modelValue && start()
<\/script>
`)

const code2 = ref(`import { ref, unref } from 'vue'
import { tryOnUnmounted } from '@vueuse/core'

export function useCountdown(count: number, _emit) {
  // 根据初始值定义一个响应式的当前倒计时变量
  const currentCount = ref(count)
  // 定义倒计时状态
  const isStart = ref(false)
  // 计时器
  let timerId: ReturnType<typeof setInterval> | null
  // 清除计时器
  function clear() {
    timerId && window.clearInterval(timerId)
  }
  // 停止计时但是不会重置计时器的时间
  function stop() {
    isStart.value = false
    clear()
    timerId = null
  }
  // 开始计时
  function start() {
    if (unref(isStart) || !!timerId) {
      return
    }
    isStart.value = true
    _emit('update:modelValue', unref(isStart))
    timerId = setInterval(() => {
      if (unref(currentCount) === 1) {
        stop()
        currentCount.value = count
        _emit('update:modelValue', unref(isStart))
      } else {
        currentCount.value -= 1
      }
    }, 1000)
  }
  // 重置需要将hooks中维护的变量的值也重置
  function reset() {
    currentCount.value = count
    stop()
  }
  // 重新计时，先重置再开始
  function restart() {
    reset()
    start()
  }
  // 组件销毁时清除计时器
  tryOnUnmounted(() => {
    reset()
  })

  return { start, reset, restart, clear, stop, currentCount, isStart }
}
`)
</script>

<style lang="less" scoped></style>
