 //分类相关的数据类型
 export interface  ResponseData{
    code:number,
    message:string,
    ok:boolean
}
//SPU 数据的ts 类型

export  interface SpuData{
    id?:number,
    spuName:string,
    description:string,
    category3Id:string|number,
    tmId:number|string,
    spuSaleAttrList:null|SaleAttr[],
    spuImageList:null|SpuImg[]
}

//数组：元素都是有SPU数据类型
export type Records = SpuData[];

//定义获取已有的SPU接口返回的数据ts 类型

export interface HasSpuResponseData extends ResponseData{
    data:{
        records:Records,
        total:number,
        size:number,
        current:number,
        searchCount:boolean,
        pages:number
    }
}


//所有品牌的TS类型
export interface Trademark{
    id:number,
    tmName:string,
    logoUrl:string
}

//品牌接口返回的数据ts 类型
export interface AllTradeMark extends ResponseData{
    data:Trademark[]
}

//商品图片的ts类型
export interface SpuImg{
    id?:number,
    createTime?:string,
    updateTime?:string,
    spuId?:number,
    imgName:string,
    imgUrl:string
}
//已有的SPU的照片墙数据类型
export interface SpuHasImg extends ResponseData{
    data:SpuImg[]
}


//已有的销售属性值对象ts类型
export interface SaleAttrValue{
    id?:number,
    createTime?:null,
    updateTime?:null,
    spuId?:number,
    baseSaleAttrId:number|string,
    saleAttrValueName:string,
    saleAttrName?:string,
    isChecked?:null,
}

//存储已有的销售属性数组类型
export type SpuSaleAttrValueList = SaleAttrValue[];

//销售属性对象ts类型
export interface SaleAttr{
    id?:number,
    createTime?:null,
    updateTime?:null,
    spuId?:number,
    baseSaleAttrId:number|string,
    saleAttrName:string,
    spuSaleAttrValueList:SpuSaleAttrValueList,
    flag?:boolean,
    saleAttrValue?:string
}

//SPU已有的销售属性接口返回数据ts类型
export interface SaleAttrResponseData extends ResponseData{
    data:SaleAttr[]
}

//已有的全部SPU的返回数据Ts类型
export interface HasSaleAttr{
    id:number,
    name:string
}

export interface HasSaleAttrResponseData extends ResponseData{
    data:HasSaleAttr[]
}
