// 创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin } from '@/api/user'

import type { loginForm, loginResponseData } from '@/api/user/type'

import type { UserState } from './types/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'

//创建用户小仓库
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
    }
  },
  //异步|逻辑地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginForm) {
      console.log('userLogin', data)
      let result: loginResponseData = await reqLogin(data)
      console.log('result', result)
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
  },
  getters: {},
})

// 对外暴露获取小仓库方法
export default useUserStore
