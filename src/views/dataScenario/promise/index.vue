<template>
  <BodyLayout>
    <template #content>
      <h1 class="text-24px">链式调用会进入微任务排队等待</h1>
      <Codemirror :code="code" height="600px" />
      <h1 class="text-24px">async await语法糖</h1>
      <Codemirror :code="code2" height="600px" />
      <h1 class="text-24px">Promise与async await</h1>
      <Codemirror :code="code3" height="600px" />
    </template>
  </BodyLayout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

// 代码部分
const code = ref(`function test (){
  Promise.resolve()
  .then(() => {
    console.log(0)
    return 3
  })
  .then((res) => {
    console.log(res)
  })

Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
}
test()`)

const code2 = ref(`function test (){
  function foo(num) {
    console.log(num)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * 2)
        }, 1000)
    })
}
async function asyncFn2() {
    const num1 = await foo(1)
    const num2 = await foo(num1).then((res)=> {
      console.log(res,2222)
      return res
    })
    console.log(num2,33333)
    const num3 = await foo(num2)
    return num3
}
asyncFn2().then(res => console.log(res))

}
test()`)

const code3 = ref(`function test (){
  function takeLongTime(n){
    return new Promise((resolve) => {
      setTimeout(() => resolve(n + 200),n);
    })
  }
  function step1(n){
    console.log('step1 with',n);
    return takeLongTime(n);
  }
  function step2(m,n){
    console.log('step2 with',m, '+', n);
    return takeLongTime(m + n);
  }
  function step3(k,m,n){
    console.log('step3 with',k, '+', m, '+', n);
    return takeLongTime(k+ m + n);
  }
  let type = 'promise'
  // async await写法
  if(type == 'async'){
    async function doIt() {
      console.time('doIt');
      let time1 = 300;
      let time2 = await step1(time1);//将Promise对象resolve(n+200)的值赋给time2
      let time3 = await step2(time2,time1);
      let result = await step3(time3,time2,time1);
      console.log('result:',result);
      console.timeEnd('doIt');
    }
    doIt()
  }else{
  // promise写法
   function doIt() {
      console.time('doIt')
      let time1 = 300;
      step1(time1)
      .then((time2) => {
        return step2(time2,time1)
          .then((time3)=> [time1, time2, time3])
      })
      .then((times) => {
        let [time1, time2, time3] = times
        return step3(time3, time2, time1)
      })
      .then((result) => {
        console.log('result',result)
        console.timeEnd('doIt');
      })
    }
    doIt()
  }
}
test()`)
</script>

<style lang="less" scoped></style>
