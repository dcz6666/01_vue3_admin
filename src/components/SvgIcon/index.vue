<template>
  <div>
    <svg :style="{ width, height }">
      <use :xlink:href="`${prefix}${name}`" fill="red"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: String,
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '30px',
  },
  height: {
    type: String,
    default: '30px',
  },
})
</script>
<style scoped></style>
