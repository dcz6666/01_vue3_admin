<template>
  <el-card class="box-card">
    <el-button type="primary" size="default" icon="Plus" @click="addTrademark">
      添加品牌
    </el-button>
    <el-table style="margin: 10px 0" border :data="trademarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img style="width: 100px; height: 100px" :src="row.logoUrl" alt="没有图片" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button type="warning" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>

          <el-popconfirm width="250px" confirm-button-text="OK" cancel-button-text="No, Thanks" :icon="Delete" icon-color="#626AEF" @confirm="removeTradeMark(row.id)" :title="`您确定删除${row.tmName}`">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    
    <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :small="true" :background="true" layout=" prev, pager, next, jumper,->,total, sizes," :total="totals" @size-change="sizeChange"
      @current-change="getHasTrademark" />
  </el-card>

  <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" :before-close="dialogBeforeClose">
    <el-form style="width: 80%" :model="trademarkParams" :rules="rules" ref="formRef">
      <el-form-item label="品牌名称" label-width="90px" prop="tmName">
        <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="90px" prop="logoUrl">
        <!-- upload 组件属性：action -->
        <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button @click="confirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark
} from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import { ElMessage, UploadProps } from 'element-plus'
//当前页码
let pageNo = ref<number>(1)
//每页咱是多少条数据
let limit = ref<number>(3)
//存储已有品牌数据总数
let totals = ref<number>(0)
//存储已有品牌数据
let trademarkArr = ref<Records>([])
//控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false)

//定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})

let formRef = ref()

onMounted(() => {
  getHasTrademark()
})
//获取已有品牌的接口封装为一个函数：在任何情况下想获取数据 调用此函数即刻
const getHasTrademark = async (pager = 1) => {
  //当前页
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  console.log('result', result)
  if (result.code == 200) {
    let { total, records } = result.data
    totals.value = total
    trademarkArr.value = records
  }
}

const sizeChange = () => {
  getHasTrademark()
}
const addTrademark = () => {
  dialogFormVisible.value = true
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
  trademarkParams.id = 0
  //第一种写法：问号语法
  // formRef.value?.clearValidate('logoUrl')
  // formRef.value?.clearValidate('tmName')
  //第二种写法 清空校验规则错误提示信息
  nextTick(() => {
    formRef.value.clearValidate('logoUrl')
    formRef.value.clearValidate('tmName')
  })
}
const updateTrademark = (row: TradeMark) => {
  console.log('row', row)
  Object.assign(trademarkParams, row)
  dialogFormVisible.value = true
}
//上传图片组件 上传之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必是png/jpeg/gif',
    })
    return false
  }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  trademarkParams.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}

const cancel = () => {
  dialogFormVisible.value = false
}

const confirm = async () => {
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  console.log('result', result)
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    //再次发请求获取已有全部的品牌数据
    getHasTrademark()
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
}
//品牌自定义校验规则方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称位数大于等于两位'))
  }
}

const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  //如果图片上传
  if (value) {
    callBack()
  } else {
    callBack(new Error('LOGO 图片务必上传'))
  }
}
//表单校验规则对象
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}

//气泡确认框确定按钮的回调
const removeTradeMark = async (id:number)=>{
  //点击确定按钮删除已有品牌请求
  let result =  await reqDeleteTrademark(id);
  if(result.code==200){
    ElMessage({
      type:'success',
      message:"删除品牌成功"
    })
    //再次获取已有品牌的数据
    getHasTrademark(trademarkArr.value.length>1?pageNo.value:pageNo.value-1);
  }else{
    ElMessage({
      type:'error',
      message:"删除品牌失败"
    })
  }
  
}
</script>
<style>
.avatar {
  width: 178px;
  height: 178px;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
