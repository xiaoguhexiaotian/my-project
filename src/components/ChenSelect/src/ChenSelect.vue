<template>
  <Select v-bind="$attrs" :style="{ width }" @change="change" :options="options" />
</template>

<script lang="ts" setup>
import { Select } from 'ant-design-vue'
import { ComponentProps,SelectEmits } from './types/type'
import { useSelect } from './hooks/useSelect'

const props = defineProps(ComponentProps())

const emit = defineEmits(SelectEmits)

const { change } = useSelect(props,emit) 

</script>

<style lang="less" scoped></style>
