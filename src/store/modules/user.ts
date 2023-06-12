// 创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, userInfo} from '@/api/user'

import type { loginForm, loginResponseData } from '@/api/user/type'

import type { UserState } from './types/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
//引入路由（常量路由）
import {constantRoute} from '@/router/routes';

//创建用户小仓库
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes:constantRoute,
      username:'',
      avatar:""
    }
  },
  //异步|逻辑地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data.token as string
        //本地存储持久化存储一份
        SET_TOKEN(result.data.token as string)
        //保证当前async 函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },

    async userInfo(){
      let result = await userInfo();
      console.log("result===userInfo1",result)
      if(result.code==200){
        let {avatar,username}=result.data.checkUser;
        this.username=username
        this.avatar=avatar
      }
    }
  },
  getters: {},
})

// 对外暴露获取小仓库方法
export default useUserStore
