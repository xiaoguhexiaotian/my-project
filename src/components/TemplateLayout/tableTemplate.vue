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
    <slot name="content"></slot>
  </div>
  <!-- 下 -->
  <div class="billFormFooter" ref="billFormFooter">
    <slot name="footer"></slot>
  </div>
</template>

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
    38
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
</style>
