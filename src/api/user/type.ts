//登录接口需要携带参数ts 类型
export interface loginFormData {
  username: string
  password: string
}
//定义全部接口返回数据都拥有ts类型
export interface ResponseData{
  code:number,
  message:string,
  ok:boolean,
}

//定义登录接口返回数据类型
export interface loginResponseData extends ResponseData{
  data:string
}

//定义用户信息返回数据类型
export interface userInfoResponseData extends ResponseData{
  data:{
    routes:string[],
    buttons:string[],
    roles:string[],
    name:string,
    avatar:string,
  }
}


