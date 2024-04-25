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
    <button @click="sizeChange">size</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BodyLayout'
}
</script>
<script lang="ts" setup>
import { ref, computed, reactive } from 'vue'
import { useElementBounding, useWindowSize } from '@vueuse/core'
import { propTypes } from '/@/utils/propTypes'

const props = defineProps({
  contenMinHeight: propTypes.string.def('222px'),
  paymentType: propTypes.number.def(0),
  extraHeight: propTypes.number.def(0),
  customFn: propTypes.func.isRequired
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
const searchData = reactive<any>({
  data: {},
  page: { current: 1, size: 10 }
})
const reportTopic = ref('')
const _props = ref<any>({})
/**
 * 获取表格数据
 * @param isAdvancedQuery 是否高查
 * @param isSearch 是否查询
 * @param isClickSearch 是否点击查询
 * @param isSize 是否页码操作
 * @param otherReportCode 其他报表码
 */
const getTableData = async (
  isAdvancedQuery: boolean,
  isSearch: boolean,
  isClickSearch = false,
  isSize = false,
  otherReportCode?: string
) => {
  props.customFn!({
    searchData,
    reportTopic,
    isAdvancedQuery,
    isSearch,
    isClickSearch,
    isSize,
    getQueryDefaultScheme,
    getTaskId,
    getList,
    otherReportCode
  }).then((res) => {
    // 初始化
    if (res.isInit) {
      // 初始化需要查询高级默认方案
      if (res.isGetDefScheme) {
        getQueryDefaultScheme(true, res.isClickSearch)
        return
      }
      // 不需要查询高级查询默认方案
      getTaskId(res.isAdvancedQuery)
    }
    // 页码变化
    if (res.isSize) {
      getList()
    }
    // 高级查询 或者 查询
    getTaskId(res.isAdvancedQuery)
  })
}
/**
 * 获取高级查询默认方案
 * @param isAdvancedQuery 是否高查
 * @param isClickSearch 是否点击查询
 * @param otherReportCode 其他报表码
 */
const getQueryDefaultScheme = async (
  isAdvancedQuery: boolean,
  isClickSearch: boolean,
  otherReportCode?: string
) => {
  console.log('getQueryDefaultScheme===>，获取高查默认方案')
  searchData.data = { goodsId: '123', name: '测试商品' }
  // 当有前置条件 且 高查默认方案有前置条件的值时
  if (_props.complexId && searchData.data[_props.complexId]) {
    getTaskId(isAdvancedQuery, isClickSearch, otherReportCode)
  } else if (!_props.complexId) {
    // 不存在必填项时直接创建任务查数据
    getTaskId(isAdvancedQuery, isClickSearch)
  } else {
    isClickSearch ? console.log('emit(提示前置条件不足)') : '初始化是非点击查询，不提示'
  }
}
/**
 * 报表任务创建请求并订阅mqtt消息
 * @param isAdvancedQuery 是否高查
 * @param isClickSearch 是否点击查询
 * @param otherReportCode 其他报表码
 */
const getTaskId = async (
  isAdvancedQuery: boolean,
  isClickSearch: boolean = false,
  otherReportCode?: string
) => {
  let condition: any
  isAdvancedQuery ? (condition = '高级查询条件') : (condition = '普通查询条件')
  reportTopic.value = '任务id'
  console.log('getTaskId===>', condition, searchData)
  getList(isClickSearch, otherReportCode)
}
/**
 * 报表列表查询请求
 * @param isClickSearch 是否点击查询
 * @param otherReportCode 其他报表码
 */
const getList = async (isClickSearch = false, otherReportCode?: string) => {}

getTableData(false, true, true, true)
const sizeChange = () => {
  searchData.page.current++
  // searchData.page.size = 10
  console.log('sizeChange===>')
  getTableData(false, false, false, true)
}
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
