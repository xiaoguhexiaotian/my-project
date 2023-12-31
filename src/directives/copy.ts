/**
 * v-copy
 * 复制某个值至剪贴板
 */
import type { Directive, DirectiveBinding } from 'vue'
import { message } from 'ant-design-vue'

interface ElType extends Element {
  copyData?: string | number
  copyIndex?: number | string
  __handleCopy__?: any
  value?: string
}

const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyIndex = binding.value
    // 传值必须为number了类型或者字符串类型的数字
    if (Number.isNaN(Number(binding.value))) throw new Error('v-copy指令值类型错误')
    el.addEventListener('click', handleCopy)
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.__handleCopy__)
  }
}

async function handleCopy(this: any) {
  // 获取页面上所有有copy类名的元素
  const allTarget = document.querySelectorAll('.copy')
  // 具体复制的元素的下标
  let index: number = this.copyIndex
  // 当index大于copy类名的数量时或者为NaN时说明使用错误
  if (index >= allTarget.length || isNaN(index)) {
    throw new Error('v-copy指令传值错误')
  }
  // copy目标
  const copyTarget: ElType = allTarget![index]
  // copy数据
  let copyData: string
  // DOM结构上存在value说明有绑定的值，这时候直接取value，否则直接取DOM结构的textContent
  copyTarget!.value ? (copyData = copyTarget!.value) : (copyData = copyTarget!.textContent!)

  // 复制到剪贴板
  await navigator.clipboard
    .writeText(copyData)
    .then(() => {
      message.success(`复制成功：${copyData}`)
    })
    .catch((err) => console.log('复制失败！', err))
}

export default copy
