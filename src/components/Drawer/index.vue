<template>
  <Drawer
    v-bind="$attrs"
    :class="prefixCls"
    class="jian-hong-drawer"
    :visible="visible"
    :closable="false"
    @close="closeDrawer"
  >
    <!-- 顶部右上角区域 -->
    <template #extra>
      <slot name="extra"></slot>
    </template>
    <slot name="body"></slot>
    <!-- 底部区域 -->
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </Drawer>
</template>
<script setup lang="ts">
import { ComponentEmits, ComponentProps } from '/@/components/Drawer/types/data'
import { useMethods } from '/@/components/Drawer/hooks/useMethods'
import { useDesign } from '/@/hooks/useDesign'
import { Drawer } from 'ant-design-vue'

const props = defineProps(ComponentProps())
const emit = defineEmits(ComponentEmits)
const { prefixCls } = useDesign(props.className)
const { closeDrawer } = useMethods(props, emit)
</script>

<style scoped lang="less"></style>
