<template>
  <div class="layout_container">
    <div class="layout_slider" :class="{fold:layOutSettingStore.fold}">
      <logo></logo>
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu :collapse='layOutSettingStore.fold' :default-active="$route.path" background-color="#001529" text-color="white">
          <Menu :menuList="useStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar" :class="{fold:layOutSettingStore.fold}">
      <Tabbar />
    </div>
    <div class="layout_main" :class="{fold:layOutSettingStore.fold}">
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
//获取路由对象
import { useRoute } from 'vue-router'
import logo from './logo/index.vue'
//引入菜单组件
import Menu from './menu/index.vue'
//右侧内容展示区域
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
//huoqu layout 配置仓库
import useLayOutSettingStore from '@/store/modules/setting'
let useStore = useUserStore()
let layOutSettingStore = useLayOutSettingStore()

let $route = useRoute()
</script>
<script lang='ts'>
export default {
  name: 'Layout',
}
</script>
<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  white-space: nowrap;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
    .scrollbar {
      width: $base-menu-width;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    background: cyan;
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width);
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    background: yellow;
    overflow: auto;
     transition: all 0.3s;
    &.fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width);
    }
  }
}
</style>
