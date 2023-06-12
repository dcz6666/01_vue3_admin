<template>
  <el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
  <el-button size="small" icon="FullScreen" circle></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img src="../../../../public/logo.png" alt="" style="width:24px;height:24px;">
  <el-dropdown>
    <el-button>
      admin<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
let layOutSettingStore = useLayOutSettingStore()
const updateRefsh=()=>{
  layOutSettingStore.refsh = !layOutSettingStore.refsh 
}
</script>
<script lang='ts'>
    export default {
        name:"Setting"
    }
</script>
<style scoped>
</style>