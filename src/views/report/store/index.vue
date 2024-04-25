<template>
  <BodyLayout :customFn="customFn">
    <template #header><div>头部</div></template>
    <template #content> <div>表格</div> </template>
    <template #footer> <div>底部</div> </template>
  </BodyLayout>
</template>
<script setup lang="ts">
const customFn = ({
  reportTopic,
  isAdvancedQuery,
  isSearch,
  isClickSearch,
  isSize,
  getQueryDefaultScheme,
  getList
}) => {
  // 存在任务id且不是点击查询按钮，说明是分页查询，分页查询不用重新生成任务，调用getList即可，页码值在hooks内部的sizeChange维护了已经
  if (reportTopic.value && isSize) {
    getList()
    return Promise.resolve('进行分页查询即可')
  }
  // 初始第一次查询 isSearch一定是为true
  // isSearch ? getQueryDefaultScheme(isAdvancedQuery, isClickSearch) : getList(isClickSearch)
  return isSearch ? Promise.resolve('高级查询') : Promise.resolve('分页查询')
}
</script>

<style scoped lang="less"></style>
