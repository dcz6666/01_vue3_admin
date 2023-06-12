<template>
    <el-icon style="margin-right: 10px" @click="changeIcon">
      <component :is="LayOutSettingStore.fold?'Fold':'Expand'" />
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
    <!-- 动态展示路由名字和标题 -->
      <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
          <!-- 图标 -->
          <el-icon style="margin: 0px 2px;">
              <component :is="item.meta.icon"></component>
          </el-icon>
         <span>{{item.meta.title}}</span> 
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import {useRoute} from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting.ts'
let $route = useRoute()
let fold =ref(false);
 let LayOutSettingStore = useLayOutSettingStore()
const changeIcon=()=>{
    LayOutSettingStore.fold=!LayOutSettingStore.fold
}
</script>
<script lang='ts'>
    export default {
        name:"Breadcrumb"
    }
</script>
<style scoped></style>
