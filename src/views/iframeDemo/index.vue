<template>
  <TableTemplate>
    <template #content>
      <iframe width="100%" height="50%" src="http://127.0.0.1:5174/" />
      <p>子页面传递的信息:{{ sonInfo && sonInfo.message }}</p>
      <p>计数器:{{ sonInfo && sonInfo.cuont }}</p>
      <Button @click="postMessage('主动传递')">向iframe页面传递信息</Button>
      <p><b>主页面</b></p>
      <Codemirror width="95%" height="600px" :code="code" :isShowBtn="false" />
      <p><b>子页面</b></p>
      <Codemirror width="95%" height="600px" :code="code2" :isShowBtn="false" />
    </template>
  </TableTemplate>
</template>

<script lang="ts" setup>
import TableTemplate from '/@/components/TemplateLayout/tableTemplate.vue'
import { ref, onMounted } from 'vue'
import { Button } from 'ant-design-vue'
import Codemirror from '/@/components/Codemirror/index.vue'
const parentCuont = ref(1)
const handleMessage = (event: any) => {
  const data = event.data.data
  if (data.success) {
    sonInfo.value = data
  }
  console.log('监听子页面的事件', event, data)
}
const postMessage = (message) => {
  // let token = sessionStorage.getItem('token')
  let token = '测试iframe通信'
  iframe.contentWindow.postMessage(
    {
      code: 'success',
      token: token, // 父页面的token
      message: message + parentCuont.value,
      cuont: parentCuont.value++
      // userInfo: store.state.userInfo // 父页面的用户信息
    },
    '*'
  )
}
const sonInfo = ref()

let iframe
onMounted(() => {
  window.addEventListener('message', handleMessage)
  iframe = document.getElementsByTagName('iframe')[0]
  iframe.onload = function () {
    postMessage('默认加载')
  }
})

const code = ref(`<template>
  <TableTemplate>
    <template #content>
      <iframe width="100%" height="50%" src="http://127.0.0.1:5174/" />
      <p>子页面传递的信息:{{ sonInfo && sonInfo.message }}</p>
      <p>计数器:{{ sonInfo && sonInfo.cuont }}</p>
      <Button @click="postMessage('主动传递')">向iframe页面传递信息</Button>
    </template>
  </TableTemplate>
</template>

<script lang="ts" setup>
import TableTemplate from '/@/components/TemplateLayout/tableTemplate.vue'
import { ref, onMounted } from 'vue'
import { Button } from 'ant-design-vue'
const parentCuont = ref(1)
const handleMessage = (event: any) => {
  const data = event.data.data
  if (data.success) {
    sonInfo.value = data
  }
  console.log('监听子页面的事件', event, data)
}
const postMessage = (message) => {
  // let token = sessionStorage.getItem('token')
  let token = '测试iframe通信'
  iframe.contentWindow.postMessage(
    {
      code: 'success',
      token: token, // 父页面的token
      message: 'message}+{parentCuont.value}',
      cuont: parentCuont.value++
      // userInfo: store.state.userInfo // 父页面的用户信息
    },
    '*'
  )
}
const sonInfo = ref()

let iframe
onMounted(() => {
  window.addEventListener('message', handleMessage)
  iframe = document.getElementsByTagName('iframe')[0]
  iframe.onload = function () {
    postMessage('默认加载')
  }
})
<\/script>

<style lang="less" scoped>
p {
  font-size: 24px;
}
</style>
`)

const code2 = ref(`<template>
  <h1>iframe嵌入的页面</h1>
  <button @click="emitMessage('主动传递')">向父页面发送信息</button>
  <p>接收父页面信息:{{ parentInfo && parentInfo.message }}</p>
  <p>计数器:{{ parentInfo && parentInfo.cuont }}</p>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
const sonCuont = ref(1);
//被嵌入的iframe页面  向父vue页面发送信息
const emitMessage = (message) => {
  window.parent.postMessage(
    {
      data: {
        success: true,
        message: message + sonCuont.value,
        cuont: sonCuont.value++,
      },
    },
    "*"
  );
};

const parentInfo = ref<any>();
//获取嵌入的父页面传过来的数据
const handleMessage = (event: any) => {
  console.log("获取嵌入的父页面传过来的数据:", event);

  const data = event.data;
  if (data.hasOwnProperty("wappalyzer")) {
    //无消息时
    return;
  } else if (data.type == "webpackClose") {
    //关闭时
    return;
  } else if (data.hasOwnProperty("token")) {
    //有值时
    sessionStorage.setItem("token", data.token);
  }
  parentInfo.value = data;
};
onMounted(() => {
  window.addEventListener("message", handleMessage);
  emitMessage("初次加载");
});
<\/script>

<style scoped>
p {
  font-size: 24px;
}
</style>
`)
</script>

<style lang="less" scoped>
p {
  font-size: 24px;
}
</style>
