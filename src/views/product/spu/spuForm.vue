<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称" v-model="SpuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="SpuParams.tmId">
        <el-option  v-for="(item,index) in AllTradeMark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU描述"  v-model="SpuParams.description"></el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width:100%;height:100%;" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select v-model="saleAttrIdAndValueName" :placeholder="unSelectSaleAttr.length?`还未选择${unSelectSaleAttr.length}个`:'无'">
        <el-option :value="`${item.id}:${item.name}`" v-for="(item,index) in unSelectSaleAttr" :key="item.id" :label = "item.name"></el-option>
      </el-select>
      <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName?false:true" type="primary" size="default" icon="Plus">
        添加属性值
      </el-button>

      <!-- table 展示销售属性与属性值 -->
      <el-table border style="margin: 10px 0px" :data="saleAttr">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="销售属性名字" width="120px" prop="saleAttrName"></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{row,$index}">
            <el-tag  style="margin:0px 5px;" v-for="(item,index) in row.spuSaleAttrValueList" @close="row.spuSaleAttrValueList.splice(index,1)" :key="item.id" class="mx-1" closable>
              {{item.saleAttrValueName}}
            </el-tag>
            <el-input v-if="row.flag==true" @blur="toLook(row)"  v-model="row.saleAttrValue" size="small" style="width:100px" placeholder="请你输入属性值"></el-input>
            <el-button v-else  @click="toEdit(row)" type="primary" size="small" icon="Plus"></el-button>

          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template  #="{row,$index}">
            <el-button type="primary" size="small" icon="Delete" @click="saleAttr.splice($index,1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" size="small">保存</el-button>
      <el-button type="primary" size="small" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { reqAllTradeMark,reqSpuImageList,reqSpuHasSaleAttr,reqAllSaleAttr } from '@/api/product/spu'
import type {SaleAttrValue,Trademark, SpuImg, SaleAttr, HasSaleAttr, SpuData,AllTradeMark,SpuHasImg,SaleAttrResponseData,HasSaleAttrResponseData} from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
let $emit = defineEmits(['changeScene'])
const cancel = () => {
  $emit('changeScene', 0)
}

//存储已有的SPU这些数据
let AllTradeMark = ref<Trademark[]>([])
//商品图片
let imgList = ref<SpuImg[]>([])
//已有的sPU销售属性
let saleAttr = ref<SaleAttr[]>([])

//全部销售属性
let allSaleAttr = ref<HasSaleAttr[]>([])
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//存储预览图片地址
let dialogImageUrl = ref<string>("")

//存储已有的SPU对象
let SpuParams = ref<SpuData>({
  category3Id:"", //收集三级分类的ID
  spuName:"",     //SPU的名字
  description:"", //SPU的描述
  tmId:"",     //品牌的ID
  reqSpuImageList:[],
  spuSaleAttrList:[]
})

//将来收集还未选择的销售属性Id与属性值的名字
let saleAttrIdAndValueName = ref<string>('')

//子组件 写一个方法
const initHasSpuData = async (spu: SpuData) => {
  console.log('initHasSpuData',spu)
  SpuParams.value=spu
  //spu:即为父组件传递过来已有的SPU 对象【不完整】

  //获取全部品牌的数据
  let result:AllTradeMark =  await reqAllTradeMark()

  //获取某一个品牌下全部售卖商品的图片
  let result1:SpuHasImg= await reqSpuImageList((spu.id as number));

  //获取已有的SPU销售属性的数据
  let result2:SaleAttrResponseData = await reqSpuHasSaleAttr((spu.id as number))

  // 获取整个项目全部sPU的销售属性
  let result3:HasSaleAttrResponseData =await reqAllSaleAttr()
  console.log("result",result3);
  AllTradeMark.value=result.data
  imgList.value=result1.data.map(item=>{
    return{
      name:item.imgName,
      url:item.imgUrl
    }
  })
  saleAttr.value= result2.data
  allSaleAttr.value= result3.data
}

const  handlePictureCardPreview = async(file:any)=>{
  dialogVisible.value=true
  dialogImageUrl.value=file.url
}
const handleRemove = async()=>{

}
//照片墙上传成功之前的钩子约束文件的大小与类型
const handlerUpload = (file:any)=>{
  if(file.type=="image/png" || file.type=="image/jpeg" || file.type=='gif'){
    if(file.size/1024/1024<3){
      return true
    }else{
      return false
    }
  }else{
    ElMessage({
      type:'error',
      message:"上传的图片务必是png、jpeg、fig格式"
    })
    return false
  }
}

// 计算出当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(()=>{
  let unSelectArr = allSaleAttr.value.filter(item=>{
    return saleAttr.value.every(item1=>{
      return item.name !=item1.saleAttrName;
    })
  })
  return unSelectArr;
})

//添加销售属性的方法
let addSaleAttr = ()=>{
  let[baseSaleAttrId,saleAttrName]= saleAttrIdAndValueName.value.split(":");
  console.log("baseSaleAttrId,saleAttrName",baseSaleAttrId,saleAttrName);

  //准备一个新的销售属性对象：将来带给服务器即刻
  let newSaleAttr:SaleAttr={
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList:[]
  }
  //追加到数组当中
  saleAttr.value.push(newSaleAttr);
  //清空收集的数据
  saleAttrIdAndValueName.value=""
}

//属性值按钮的点击事件
let toEdit=(row:SaleAttr)=>{
  row.flag= true
}
let toLook=(row:SaleAttr)=>{
  console.log("row",row);
  let {baseSaleAttrId,saleAttrValue} = row ;
  //整理成服务器需要的属性值形式
  let newSaleAttrValue:SaleAttrValue={
    baseSaleAttrId,
    saleAttrValueName:saleAttrValue,
  }
  //非法情况判断
  if((saleAttrValue as string).trim()==''){
    ElMessage({
      type:"error",
      message:"属性值不能为空的"
    })
    return;
  }
  //追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  //切换为查看模式
  row.flag = false

}


//对外暴露
defineExpose({ initHasSpuData })
</script>
<style scoped></style>
