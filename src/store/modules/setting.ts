// 创建用户相关的小仓库
import { defineStore } from 'pinia';
let useLayOutSettingStore = defineStore('SettingStore',{
    state:()=>{
        return {
            fold:false,       //用户控制菜单折叠还是收起切换变量
        }
    }
})
// 对外暴露获取小仓库方法
export default useLayOutSettingStore