// 创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'

import type { loginFormData, loginResponseData, userInfoResponseData } from '@/api/user/type'

import type { UserState } from './types/type.ts'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由（常量路由）
import { constantRoute } from '@/router/routes'

//创建用户小仓库
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  //异步|逻辑地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data)
      console.log('===result===', result)
      if (result.code == 200) {
        this.token = result.data as string
        //本地存储持久化存储一份
        SET_TOKEN(result.data as string)
        //保证当前async 函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //获取用户信息
    async userInfo() {
      let result: userInfoResponseData = await reqUserInfo()
      console.log('获取用户信息', result)
      if (result.code == 200) {
        let { avatar, name } = result.data
        this.username = name;
        this.avatar = avatar;
        return 'ok';
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    //退出登录
    async userLogout() {
      let result: any = await reqLogout()
      console.log('退出登录', result)
      if (result.code == 200) {
        this.username = ''
        this.avatar = ''
        this.token = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

// 对外暴露获取小仓库方法
export default useUserStore
