<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id" @change="handle" :disabled="scene" >
          <el-option v-for="(c1, index) in categoryStore.c1Arr"  :label="c1.name" :key="c1.id" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.c2Id" @change="handle1" :disabled="scene">
          <el-option v-for="(c2, index) in categoryStore.c2Arr"  :label="c2.name" :key="c2.id" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" :disabled="scene"> 
          <el-option v-for="(c3, index) in categoryStore.c3Arr"  :label="c3.name" :key="c3.id" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
//引入分类接口的方法
import { ref, reactive, onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
//组件挂载完毕
onMounted(() => {
  getC1()
})
//通知仓库获取一级分类的数据
const getC1 = () => {
  categoryStore.getC1()
}

// 此方法即为一级分类下拉菜单的change事件（选中值得时候触发，保证一级分类Id 有了）
const handle = () => {
  categoryStore.c2Id = '';
  categoryStore.c3Arr = [];
  categoryStore.c3Id = '';
  categoryStore.getC2()
}
const handle1 = () => {
   categoryStore.c3Arr = [];
  categoryStore.c3Id = '';
  categoryStore.getC3()
}

//接收父组件传递过来的scene
defineProps(["scene"])
</script>
<style scoped></style>
