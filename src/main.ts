import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'
//引入自定义插件对象：注册整个项目全局组件
import gloalComponent from '@/components'
//svg 插件需要配置代码
import 'virtual:svg-icons-register'
import '@/styles/index.scss'
import router from './router'
import pinia from './store'
//引入全局样式
// import "@/styles"
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
//暗转自定义插件
app.use(gloalComponent)
app.use(pinia)
app.use(router)

//引入路由鉴权文件
import './permission'
app.mount('#app')
