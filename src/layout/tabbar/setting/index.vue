<template>
  <el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
  <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img :src="userStore.avatar" alt="" style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%" />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
//获取路由对象
import { useRouter,useRoute} from 'vue-router'
let userStore = useUserStore()
let $router = useRouter()
let $route  = useRoute()
console.log("$route",$route.path );
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
  } else {
    //退出全屏模式
    document.exitFullscreen()
  }
}

const logout = async () => {
  //1、需要向服务器发 退出登录的接口
  //2、清空用户数据
  await userStore.userLogout()
  $router.push({path:'/login',query:{redirect:$route.path}})
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<style scoped></style>
