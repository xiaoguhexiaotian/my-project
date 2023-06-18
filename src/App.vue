<template>
  <nav>
    <router-link to="/home">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <RouterView>
    <template #default="{ Component, route }">
      <!-- 缓存组件 -->
      <keep-alive :include="['home']">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
      <!-- 非缓存 -->
      <!-- <component v-else :is="Component" :key="route.fullPath" /> -->
      <!--      </transition>-->
    </template>
  </RouterView>
</template>

<style lang="less"></style>
