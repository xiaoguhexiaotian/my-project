<template>
  <div class="container">
    <div class="room">
      <ul class="user">
        <li class="user-item" v-for="item in userList" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
      <div class="msg">
        <div class="msg-list" ref="msgListRef" id="info">
          <div class="item" :class="{ mine: me === h.name }" v-for="(h, i) in msgList" :key="i">
            <div class="name">{{ h.name }}</div>
            <div class="content">{{ h.content }}</div>
            <!-- <div class="date">{{ formatDate(h.date) }}</div> -->
          </div>
        </div>
        <div class="msg-input">
          <textarea v-model="msg" @keydown.enter="handleEnter" placeholder="请输入消息" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import moment from 'moment'
import { io, Socket } from 'socket.io-client'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import {
  ServerToClientEvents,
  ClientToServerEvents,
  UserInfo,
  MsgType
} from '/@/views/nodeJs/chatRoom/type'
moment.locale('zh-cn')

const userList = ref<UserInfo[]>([])
const msgList = ref<MsgType[]>([])
const me = ref<string>('')
const msg = ref<string>('')
const handleEnter = () => {
  const v = msg.value.trim()
  if (v) {
    msg.value = ''
    const msgInfo = {
      name: me.value,
      content: v,
      date: Date.now()
    }
    msgList.value.push(msgInfo)
    socket.value.emit('$msg', v)
  }
}

// const formatDate = (date) => {
//   console.log(date)

//   date = moment(date)
//   console.log(date)

//   return date.fromNow().replace(/\s/g, '')
// }

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = ref(null)
const socketInit = () => {
  socket.value = io('ws://localhost:3002')
  socket.value.on('connect', () => {
    message.success('进入聊天室')
  })
  // 监听聊天室用户进出
  socket.value.on('$updateUser', (users: UserInfo[]) => {
    userList.value = users
  })
  // 监听自己的名字变化(暂未实现用户名，聊天室的用户都由服务端生成，所以需要监听下初始的自己的name)
  socket.value.on('$name', (name: string) => {
    me.value = name
  })
  // 进入聊天室时获取历史消息
  socket.value.on('$history', (history: any[]) => {
    msgList.value = history
  })
  // 监听消息
  socket.value.on('$msg', (msg: any) => {
    msgList.value.push(msg)
  })
}
socketInit()

const msgListRef = ref<any>(null)
onMounted(() => {
  watch(
    () => msgList.value,
    () => {
      setTimeout(() => {
        msgListRef.value.scroll(0, msgListRef.value.scrollHeight)
      }, 50)
    },
    { immediate: true, deep: true }
  )
}),
  onUnmounted(() => {
    socket.value.disconnect()
  })
</script>

<style scoped lang="less">
.container {
  text-align: center;
  padding-top: 100px;
  .room {
    margin: 0 auto;
    width: 700px;
    height: 500px;
    border: 1px solid black;
    display: flex;
    .user {
      width: 150px;
      height: 100%;
      border-right: 1px solid black;
      overflow: auto;
      &-item {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid black;
      }
    }
    .msg {
      flex: 1;
      display: flex;
      flex-direction: column;
      &-list {
        flex: 1;
        padding: 1em;
        overflow: auto;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
        line-height: 1.5;
        scroll-behavior: smooth;
        .item {
          float: left;
          max-width: 70%;
          clear: both;
          margin-bottom: 1em;
          .name {
            text-align: left;
            font-size: 12px;
            color: #666;
          }
          .date {
            color: #bbb;
            font-size: 12px;
            text-align: right;
          }
          .content {
            background: #fff;
            border-radius: 5px;
            padding: 10px;
            margin: 5px 0;
          }
        }
      }
      &-input {
        height: 80px;
        border-top: 1px solid black;
        textarea {
          width: 100%;
          height: 100%;
          resize: none;
          border: none;
          outline: none;
          padding: 10px;
        }
      }
    }
  }
}
</style>
