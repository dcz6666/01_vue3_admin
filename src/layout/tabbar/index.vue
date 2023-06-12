<template>
  <div class="tabbar">
    <div class="tabber_left">
     <breadcrumb/>
    </div>
    <div class="tabber_right">
    <setting/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import breadcrumb from './breadcrumb/index.vue'
import setting from './setting/index.vue'
</script>

<script lang='ts'>
    export default {
        name:"Tabbar"
    }
</script>
<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right,rgb(232,223,223),rgb(211, 182, 182),rgb(255, 255, 255));
  .tabber_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabber_right{
      display: flex;
      align-items: center;
  }
}
</style>
