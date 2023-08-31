<template>
  <!-- <div :class="`${prefixCls}`">首页</div> -->
  <TableTemplate>
    <template #content>
      <ChenInput />
      <h1 class="text-28px">还没想好写啥</h1>
      <a-button @click="search">查询</a-button>
      <a-table :dataSource="dataSource" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-popconfirm
              v-if="dataSource.length"
              title="确认删除该用户?"
              @confirm="handleDelete(record._id)"
            >
              <a>删除</a>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </template>
  </TableTemplate>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TableTemplate from '/@/components/TemplateLayout/tableTemplate.vue'
import { useDesign } from '/@/hooks/useDesign'
import { getUserList, delUser } from '/@/api/user/user'

const { prefixCls } = useDesign('home')

const dataSource = ref([])
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '密码',
    dataIndex: 'password',
    key: 'password'
  },
  {
    title: '操作',
    key: 'action'
  }
]

// 列表查询
const search = async () => {
  const res = await getUserList()
  try {
    if (res.success) {
      dataSource.value = res.result.records
    }
  } catch (e) {
    console.log(e)
  }
}
// 删除
const handleDelete = async (id) => {
  const res = await delUser({ id })
  if (res.success) {
    search()
  }
  console.log(res)
}
</script>

<style lang="less" scoped></style>
