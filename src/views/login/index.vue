<template>
  <TableTemplate>
    <template #content>
      <a-form :model="formState" name="normal_login" class="login-form">
        <a-row>
          <a-col :span="8" offset="8">
            <a-form-item
              label="用户名"
              name="username"
              :rules="[{ required: true, message: '请输入用户名!' }]"
              :labelCol="span.labelCol"
              :wrapperCol="span.wrapperCol"
            >
              <a-input v-model:value="formState.username">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8" offset="8">
            <a-form-item
              label="密码"
              name="password"
              :rules="[{ required: true, message: '请输入密码!' }]"
              :labelCol="span.labelCol"
              :wrapperCol="span.wrapperCol"
            >
              <a-input-password v-model:value="formState.password">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>
          </a-col>
          <a-col :span="8" offset="8">
            <a-form-item style="text-align: center">
              <a-button :disabled="disabled" type="primary" @click="handleLogin"> 登录 </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-button @click="test">注册</a-button>
    </template>
  </TableTemplate>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import TableTemplate from '/@/components/TemplateLayout/tableTemplate.vue'

import { login, register } from '/@/api/login/login'
import { createLocalStorage } from '/@/utils/cache'
import { useUserStore } from '/@/stores/user'
import router from '/@/router'
interface FormState {
  username: string
  password: string
}
const localStorage = createLocalStorage()
const userStore = useUserStore()
const formState = reactive<FormState>({
  username: '',
  password: ''
})

const disabled = computed(() => {
  return !(formState.username && formState.password)
})
const span = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}
const handleLogin = async () => {
  login(formState)
    .then((res) => {
      if (res.success && res.result) {
        const { result } = res
        const token = result
        localStorage.set('TOKEN', token)
        userStore.setToken(token)
        router.push({ path: '/dashboard' })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const test = async () => {
  register({ username: 'admin', password: '123456' }).then((res) => {
    console.log(res)
  })
}
</script>
<style lang="less" scoped></style>
