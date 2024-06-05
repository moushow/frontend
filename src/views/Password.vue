<template>
  <el-card style="width: 500px">
    <el-form label-width="120px" size="small" :model="form" :rules="rules" ref="pass">
      <el-form-item label="原密码" prop="password">
        <el-input v-model="form.password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "Password",
  data(){
    return{
      form: {},
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      rules: {
        password: [
          { required: true, massage: '请输入密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, massage: '请输入新密码', trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, massage: '请确认密码', trigger: 'blur' },
        ]
      }
    }
  },
  created(){
    this.form.username = this.user.username
  },
  methods: {
    save(){
      this.$refs.pass.validate((valid) => {
        if(valid){
          if(this.form.newPassword !== this.form.confirmPassword){
            this.$message.error("两次输入的新密码不相同")
            return false
          }
          if(this.form.password === this.form.newPassword){
            this.$message.error("新密码与原密码相同")
            return false
          }
          this.request.post("/user/password", this.form).then(res => {
            if(res.code === '200'){
              this.$router.push("/")
              this.$message.success("修改成功")
            }else{
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style>

</style>