<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>
<script lang="ts">
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "home", // 添加name属性
};
</script>
<script lang="ts" setup name="home">
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

console.log(123);
</script>
