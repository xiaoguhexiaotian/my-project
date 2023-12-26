<template>
  <div>
    <Transfer
      v-model:targetKeys="rightData"
      v-model:selected-keys="selectedKeys"
      @change="transferChange"
    >
      <template #children="{ direction }">
        <Tree
          v-if="direction == 'left'"
          v-model:checkedKeys="leftCheckedKeys"
          autoExpandParent
          defaultExpandAll
          checkable
          :tree-data="treeData"
        >
          <template #title="{ title }">
            <span>{{ title }}</span>
          </template>
        </Tree>
        <Tree
          v-else
          v-model:checkedKeys="rightCheckedKeys"
          autoExpandParent
          defaultExpandAll
          checkable
          :tree-data="rightTreeData"
        >
          <template #title="{ title }">
            <span>{{ title }}</span>
          </template>
        </Tree>
      </template>
    </Transfer>
  </div>
</template>
<script lang="ts" setup>
import type { TreeProps } from 'ant-design-vue'
import { Transfer, Tree } from 'ant-design-vue'
import { ref, watch } from 'vue'
import { uniqBy } from 'lodash-es'
import { searchTree, toTreeArray, toArrayTree } from 'xe-utils'

const treeData = ref<any>([
  {
    pid: 0,
    id: 1,
    title: 'Node 1',
    children: [
      {
        pid: 1,
        id: 2,
        title: 'Node 1.1',
        children: [
          {
            pid: 2,
            id: 3,
            title: 'Node 1.1.1'
          },
          {
            pid: 2,
            id: 4,
            title: 'Node 1.1.2'
          }
        ]
      },
      {
        pid: 1,
        id: 5,
        title: 'Node 1.2',
        children: [
          {
            pid: 5,
            id: 6,
            title: 'Node 1.2.1'
          }
        ]
      }
    ]
  },
  {
    pid: 0,
    id: 7,
    title: 'Node 2',
    children: [
      {
        pid: 7,
        id: 8,
        title: 'Node 2.1',
        children: [
          {
            pid: 8,
            id: 9,
            title: 'Node 2.1.1'
          }
        ]
      },
      {
        pid: 7,
        id: 10,
        title: 'Node 2.2',
        children: [
          {
            pid: 10,
            id: 11,
            title: 'Node 2.2.1'
          },
          {
            pid: 10,
            id: 12,
            title: 'Node 2.2.2'
          }
        ]
      }
    ]
  }
])
// 递归，初始数据加工，补全组件参数
const addAttribute = (tree: TreeProps['treeData'], disabled: boolean) => {
  tree = tree?.map((item) => {
    item.isEdit = false
    item.key = item.id || item.key
    item.id = item.id || item.key
    item.title = item.name || item.title
    item.disableCheckbox = disabled
    if (item.children && item.children.length > 0) {
      addAttribute(item.children, disabled)
    } else {
      item.children = []
    }
    return item
  })
  return tree
}
treeData.value = addAttribute(treeData.value, false)

const selectedKeys = ref<any>([]) // 选中的数据
const leftCheckedKeys = ref<any>([]) //左边选中的数据

const rightData = ref<any>([]) // 右边目标数据
const rightTreeData = ref<any>([]) // 右边总数据
const rightCheckedKeys = ref<any>([]) // 右边选中的数据

/**
 *
 * @param masterTree 主树
 * @param secondaryTree 次树
 * @param checkKeys 当前方向选中的节点
 * @returns { masterTree, secondaryTree }
 */
const changeTreeData = (masterTree, secondaryTree, checkKeys) => {
  // 根据选中的节点在对应的方向找到对应的树
  let temporaryData: any = searchTree(masterTree, (i) => checkKeys.includes(i.id))
  // 把反方向的已有的数据和新找到的数据合并并去重
  let allData = uniqBy([...toTreeArray(secondaryTree), ...toTreeArray(temporaryData)], 'id')
  // 重新生成树
  secondaryTree = toArrayTree(allData, { key: 'id', parentKey: 'pid' })
  // 先将树展平，过滤掉所有选中的节点，然后再转化树
  masterTree = toArrayTree(
    toTreeArray(masterTree).filter((i) => !checkKeys.includes(i.id)),
    { key: 'id', parentKey: 'pid' }
  )
  return { masterTree, secondaryTree }
}

// 穿梭监听
const transferChange = (_targetKeys, direction) => {
  if (direction == 'right') {
    const { masterTree, secondaryTree } = changeTreeData(
      treeData.value,
      rightTreeData.value,
      leftCheckedKeys.value
    )
    treeData.value = masterTree
    rightTreeData.value = secondaryTree
  }
  if (direction == 'left') {
    const { masterTree, secondaryTree } = changeTreeData(
      rightTreeData.value,
      treeData.value,
      rightCheckedKeys.value
    )
    rightTreeData.value = masterTree
    treeData.value = secondaryTree
  }
  leftCheckedKeys.value = []
  rightCheckedKeys.value = []
}

watch(
  () => [leftCheckedKeys.value, rightCheckedKeys.value],
  () => {
    // selectedKeys有值时，穿梭按钮解锁
    selectedKeys.value = [...leftCheckedKeys.value, ...rightCheckedKeys.value]
  },
  { deep: true, immediate: true }
)
</script>
