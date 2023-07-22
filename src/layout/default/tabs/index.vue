<template>
  <Tabs v-model:activeKey="activeKey" type="editable-card" @edit="onEdit" :hideAdd="true">
    <TabPane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
      <!-- {{ pane.content }} -->
    </TabPane>
  </Tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Tabs, TabPane } from 'ant-design-vue'
import { useTabsStore } from '/@/stores/tab'

const tabsStore = useTabsStore()
console.log(tabsStore)

const panes = ref<{ title: string; content: string; key: string; closable?: boolean }[]>([
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  { title: 'Tab 3', content: 'Content of Tab 3', key: '3' }
])

const activeKey = ref(panes.value[0].key)

const newTabIndex = ref(0)

const remove = (targetKey: string) => {
  console.log(targetKey)
}

const onEdit = (targetKey: string | MouseEvent, action: string) => {
  console.log(targetKey, action)
}
</script>
