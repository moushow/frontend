<template>
  <div>
    <el-card style="width: 600px">
      <el-form label-width="80px" size="small">
        <el-form-item label="用户名" >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" >
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div style="text-align: center">
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default{
  name:"Person",
  data(){
    return{
      form:{}
    }
  },
  methods: {
    save(){

    }
  }
}
</script>

<style scoped>

</style>