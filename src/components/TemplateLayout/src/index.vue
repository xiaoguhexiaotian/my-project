<template>
  <!-- 上 -->
  <div class="billFormHeader" ref="billFormHeader">
    <slot name="header"></slot>
  </div>
  <!-- 中 -->
  <div
    class="billFormContent"
    ref="billFormContent"
    v-if="paymentType == 0 || paymentType == 1 || paymentType == 4"
  >
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
  <!-- 下 -->
  <div class="billFormFooter" ref="billFormFooter">
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BodyLayout'
}
</script>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useElementBounding, useWindowSize } from '@vueuse/core'
import { propTypes } from '/@/utils/propTypes'

const props = defineProps({
  contenMinHeight: propTypes.string.def('222px'),
  paymentType: propTypes.number.def(0),
  extraHeight: propTypes.number.def(0)
})

const BODY_HEADER_HEIGHT = 65

const billFormHeader = ref()
const billFormFooter = ref()

const BILL_HEADER_HEIGHT = useElementBounding(billFormHeader).height
const BILL_FOOTER_HEIGHT = useElementBounding(billFormFooter).height

const MARGIN = 32
const PADDING = 16

const { height } = useWindowSize()

let contentMaxHeight = computed<string>(() => {
  return `${
    height.value -
    BILL_HEADER_HEIGHT.value -
    props.extraHeight -
    BILL_FOOTER_HEIGHT.value -
    BODY_HEADER_HEIGHT -
    MARGIN -
    PADDING -
    48 +
    9
  }px`
})
// console.log(contentMaxHeight)
</script>

<style lang="less" scoped>
.billFormContent {
  height: v-bind('contentMaxHeight');
  max-height: v-bind('contentMaxHeight');
  min-height: v-bind('props.contenMinHeight');
}
.content {
  height: 100%;
  overflow: auto;
}
/*滚动条样式*/
.content::-webkit-scrollbar {
  width: 8px;
}
.content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba#D8D8D8;
  background: rgba(0, 0, 0, 0.2);
}
.content::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba#D8D8D8;
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>
