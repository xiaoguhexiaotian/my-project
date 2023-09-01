<template>
  <BodyLayout>
    <template #content>
      <div v-for="i in list">
        {{ i.name }}
        <div :id="activeKey[i.name]">
          <Tabs v-model:activeKey="activeKey[i.name]">
            <TabPane :key="k.type" :tab="k.name" v-for="k in i.types" style="margin-right: 30px">
            </TabPane>
          </Tabs>
        </div>
      </div>
      <h1 class="text-24px">循环tabs场景,解决方案根据父级节点的唯一键创建不同tab的key</h1>
      <Codemirror :code="code" />
    </template>
  </BodyLayout>
</template>
<script lang="ts" setup>
import { Tabs, TabPane } from 'ant-design-vue'
import Codemirror from '/@/components/Codemirror/index.vue'
import { ref, watch } from 'vue'

const list = [
  {
    name: 'test1',
    types: [
      { name: 'Type1', type: 1 },
      { name: 'Type2', type: 2 },
      { name: 'Type3', type: 3 }
    ]
  },
  {
    name: 'test2',
    types: [
      { name: 'TypeA', type: 'A' },
      { name: 'TypeB', type: 'B' }
    ]
  },
  {
    name: 'test3',
    types: [
      { name: 'TypeX', type: 'C' },
      { name: 'TypeY', type: 'D' }
    ]
  }
]

const activeKey = ref(convertListToObject(list))

function convertListToObject(list) {
  const result = {}
  for (const item of list) {
    const { name, types } = item
    const defaultValue = types.length > 0 ? types[0].type : undefined
    result[name] = defaultValue
  }
  return result
}

watch(
  () => activeKey.value,
  () => {
    console.log(activeKey.value)
  },
  {
    deep: true
  }
)
// 代码部分
const code = ref(`
<template>
  <div v-for="i in list">
    {{ i.name }}
    <div :id="activeKey[i.name]">
      <Tabs v-model:activeKey="activeKey[i.name]">
        <TabPane :key="k.type" :tab="k.name" v-for="k in i.types" style="margin-right: 30px">
          <Codemirror :code="code" />
        </TabPane>
      </Tabs>
      <!-- <span v-for="k in i.types" style="margin-right: 30px" @click="test(k.type, i.name)">{{
        k.name
      }}</span> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Tabs, TabPane } from 'ant-design-vue'
import Codemirror from '/@/components/Codemirror/index.vue'
import { ref, watch } from 'vue'

const list = [
  {
    name: 'test1',
    types: [
      { name: 'Type1', type: 1 },
      { name: 'Type2', type: 2 },
      { name: 'Type3', type: 3 }
    ]
  },
  {
    name: 'test2',
    types: [
      { name: 'TypeA', type: 'A' },
      { name: 'TypeB', type: 'B' }
    ]
  },
  {
    name: 'test3',
    types: [
      { name: 'TypeX', type: 'C' },
      { name: 'TypeY', type: 'D' }
    ]
  }
]

const activeKey = ref(convertListToObject(list))

function convertListToObject(list) {
  const result = {}
  for (const item of list) {
    const { name, types } = item
    const defaultValue = types.length > 0 ? types[0].type : undefined
    result[name] = defaultValue
  }
  return result
}

watch(
  () => activeKey.value,
  () => {
    console.log(activeKey.value)
  },
  {
    deep: true
  }
)
<\/script>

<style lang="less" scoped></style>
`)
</script>

<style lang="less" scoped></style>
