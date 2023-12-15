/**
 * v-scroll
 */
import { Directive, DirectiveBinding, nextTick } from 'vue'
interface ElType extends Element {
  __handlescroll__?: any
  value?: string
}
const scroll: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    const xiala = document.querySelector('.rc-virtual-list-holder')
    nextTick(()=>
      xiala?.addEventListener('scroll',handlescroll)
    )
    console.log(xiala)
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('scroll', el.__handlescroll__)
  }
}

async function handlescroll(this: any) {
  console.log('正在滚动')
}

export default scroll
