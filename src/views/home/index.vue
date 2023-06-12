<template>
  <div class="login_container">我是index页面</div>
</template>

<script setup lang="ts">
import { ref, reactive,onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
let useStore = useUserStore()
  onMounted(()=>{
    useStore.userInfo()
  })
</script>
<style scoped></style>
