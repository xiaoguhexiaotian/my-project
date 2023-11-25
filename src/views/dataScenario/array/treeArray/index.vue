<template>
  <BodyLayout>
    <template #content>
      <h1 class="text-24px">手写arrayToTree方法1: 循环加栈</h1>
      <Codemirror :code="code" height="600px" width="1000px" />
      <h1 class="text-24px">手写arrayToTree方法2: 递归函数</h1>
      <Codemirror :code="code2" height="600px" width="1000px" />
    </template>
  </BodyLayout>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const code = ref(`function test() {
  const arrayToTree = (array, option = { id: 'id', pid: 'pid', children: 'children' }) => {
    const treeArray = []
    const map = {}
    array.forEach((item) => {
      map[item[option.id]] = item
      // map = {
      //      1 : { id: 1, name: '节点1', parentId: undefined },
      //      2 : { id: 2, name: '节点2', parentId: 1 },
      //      3 : { id: 3, name: '节点3', parentId: 1 },
      //      4 : { id: 4, name: '节点4', parentId: 2 },
      //      5 : { id: 5, name: '节点5', parentId: 2 },
      //      6 : { id: 6, name: '节点6', parentId: 3 },
      //    }
      // 判断最顶级
      if (item[option.pid] === undefined) {
        treeArray.push(item)
        // treeArray = [{ id: 1, name: '节点1', parentId:  undefined }]
      } else {
        // 在map集合中拿到当前父级对象
        // 对象的指向其实是指向内存地址 : 
        // parent和map[item.pid]是一个对象
        // 这里也可以用浅拷贝的思路来理解 : 
        // 在js中，对象是通过引用进行传递的，而不是通过值进行传递。当 我们将一个对象赋值给另一个变量时，实际上是将对象的引用复制给了新 的变量，而不是创建了一个新的对象副本。
        // 向parent这个对象的option.children数组push子级时,treeArra y中对应的那个对象节点数据也会更新
        const parent = map[item[option.pid]]
        // parent = { id: 1, name: '节点1', parentId: undefined }
        // 判断父级是否存在children,没有则先设置为空数组
        if (!parent[option.children]) parent[option.children] = []
        // parent = { id: 1, name: '节点1', parentId: undefined ,option.children: [] }
        parent[option.children].push(item)
        // parent = { id: 1, name: '节点1', parentId: undefined ,option.children: [{ id: 2, name: '节点2', parentId: 1 }] }
        // treeArray = [{ id: 1, name: '节点1', parentId:  undefined,option.children: [{ id: 2, name: '节点2',  parentId: 1 }] }]
    }
  })
  return treeArray
  } 
  const arr = [
    { id: 1, name: '节点1', parentId: undefined },
    { id: 2, name: '节点2', parentId: 1 },
    { id: 3, name: '节点3', parentId: 1 },
    { id: 4, name: '节点4', parentId: 2 },
    { id: 5, name: '节点5', parentId: 2 },
    { id: 6, name: '节点6', parentId: 3 },
    { id: 7, name: '节点7', parentId: undefined },
    { id: 8, name: '节点8', parentId: 7 },
    { id: 9, name: '节点9', parentId: 7 },
  ]
  let treeArray = []
treeArray.value = arrayToTree(arr,{ id: 'id', pid: 'parentId', children: 'ttttt' })
console.log('arrayToTree======>',treeArray.value)
}
`)

const code2 = ref(`function test() {
   function arrayToTree(arr,pid = undefined, option = { id: 'id', pid: 'pid', children: 'children' }) {
    return arr.reduce((tree, item) => {
      // 当子级的父级id == arrayToTree方法传入的parentId时,往累积器tree写入数据
      if (item[option.pid] === pid) {
        tree.push({ ...item, [option.children]: arrayToTree(arr, item[option.id],option) });
      } else if (!pid) {
        tree.push({ ...item, [option.children]: arrayToTree(arr, item[option.id],option) });
      }
      return tree;
    }, []);
  }

  const arr = [
    { id: 1, name: '节点1', parentId: undefined },
    { id: 2, name: '节点2', parentId: 1 },
    { id: 3, name: '节点3', parentId: 1 },
    { id: 4, name: '节点4', parentId: 2 },
    { id: 5, name: '节点5', parentId: 2 },
    { id: 6, name: '节点6', parentId: 3 },
    { id: 7, name: '节点7', parentId: undefined },
    { id: 8, name: '节点8', parentId: 7 },
    { id: 9, name: '节点9', parentId: 7 },
  ];

  const tree = arrayToTree(arr,undefined,{ id: 'id', pid: 'parentId', children: 'ttttt' }).filter((i) => i.parentId == undefined);
  console.log('arrayToTree=======>',tree);
}
`)
</script>

<style scoped lang="less"></style>
