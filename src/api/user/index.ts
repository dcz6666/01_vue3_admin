//同一管理咱们项目相关的接口
import request from '@/utils/request'
// import type { loginForm, loginResponseData, userResponseData } from './type'
//统一管理接口
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}
//暴露请求函数
//登录接口方法
export const reqLogin = (data: any) => request.post<any, any>(API.LOGIN_URL, data)

//用户信息接口方法
export const reqUserInfo = () =>request.get<any, any>(API.USERINFO_URL)

//退出登录
export const reqLogout = (data: any) => request.post<any, any>(API.LOGOUT_URL)