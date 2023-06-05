<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import request from '@/utils/request'
import { reqLogin } from './api/user'
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss"></style>
