<template>
  <BodyLayout>
    <template #content>
      <ChenSelect v-model:value="id" :options="data" width="300px" isShowDropdownRender />
    </template>
  </BodyLayout>
</template>

<script lang="ts" setup>
import { ChenSelect } from '/@/components/ChenSelect'
import { ref } from 'vue'

const id = ref<string>('')
const data = ref<{ id: string; name: string; lable: string; value: string }[]>([
  { id: '1', name: 'John', lable: 'John', value: '1' },
  { id: '2', name: 'Jane', lable: 'Jane', value: '2' },
  { id: '3', name: 'Mike', lable: 'Mike', value: '3' },
  { id: '4', name: 'Lisa', lable: 'Lisa', value: '4' },
  { id: '5', name: 'Tom', lable: 'Tom', value: '5' }
])
</script>

<style lang="less" scoped></style>
