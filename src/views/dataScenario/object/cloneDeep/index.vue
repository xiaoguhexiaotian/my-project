<template>
  <BodyLayout>
    <template #content>
      <h1 class="text-24px">对象的引用实际是内存地址的引用，深拷贝最终的处理实际上创造新的内存地址来实现创造新的对象</h1>
      <h1 class="text-24px">1、Object.assign实现</h1>
      <Codemirror :code="code" height="300px" width="1000px" />
      <h1 class="text-24px">2、手写cloneDeep</h1>
      <Codemirror :code="code2" height="500px" width="1000px" />
    </template>
  </BodyLayout>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'

// 代码部分
const code = ref(`function cloneDeep() {
    // 浅拷贝
    let obj = { name:'one',hobby:{ one : 'play'} }
    const test = Object.assign(obj,{ age: 18 })
    obj.name = 'two'
    obj.hobby.one = 'playTwo'
    console.log(test) // 打印 { name:'two',hobby: { one: 'playTwo' },age:18 }
    // 深拷贝 Object.assign深拷贝的缺点是只能深拷贝一层
    let obj2 = { name:'one',hobby:{ one : 'play'} }
    const test2 =  Object.assign({},obj2,{ age: 18 })
    obj2.name = 'two'
    obj2.hobby.one = 'playTwo'
    console.log(test2) // 打印 { name:'one',hobby: { one: 'playTwo' },age:18 }
}`)
const code2 = ref(`function cloneDeep(){
    const cloneDeep = (obj)=>{
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }
      let newObj = Array.isArray(obj) ? [] : {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = cloneDeep(obj[key]);
        }
      }
      return newObj;
    }
    let obj = {name:'one',hobby:{ one:'play'} }
    let obj2 = cloneDeep(obj)
    obj.name = 'two'
    obj.hobby.one = 'playTwo'
    console.log(obj,obj2)

    let array = [{name:'one',hobby:{ one:'play'} },{name:'two',hobby:{ one:'play'} }]
    let array2 =  cloneDeep(array)
    array[0].name = 'two'
    array[0].hobby.one = 'playTwo'
    console.log(array,array2)
}`)

</script>

<style lang="less" scoped></style>
