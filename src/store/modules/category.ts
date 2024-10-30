// 创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqC1,reqC2,reqC3 } from '@/api/product/attr'
import type { CategoryState } from './types/type';
import type {CategoryResponseData} from "@/api/product/attr/type"
let useCategoryStore = defineStore('Category', {
    state: (): CategoryState => {
        return {
            c1Arr: [],
            c2Arr:[],
            c3Arr:[],
            c1Id: '',
            c2Id:'',
            c3Id:'',
        }
    },
    actions: {
        //获取一级分类的数句
        async getC1() {
            let result: CategoryResponseData = await reqC1()
            if (result.code == 200) {
                this.c1Arr = result.data;
            }
        },

        //获取二级分类的数据
        async getC2() {
            let result: CategoryResponseData = await reqC2(this.c1Id);
            console.log("result",result);
            if (result.code == 200) {
                this.c2Arr = result.data;
            }
        },
        async getC3() {
            let result: CategoryResponseData = await reqC3(this.c2Id);
            console.log("result",result);
            if (result.code == 200) {
                this.c3Arr = result.data;
            }
        }
    },
    getters: {

    }

})
export default useCategoryStore;