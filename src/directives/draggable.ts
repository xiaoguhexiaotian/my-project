import type { Directive } from 'vue'

interface ElType extends HTMLElement {
  parentNode: any
}

const draggable: Directive = {
  mounted(el: ElType) {
    el.style.cursor = 'move'
    el.style.position = 'absolute'
    el.onmousedown = function (e) {
      // pageX：鼠标在屏幕的位置，offsetLeft元素在屏幕中的位置
      const disX = e.pageX - el.offsetLeft
      const disY = e.pageY - el.offsetTop
      // 鼠标移动事件
      document.onmousemove = function (e) {
        // 用鼠标移动到的位置减去最开始鼠标在元素中的偏移量，就是元素当前在页面的坐标
        let x = e.pageX - disX
        let y = e.pageY - disY
        // 移动的最大宽度为父盒子的宽度减去自己身的可见宽度，高度同理
        const maxX = el.parentNode.offsetWidth - el.offsetWidth - 20
        const maxY = el.parentNode.offsetHeight - el.offsetHeight - 20
        if (x < 0) {
          x = 0
        } else if (x > maxX) {
          x = maxX
        }

        if (y < 0) {
          y = 0
        } else if (y > maxY) {
          y = maxY
        }

        el.style.left = x + 'px'
        el.style.top = y + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null
      }
    }
  }
}

export default draggable
