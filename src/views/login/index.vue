<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 登录的表单 -->
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { ref, reactive } from 'vue'
//引入获取当前时间
import { getTime } from '@/utils/time'
let useStore = useUserStore()
//定义变量控制按钮加载效果
let loading = ref(false)
//获取el-from组件
let loginForms = ref()
//获取路由器
let $router = useRouter()
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })

//登录按钮回调
const login = async () => {
  let a = await loginForms.value.validate()
    console.log("loginForms1",a);

  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    //编程式导航跳转到展示数据首页
    $router.push('/')
    //登录成功提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hi,${getTime()}好`,
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  } finally {
    loading.value = false
  }
}

//定义表单校验需要配置对象
const rules = {
  username: [
    { min: 6, max: 10, message: '账号长度至少6位', trigger: 'change' },
  ],
  password: [
    { min: 6, max: 15, message: '密码长度至少6位', trigger: 'change' },
  ],
}
</script>
<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  @include set_background('@/assets/images/background.jpg');
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
