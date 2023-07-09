<template>
  <div :class="`${prefixCls} px-5px`">
    <span>头部</span>
    <Button type="text" shape="circle" @click="openSetting">
      <template #icon>
        <SettingOutlined />
      </template>
    </Button>
  </div>
  <MenuSettingDrawer
    :class-name="'menu-setting-drawer'"
    :visible="menuVisible"
    @close="openSetting"
    title="布局设置"
  >
    <template #extra>
      <SettingOutlined />
    </template>
    <template #body>
      <h3 :class="`${prefixCls}-menu-type-title`">导航栏模式</h3>
      <div :class="`${prefixCls}-menu-type-picker`">
        <div v-for="i in layouts" :class="`${prefixCls}-menu-type-picker-${i.type}`">
          <div class="box"></div>
        </div>
      </div>
    </template>
    <template #footer>
      <Button type="primary" block>重置</Button>
    </template>
  </MenuSettingDrawer>
</template>
<script setup lang="ts">
import { useDesign } from '/@/hooks/useDesign'
import { Button } from 'ant-design-vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import MenuSettingDrawer from '/@/components/Drawer/index.vue'
import { ref } from 'vue'

const { prefixCls } = useDesign('header')

const menuVisible = ref(false)

const openSetting = () => {
  menuVisible.value = !menuVisible.value
}
const layouts = [{ type: 'left-top' }, { type: 'top-left' }, { type: 'top' }]

console.log(layouts)
</script>

<style scoped lang="less">
@prefix-cls: ~'@{namespace}-header';

.@{prefix-cls} {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-menu-type {
    &-picker {
      display: flex;
      justify-content: space-around;
      > div {
        position: relative;
        background-color: #f0f2f5;
        width: 72px;
        height: 60px;
        margin-right: 30px;
        padding: 24px;
        border-radius: 4px;
        box-shadow: 0 1px 2.5px #0000002e;
        &:hover {
          border: 2px solid #1890ff;
        }
        &:active {
          border: 2px solid #1890ff;
        }
      }
      > div:last-child {
        margin-right: 0;
      }
      &-left-top {
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          background-color: #fff;
          height: 25%;
          width: 100%;
          box-sizing: border-box;
        }
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          background-color: #273352;
          height: 100%;
          width: 30%;
          z-index: 1;
          box-sizing: border-box;
        }
      }

      &-top-left {
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          background-color: #273352;
          height: 25%;
          width: 100%;
          box-sizing: border-box;
        }
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          background-color: #fff;
          height: 100%;
          width: 30%;
          box-sizing: border-box;
        }
      }

      &-top {
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          background-color: #273352;
          height: 25%;
          width: 100%;
          box-sizing: border-box;
        }
      }
    }
    &-title {
      text-align: center;
      font-weight: 500;
      font-size: 16px;
    }
  }
}
</style>
