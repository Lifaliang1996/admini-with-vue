<template>
  <div class="login">
    <h1>ADMINI SYSTEM</h1>
    <el-form
      class="form"
      ref="form"
      label-position="top"
      label-width="80px"
      :model="user"
      :rules="rules"
    >
      <h2>登 录</h2>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="user.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password"></el-input>
      </el-form-item>
      <el-button class="login-btn" type="primary" :loading="isLoading" @click="onSubmit"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/network/user'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      user: {
        phone: '18201288771',
        password: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '请输入6到18位字符', trigger: 'blur' }
        ]
      },
      isLoading: false
    }
  },

  methods: {
    async onSubmit () {
      try {
        // 表单验证
        await (this.$refs.form as Form).validate()
        this.isLoading = true

        // 登录
        const { data } = await login(this.user)
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          this.$store.commit('setUser', data.content)
          this.$message.success('登录成功！')

          // 重定向到之前的页面或首页
          const toName = this.$route.query.to as string || 'home'
          this.$router.push({ name: toName })
        }
      } catch (error) {}

      this.isLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  min-width: 980px;
  height: 100vh;
  padding-bottom: 50px;
  align-items: center;
  justify-content: center;

  h1 {
    margin-bottom: 3rem;
    font-weight: 300;
    font-size: 2.5rem;
    color: #8d8d8d;
  }

  .form {
    border-radius: 5px;
    width: 350px;
    padding: 20px;
    background-color: #fff;

    h2 {
      text-align: center;
      font-weight: 300;
      margin-bottom: 1rem;
    }
  }

  .login-btn {
    width: 100%;
  }
}
</style>
