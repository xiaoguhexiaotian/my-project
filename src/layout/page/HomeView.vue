<template>123</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { VxeGridProps } from 'vxe-table'

interface RowVO {
  id: number
  name: string
  nickname: string
  role: string
  sex: string
  age: number
  address: string
}

const tablePage = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10
})

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  height: 'auto',
  loading: false,
  columnConfig: {
    resizable: true
  },
  data: [],
  columns: [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 50 },
    { field: 'name', title: 'Name' },
    { field: 'nickname', title: 'Nickname' },
    { field: 'role', title: 'Role' },
    { field: 'address', title: 'Address', showOverflow: true }
  ]
})

const findList = () => {
  gridOptions.loading = true
  setTimeout(() => {
    gridOptions.loading = false
    tablePage.total = 20
    gridOptions.data = [
      {
        id: 10001,
        name: 'Test1',
        nickname: 'T1',
        role: 'Develop',
        sex: '1',
        age: 28,
        address: 'Shenzhen'
      },
      {
        id: 10002,
        name: 'Test2',
        nickname: 'T2',
        role: 'Test',
        sex: '0',
        age: 22,
        address: 'Guangzhou'
      },
      {
        id: 10003,
        name: 'Test3',
        nickname: 'T3',
        role: 'PM',
        sex: '1',
        age: 32,
        address: 'Shanghai'
      },
      {
        id: 10004,
        name: 'Test4',
        nickname: 'T4',
        role: 'Designer',
        sex: '0',
        age: 23,
        address: 'Shenzhen'
      },
      {
        id: 10005,
        name: 'Test5',
        nickname: 'T5',
        role: 'Develop',
        sex: '0',
        age: 30,
        address: 'Shanghai'
      },
      {
        id: 10006,
        name: 'Test6',
        nickname: 'T6',
        role: 'Develop',
        sex: '0',
        age: 27,
        address: 'Shanghai'
      },
      {
        id: 10007,
        name: 'Test7',
        nickname: 'T7',
        role: 'Develop',
        sex: '1',
        age: 29,
        address: 'Shenzhen'
      },
      {
        id: 10008,
        name: 'Test8',
        nickname: 'T8',
        role: 'Develop',
        sex: '0',
        age: 32,
        address: 'Shanghai'
      },
      {
        id: 10009,
        name: 'Test9',
        nickname: 'T9',
        role: 'Develop',
        sex: '1',
        age: 30,
        address: 'Shenzhen'
      },
      {
        id: 10010,
        name: 'Test10',
        nickname: 'T10',
        role: 'Develop',
        sex: '0',
        age: 34,
        address: 'Shanghai'
      }
    ]
  }, 300)
}

findList()
</script>
