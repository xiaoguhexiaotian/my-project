<template>
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

const emit = defineEmits(['update:modelValue', 'start'])

const loading = ref(false)

const { currentCount, isStart, start } = useCountdown(props.count, emit)

const getButtonText = computed(() => {
  return !unref(isStart) ? props.startText : `${unref(currentCount)}后重新获取`
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
  emit('start')
}
// 当v-model双向绑定的值为true时，则自动开始计时
props.modelValue && start()
</script>
