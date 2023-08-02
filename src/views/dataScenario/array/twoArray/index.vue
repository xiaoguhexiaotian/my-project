<template>
  <TableTemplate>
    <template #content>
      <h1 class="text-24px">双数组对象数组方法操作</h1>
      <Codemirror :code="code" height="600px" width="1000px" />
      <h1 class="text-24px">双数组对象Set方法操作</h1>
      <Codemirror :code="code2" height="600px" width="1000px" />
      <h1 class="text-24px">双普通数组Set方法操作</h1>
      <Codemirror :code="code3" height="600px" width="1000px" />
    </template>
  </TableTemplate>
</template>
<script lang="ts" setup>
import Codemirror from '/@/components/Codemirror/index.vue'
import { ref } from 'vue'
import TableTemplate from '/@/components/TemplateLayout/tableTemplate.vue'

const code = ref(`function test() {
  let a = [
    { id: 1, name: 'Object A1', age: 25 },
    { id: 2, name: 'Object A2', age: 30 },
    { id: 3, name: 'Object A3', age: 20 },
    { id: 101, title: 'Object B1', price: 10.99 }
  ]
  let b = [
    { id: 101, title: 'Object B1', price: 10.99 },
    { id: 102, title: 'Object B2', price: 25.49 },
    { id: 103, title: 'Object B3', price: 5.0 }
  ]

  let c = []
  // a,b数组取交集
  a.forEach((i) => {
    if (b.findIndex((item) => item.id === i.id) != -1) c.push(i)
  })
  console.log('a,b数组对象取交集=======>', c)

  // a,b数组取并集
  b.forEach((i) => {
    if (a.findIndex((item) => item.id === i.id) == -1) a.push(i)
  })
  console.log('a,b数组对象取并集=======>', a)

}
test()
`)

const code2 = ref(`function test() {
  let a = [
  { id: 1, name: 'Object A1', age: 25 },
  { id: 2, name: 'Object A2', age: 30 },
  { id: 3, name: 'Object A3', age: 20 },
  { id: 101, title: 'Object B1', price: 10.99 }
]

let b = [
  { id: 101, title: 'Object B1', price: 10.99 },
  { id: 102, title: 'Object B2', price: 25.49 },
  { id: 103, title: 'Object B3', price: 5.0 }
]
function compareArr(a, b) {
  // 将对象数组转换为字符串
  const stringifyObject = (obj) => JSON.stringify(obj)
  // 将字符串转换回对象
  const parseObject = (str) => JSON.parse(str)
  // 将数组中的对象转换为字符串
  const aStringSet = new Set(a.map(stringifyObject))
  const bStringSet = new Set(b.map(stringifyObject))
  // 取交集
  const intersectionSet = new Set([...aStringSet].filter((str) => bStringSet.has(str)))
  // 将交集中的字符串转换回对象
  const intersectionArray = Array.from(intersectionSet).map(parseObject)
  console.log(intersectionArray)
}
compareArr(a, b)
}
test()`)

const code3 = ref(`function test() {
  let a = [1, 2, 3, 4]
  let b = [3, 4, 5, 6]
 function compareArr(arr1 = [], arr2 = []) {   
        const setA = new Set(arr1);
        const setB = new Set(arr2);
        const intersection = new Set([...setA].filter(x => setB.has(x))); // 交集
        const union = new Set([...setA, ...setB]); // 并集
        const differenceA = new Set([...setA].filter(x => !setB.has(x))); // a数组中有而b数组中没有的元素
        const differenceB = new Set([...setB].filter(x => !setA.has(x))); // b数组中有而a数组中没有的元素
        // if (intersection.size === 0) {
        //   return 'a、b不相交'; // a、b不相交
        // } else if (intersection.size === setA.size && intersection.size === setB.size) {
        //   return 'a、b相等';   // a、b相等
        // } else if (intersection.size === setA.size) {
        //   return 'a是子集';  // a是子集
        // } else if (intersection.size === setB.size) {
        //   return 'a是父集'; // a是父集
        // } else {
        //   return 'a、b相交但不包含';// a、b相交但不包含
        // }
        console.log(
          '交集====>', intersection,
          '并集====>',union,
          'a数组中有而b数组中没有的元素====>',differenceA,
          'b数组中有而a数组中没有的元素====>',differenceB)
      } 
 compareArr(a,b)

}
test()`)
</script>

<style lang="less" scoped></style>
