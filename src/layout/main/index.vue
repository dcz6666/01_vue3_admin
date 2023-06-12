<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout 一级路由组件的子路由 -->
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>
<script lang='ts'>
    export default {
        name:"Main"
    }
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
