<template>
  <BodyLayout>
    <template #header>
      <div class="">基础表格</div>
    </template>
    <template #content>
      <ChenBasicTable v-bind="tableConfig" />
    </template>
  </BodyLayout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ChenBasicTable } from '/@/components/ChenTable/BasicTable/index'
import { columns } from './data.ts'

const tableConfig = reactive<any>({
  columns,
  data: [
    {
      id: 10001,
      name: 'Test1',
      nickname: 'T1',
      role: 'Develop',
      sex: 'Man',
      age: 28,
      address: 'Shenzhen'
    },
    {
      id: 10002,
      name: 'Test2',
      nickname: 'T2',
      role: 'Test',
      sex: 'Women',
      age: 22,
      address: 'Guangzhou'
    },
    {
      id: 10003,
      name: 'Test3',
      nickname: 'T3',
      role: 'PM',
      sex: 'Man',
      age: 32,
      address: 'Shanghai'
    },
    {
      id: 10004,
      name: 'Test4',
      nickname: 'T4',
      role: 'Designer',
      sex: 'Women',
      age: 23,
      address: 'Shenzhen'
    },
    {
      id: 10005,
      name: 'Test5',
      nickname: 'T5',
      role: 'Develop',
      sex: 'Women',
      age: 30,
      address: 'Shanghai'
    },
    {
      id: 10006,
      name: 'Test6',
      nickname: 'T6',
      role: 'Designer',
      sex: 'Women',
      age: 21,
      address: 'Shenzhen'
    },
    {
      id: 10007,
      name: 'Test7',
      nickname: 'T7',
      role: 'Test',
      sex: 'Man',
      age: 29,
      address: 'Shenzhen'
    },
    {
      id: 10008,
      name: 'Test8',
      nickname: 'T8',
      role: 'Develop',
      sex: 'Man',
      age: 35,
      address: 'Shenzhen'
    }
  ],
  rowNumber: true,
  rowSelection: false,
  editDisabled: true,
  isShowPager: true,
  height: '100%'
})
</script>

<style lang="less" scoped></style>
