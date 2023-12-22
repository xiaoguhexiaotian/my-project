<template>
  <div>数据库1:</div>
  <a-button @click="handleAddData">新增</a-button>
  <a-button @click="handleDelete(1)">删除</a-button>
  <a-button @click="handleEdit">修改</a-button>
  <a-button @click="handleQuery(1, 'id')">查找</a-button>
  <div>{{ addRes }}</div>
  <div>{{ deleteRes }}</div>
  <div>{{ queryRes }}</div>
  <div>数据库2:</div>
  <a-button @click="handleAddData2">新增</a-button>
  <a-button @click="handleDelete2(1)">删除</a-button>
  <a-button @click="handleEdit2">修改</a-button>
  <a-button @click="handleQuery2(1, 'id')">查找</a-button>
  <div>{{ addRes2 }}</div>
  <div>{{ deleteRes2 }}</div>
  <div>{{ queryRes2 }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useIndexedDB } from '/@/hooks/database/useIndexedDB'

const dbOption = {
  databaseName: 'test',
  tableName: 'testTable',
  key: 'id',
  index: 'id',
  indexOptions: { unique: true }
}
const { addData, deleteData, queryData, editData } = useIndexedDB(dbOption)
const addRes = ref()
const handleAddData = async () => {
  const res = await addData({
    id: 1,
    name: '我是第一个数据库的值',
    age: 18,
    sex: '男'
  })
  addRes.value = res
}
const deleteRes = ref()
const handleDelete = async (id) => {
  const res = await deleteData(id)
  deleteRes.value = res
}
const queryRes = ref()
const handleQuery = async (key, keypath) => {
  const res = await queryData(key, keypath)
  queryRes.value = res
}
// 如果修改时存在主键id,会自动匹配主键id,否则会往库里新增这条数据,在onsuccess进行特殊处理的情况下
const handleEdit = async () => {
  const params = {
    id: 21,
    name: '我是第一个数据库的值，被修改过',
    age: 18,
    sex: '男',
    hobby: ['吃饭', '睡觉', '打豆豆']
  }
  const res = await editData(params)
  addRes.value = res
}

const dbOption2 = {
  databaseName: 'test2',
  tableName: 'testTable',
  key: 'id',
  index: 'id',
  indexOptions: { unique: true }
}
// 解构时改写抛出方法名即可对不同数据库进行操作
const {
  addData: addData2,
  deleteData: deleteData2,
  queryData: queryData2,
  editData: editData2
} = useIndexedDB(dbOption2)
const addRes2 = ref()
const handleAddData2 = async () => {
  const res = await addData2({
    id: 1,
    name: '我是第二个数据库的值',
    age: 18,
    sex: '女'
  })
  addRes2.value = res
}

const deleteRes2 = ref()
const handleDelete2 = async (id) => {
  const res = await deleteData2(id)
  deleteRes2.value = res
}

const queryRes2 = ref()
const handleQuery2 = async (key, keypath) => {
  const res = await queryData2(key, keypath)
  queryRes2.value = res
}
const handleEdit2 = async () => {
  const params = {
    id: 1,
    name: '我是第二个数据库的值，被修改过',
    age: 18,
    sex: '女',
    hobby: ['吃饭', '睡觉', '打豆豆']
  }
  const res = await editData2(params)
  addRes2.value = res
}
</script>

<style lang="less" scoped></style>
