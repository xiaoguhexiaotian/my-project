<template>
  <InputSearch
    v-if="presetType == InputEnum.SEARCH"
    v-bind="$attrs"
    v-model:value="modelValue"
    :style="{ width: `${width}px` }"
    @input="input"
    @search="search"
  />
  <InputPassword
    v-else-if="presetType == InputEnum.PASSWORD"
    v-bind="$attrs"
    v-model:value="modelValue"
    :style="{ width: `${width}px` }"
    @input="input"
  />
  <InputNumber
    v-else-if="presetType == InputEnum.NUMBER"
    v-bind="$attrs"
    v-model:value="modelValue"
    :style="{ width: `${width}px` }"
    @change="change"
  />
  <Input
    v-else
    v-bind="$attrs"
    v-model:value="modelValue"
    :style="{ width: `${width}px` }"
    @input="input"
  />
</template>

<script lang="ts">
export default {
  name: 'ChenAInput'
}
</script>
<script lang="ts" setup>
import { Input, InputSearch, InputPassword, InputNumber } from 'ant-design-vue'
import { ref, watch } from 'vue'
import { propTypes } from '/@/utils/propTypes'
import { InputEnum } from './enum'
// 入参

const props = defineProps({
  /** 值 */
  modelValue: propTypes.oneOfType([String, Number]),
  /** 宽度 */
  width: propTypes.oneOfType([propTypes.number, propTypes.string]).def('180'),
  /** 类型 */
  presetType: propTypes.string,
  /** 大小写提示 */
  isCapsTip: propTypes.bool.def(false),
})
// emit事件

const emit = defineEmits(['update:modelValue', 'input', 'search', 'change'])

// 变量区域

const modelValue = ref<string | number>('')
// 方法区域

/** 输入 */
const input = (e: Event) => {
  const targetValue = (e.target as HTMLInputElement).value
  console.log(navigator,22222222222)
  emit('update:modelValue', modelValue.value)
  emit('input', targetValue)
}
/** 搜索 */
const search = (value: string | number) => {
  emit('search', value)
}
/** 值变化 */
const change = (value: string | number) => {
  emit('update:modelValue', modelValue.value)
  emit('change', value)
}
/** 监听 */
watch(
  () => props.modelValue,
  (v) => {
    modelValue.value = v!
    emit('update:modelValue', v)
  },
  { immediate: true }
)
</script>

<style lang="less" scoped></style>
