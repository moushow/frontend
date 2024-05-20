<template>
  <div class="wrapper">
    <div class="left-half"></div>
    <div class="right-half">
      <div class="login-container">
        <div class="login-header">
          <b>您好</b>
          <br><br>
          <b>欢迎使用日程管理系统！</b>
        </div>
        <el-form :model="user" :rules="rules" ref="loginForm">
          <el-form-item prop="username" class="form-item">
            <el-input
                size="default"
                class="input"
                v-model="user.username"
                placeholder="请输入用户名">
              <i slot="prefix" class="el-icon-user" style=" left: 5px; top: 50%; transform: translateY(-50%); position: absolute"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="form-item">
            <el-input
                size="default"
                class="input"
                v-model="user.password"
                show-password
                placeholder="请输入密码">
              <i slot="prefix" class="el-icon-lock" style=" left: 5px; top: 50%; transform: translateY(-50%); position: absolute"></i>
            </el-input>
          </el-form-item>
          <div class="button-container">
            <el-button type="primary" size="small" autocomplete="off" class="el-button" @click="login">登录</el-button>
            <el-button type="warning" size="small" autocomplete="off" class="el-button" @click="$router.push('/register')">注册</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "LoginView",
  data() {
    return {
      user: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.request("/user/login", this.user).then(res =>{
        if(!res){
          this.$message.error("用户名或密码错误")
        }else{
          this.$router.push("/")
        }
      })
    }
  }
}
</script>

<style>
.wrapper {
  display: flex;
  height: 100vh;
  background-image: url('@/assets/background.jpg');
  background-size: cover;
  background-position: center;
  overflow: hidden;
}
.left-half {
  flex: 1;
}
.right-half {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container {
  background-color: #fff;
  width: 400px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.login-header {
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
}
.input {
  margin-bottom: 15px;
}
.form-item{
  margin: 0 0 20px;
}
.button-container {
  display: flex;
  justify-content: space-between;
}
.button-container .el-button {
  flex: 1;
  margin: 0 10px;
  font-size: 16px;
}

</style>
