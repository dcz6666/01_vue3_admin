<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene" />

    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button type="primary" size="default" :disabled="categoryStore.c3Id ? false : true" icon="Plus" @click="addSpu">
          添加SPU
        </el-button>
        <el-table style="margin: 10px 0px" border :data="records">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" show-overflow-tooltip prop="description"></el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button type="primary" size="small" icon="Plus" title="添加SKU"></el-button>
              <el-button type="warning" size="small" icon="Edit" @click="updateSpu(row)" title="修改SKU"></el-button>
              <el-button type="info" size="small" icon="View" title="查找SKU列表"></el-button>
              <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-size="[3, 5, 7, 9]" :background="true" layout="prev, pager, next,jumper,->,sizes,total" :total="total" @current-change="getHasSpu"></el-pagination>
      </div>
      <!-- 添加SPU|修改SPU组件 -->
      <SpuForm v-show="scene == 1" ref="spu"  @changeScene="changeScene"></SpuForm>
      <!-- 添加SKU的子组件 -->
      <SkuForm v-show="scene == 2"></SkuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { reqHasSpu } from '@/api/product/spu'
import type { HasSpuResponseData, Records } from '@/api/product/spu/type'
import type{SpuData} from '@/api/product/sku/type'
//引入分类的仓库
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()

import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'

//场景的数据 0：显示已有的 1：添加SPU|修改SPU组件  2：添加SKU的子组件
let scene = ref<number>(0)
//分页器默认页码
let pageNo = ref<number>(1)
//每一页展示几条数据
let pageSize = ref<number>(3)
//存储已有的SPU 的数据
let records = ref<Records>([])
//存储已有SPU 总个数
let total = ref<number>(0)
//获取子组件实例SpuForm
let spu= ref<any>();

//监听三级分类Id变化
watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)

//获取某一个三级分类下全部的已有的SPU
const getHasSpu = async (pager = 1) => {
  //修改当前页码
  pageNo.value = pager
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  console.log('result', result)
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}

//添加新的SPU按钮的回调
const addSpu = () => {
  scene.value = 1
}
//修改已有的SPU的按钮的回调
const updateSpu = (row:SpuData) => {
  //切换为场景1：添加与修改已有SPU结构-》spuForm
  scene.value = 1
  spu.value.initHasSpuData(row)
  console.log("spu.value",spu.value);
}
//子组件SpuForm绑定自定义事件：目前是让子组件通知父组件切换场景为0
const changeScene = (num: number) => {
  scene.value = num
}
</script>
<style scoped></style>
