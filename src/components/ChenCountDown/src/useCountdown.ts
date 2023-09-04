import { ref, unref } from 'vue'
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
