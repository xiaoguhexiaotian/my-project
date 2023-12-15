<template>
  <BodyLayout>
    <template #content>
      <div class="text-24px box">
        <h3>搜索</h3>
        <ChenAInput v-model="inputValue" presetType="search" @input="input" @search="search" />
      </div>
      <div class="text-24px box">
        <h3>密码</h3>
        <ChenAInput v-model="inputValue" presetType="password" @input="input" />
      </div>
      <div class="text-24px box">
        <h3>数字</h3>
        <ChenAInput v-model="inputValue" presetType="number" @change="change" />
      </div>
      <div class="text-24px box">
        <h3>默认</h3>
        <ChenAInput v-model="inputValue" @input="input" />
      </div>
      <div class="text-24px box mb-30px">
        <h3>是否开启大小写提示</h3>
        <ChenAInput v-model="inputValue" @input="input" />
      </div>
      <Codemirror :code="code" :isShowBtn="false" height="600px" width="95%" />
    </template>
  </BodyLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const inputValue = ref(0)
const input = (value: string | number) => {
  console.log('输入', value, inputValue.value)
}
const change = (value: string | number) => {
  console.log('变化', value, inputValue.value)
}
const search = (value: string | number) => {
  console.log('搜索：', value, inputValue.value)
}
function isCaseSensitive() {
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  document.body.appendChild(input);
  input.select();
  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Copy command was " + msg);
    document.body.removeChild(input);
    return successful;
  } catch (err) {
    console.log("Oops, unable to copy");
    document.body.removeChild(input);
    return false;
  }
}

if (isCaseSensitive()) {
  console.log("已开启大小写模式");
} else {
  console.log("未开启大小写模式");
}

const code = ref(`<template>
  <InputSearch
    v-if="presetType == InputEnum.SEARCH"
    v-bind="$attrs"
    v-model:value="modelValue"
    :style="{ width: \`\${width}px\` }"
    @input="input"
    @search="search"
  />
  <InputPassword
    v-else-if="presetType == InputEnum.PASSWORD"
    v-bind="$attrs"
    v-model:value="modelValue"
    :style="{ width: \`\${width}px\` }"
    @input="input"
  />
  <InputNumber
    v-else-if="presetType == InputEnum.NUMBER"
    v-bind="$attrs"
    v-model:value="modelValue"
    :style="{ width: \`\${width}px\` }"
    @change="change"
  />
  <Input
    v-else
    v-bind="$attrs"
    v-model:value="modelValue"
    :style="{ width: \`\${width}px\` }"
    @input="input"
  />
</template>

<script lang="ts">
export default {
  name: 'ChenAInput'
}
<\/script>
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
  presetType: propTypes.string
})
// emit事件

const emit = defineEmits(['update:modelValue', 'input', 'search', 'change'])

// 变量区域

const modelValue = ref<string | number>('')
// 方法区域

/** 输入 */
const input = (e: Event) => {
  const targetValue = (e.target as HTMLInputElement).value
  emit('update:modelValue', modelValue.value)
  emit('input', targetValue)
}
/** 搜索 */
const search = (value: string | number) => {
  console.log(value)
  emit('search', value)
}
/** 值变化 */
const change = (value: string | number) => {
  emit('change', value)
  console.log(value)
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
<\/script>

<style lang="less" scoped></style>
`)
</script>

<style lang="less" scoped></style>
