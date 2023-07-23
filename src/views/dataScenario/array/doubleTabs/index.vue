<template>
  <div v-for="i in list">
    <div :id="activeKey[i.name]">
      <span v-for="k in i.types" style="margin-right: 30px" @click="test(k.type, i.name)">{{
        k.name
      }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from '/@/router'

let list = [
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

let activeKey = convertListToObject(list)

function convertListToObject(list) {
  const result = {}
  for (const item of list) {
    const { name, types } = item
    const defaultValue = types.length > 0 ? types[0].type : undefined
    result[name] = defaultValue
  }
  return result
}
const test = (v, v2) => {
  activeKey[v2] = v
  router.push({ path: '/dashboard' })
}
console.log('测试缓存2')
</script>

<style lang="less" scoped></style>
