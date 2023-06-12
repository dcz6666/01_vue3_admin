<template>
  <el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
  <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img src="../../../../public/logo.png" alt="" style="width: 24px; height: 24px" />
  <el-dropdown>
    <el-button>
      admin
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
let layOutSettingStore = useLayOutSettingStore()
//刷新按钮点击回调
const updateRefsh = () => {
  layOutSettingStore.refsh = !layOutSettingStore.refsh
}

// 全屏按钮点击的回调
const fullScreen = () => {
  //dom 独享的一个属性：可以用来判断当前是不是全屏模式（全屏：true，不是全屏：false）
  let full = document.fullscreenElement
  // 切换为全屏模式
  if (!full) {
    // 文档根节点的方法request Fullscreen 实现全屏模式
    document.documentElement.requestFullscreen()
  }else{
    //退出全屏模式
    document.exitFullscreen()
  }
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<style scoped></style>
