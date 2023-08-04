<template>
  <TableTemplate>
    <template #content>
      <h1 class="text-24px">排序数组二分查找</h1>
      <Codemirror :code="code" height="600px" width="95%" />
      <h1 class="text-24px">排序数组搜索插入位置</h1>
      <Codemirror :code="code2" height="600px" width="95%" />
      <h1 class="text-24px">在排序数组中查找元素的第一个和最后一个位置</h1>
      <Codemirror :code="code3" height="600px" width="95%" />
    </template>
  </TableTemplate>
</template>
<script lang="ts" setup>
import Codemirror from '/@/components/Codemirror/index.vue'
import { ref } from 'vue'
import TableTemplate from '/@/components/TemplateLayout/tableTemplate.vue'

const code = ref(`function test() {

  const createArray = (length = 100) => {
    let array = [];
    for (let i = 0; i < length; i++) {
      let num = Math.floor(Math.random() * 19999) - 9999;
      array.includes(num) ? i-- : array.push(num);
    }
    array = array.sort((a, b) => a - b);
    return array;
  };
  let nums = createArray();
  let target = nums[Math.floor(Math.random() * nums.length)];

  function binarySearch(nums, target) {
    let mid,
        left = 0,
        right = nums.length - 1
      while(left <= right) {
        mid = Math.floor((left + right) / 2)
          if(nums[mid] < target){
            left = mid + 1
          }else if(nums[mid] > target){
            right = mid - 1
          }else{
            return mid
          }
        }
    return -1
  }
  const res = binarySearch(nums, target)
  console.log('随机数组====>',nums,'需要查询的值====>',target,'结果====>',res)
}
test()
`)

const code2 = ref(`function test() {

  const createArray = (length = 100,size = 100) => {
    let array = []
    for(let i = 0; i < length; i++) {
      let num = Math.floor(Math.random() * size)
      array.includes(num) ? i-- : array.push(num)
    }
    array.sort((a,b) => a - b)
    return array
  }
  const nums = createArray(10,10000)
  const target = Math.floor(Math.random() * 10000)

  const interpolationSubscript = (nums,target) => {
    let mid,
        left = 0,
        right = nums.length - 1
      while(left <= right){
        mid = Math.floor((left + right) / 2)
        if(nums[mid] < target){
          left = mid + 1
        }else if(nums[mid] > target){
          right = mid - 1
        }else if(nums[mid] == target){
          return mid
        }
      }
      return left
  }

 const res = interpolationSubscript(nums, target)

  console.log('随机数组====>',nums,'需要查询的值====>',target,'结果',res)
}
test()`)
const code3 = ref(`function test() {
  const createArray = (length = 100,size = 1000)=>{
    let array = []
    for(let i = 0; i < length;i++) {
      let res = Math.floor(Math.random() * size)
      array.push(res)
    }
    return array.sort((a,b) => a - b)
  }

  const nums = createArray(100,1000)
  const target = Math.floor(Math.random() * 1000)

  // 输入：nums = [5,7,7,8,8,10], target = 8
  // 输出：[3,4]   
  
  const searchRange = (nums, target)=>{
    let mid,
        left = 0,
        right = nums.length
    let arr = []
    while(left <= right){
      mid = Math.floor((left + right) / 2)
      if(nums[mid] < target){
        left = mid + 1
      }else if(nums[mid] > target){
        right = mid - 1
      }else {
        arr.push(mid)
      }
    }

    
    return [1,-1]
  }
  const res = searchRange(nums,target)

  console.log('随机数组====>',nums,'需要查询的值====>',target,'结果',res)
}
test()`)
</script>

<style lang="less" scoped></style>
