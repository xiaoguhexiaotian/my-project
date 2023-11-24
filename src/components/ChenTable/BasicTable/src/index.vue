<template>
  <div :class="prefixCls" :style="{ height: getHeight as string }">
    <Spin :tip="loadingText" :spinning="loading">
      <Grid v-bind="props"> </Grid>
    </Spin>
  </div>
</template>

<script lang="ts" setup>
import { Spin } from 'ant-design-vue'
import { useDesign } from '/@/hooks/useDesign'
import { isNumber } from '/@/utils/is'
import { computed } from 'vue'
import { Grid } from 'vxe-table'
import { vxeProps } from '/@/components/ChenTable/BasicTable/src/types/propsData'
// 类名
const { prefixCls } = useDesign('basic-table')
// props
const props = defineProps(vxeProps())
console.log(props, 1111)
const getHeight = computed(() => (isNumber(props.height) ? `${props.height}px` : props.height))
</script>

<style lang="less" scoped></style>
