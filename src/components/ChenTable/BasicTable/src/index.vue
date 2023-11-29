<template>
  <div :class="prefixCls" :style="{ height: getHeight as string }">
    <Spin :tip="loadingText" :spinning="loading">
      <Grid ref="grid" v-bind="finallyProps">
        <template #empty>
          <div style="height: 400px">自定义的空白页</div>
        </template>
      </Grid>
    </Spin>
  </div>
</template>

<script lang="ts" setup>
import { Spin } from 'ant-design-vue'
import { useDesign } from '/@/hooks/useDesign'
import { isNumber } from '/@/utils/is'
import { computed, ref } from 'vue'
import { Grid } from 'vxe-table'
import { vxeProps } from '/@/components/ChenTable/BasicTable/src/types/propsData'
import { useFinallyProps } from './hooks/useFinallyProps.ts'
// 类名
const { prefixCls } = useDesign('basic-table')
// props
const props = defineProps(vxeProps())
// 表格实例
const grid = ref()
// 处理通用列
const finallyProps = useFinallyProps(props, grid)

console.log('表格最终props=================>', finallyProps)
const getHeight = computed(() => (isNumber(props.height) ? `${props.height}px` : props.height))
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-basic-table';
.@{prefix-cls} {
  .ant-spin-nested-loading {
    height: 100%;
    /deep/.ant-spin-container {
      height: 100%;
    }
  }
}
</style>
