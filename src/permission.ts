//路由鉴权 项目当中路由能不能被访问的权限的设置
import router from '@/router'
import setting from '@/setting'
import nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false });
// 获取用户相关的小仓库内部token,去判断用户是否登录成功
import useUserStore from './store/modules/user'
import pinia from './store'
let userStore = useUserStore(pinia)

//全局守卫：项目当中任意路由切换都会触发的钩子
//全局前置守卫：
/**
 * to:将要访问哪个路由
 * from:从哪个路由而来
 * next:路由放行函数
 */
router.beforeEach( async(to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
    document.title=`${setting.title}-${to.meta.title}`
    nprogress.start()
    //获取token 去判断用户登录 还是未登录
    let token = userStore.token
    //获取用户名字
    let username = userStore.username;
    //用户登录
    if (token) {
        //登录成功 不可以访问login【指向首页】
        if (to.path == '/login') {
            next({ path: '/' })
        } else {
            if (username) {
                next()
            }else{
                // 如果没有用信息 在守卫这里发请求获取到了用户信息在放行
                try{
                    await userStore.userInfo()
                    next()
                }catch(error){
                    //token过期：获取不到信息
                    // 用户手动修改本地存储token
                    await userStore.userLogout();
                    next({path:'/login',query:{redirect:to.path}})
                }
            }
        }
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})

//全局后置守卫
router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    nprogress.done()
})

//全部路由组件：登录 | 404 | 任意路由| 首页 | 数据大屏 | 权限管理（三个子路由） | 商品管理（四个子路由）

//用户未登录：可以访问login,其余六个路由不能访问（指向login）
//用户登陆成功： 不可以访问login【指向首页】其余页面可以访问
