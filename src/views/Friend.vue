<template>
  <div>
    <div style="padding: 10px 0">
      <el-input style="width: 200px" placeholder="请输入用户名" suffix-icon="el-icon-user" class="ml-5" v-model="friendName"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handadd">添加好友 <i class="el-icon-circle-plus-outline"></i></el-button>
    </div>


    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
      <el-table-column prop="friendName" label="用户名" width="220"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="220"></el-table-column>
      <el-table-column prop="telephone" label="电话" width="220"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="220"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该好友吗？"
              @confirm="del(scope.row.friendName)"
          >
            <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="添加好友" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="110px" size="small">
        <el-form-item label="请输入用户名" >
          <el-input v-model="form.friendName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default{
  name: "Friend",
  data(){
    return{
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      friendName: "",
      nickname: "",
      telephone: "",
      email: "",
      form:{},
      dialogFormVisible: false,
      multipleSelection:[],
      headerBg:'headerBg',
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  created(){
    this.load();
  },
  methods:{
    load(){
      this.request.get("/friend/page",{
        params:{
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          friendName: this.friendName,
          nickname: this.nickname,
          telephone: this.telephone,
          email: this.email,
          username: this.user.username
        }
      }).then(res =>{
        console.log(res)
        this.tableData = res.data
        this.total = res.total
        this.checkFriendRequests()
      })
    },
    checkFriendRequests() {
      this.request.get("/friend/" + this.user.username).then(res =>{
        if(res){
          this.$confirm('您有新的好友申请，来自用户：' + res.username + ' 是否通过？', '提示', {
            confirmButtonText: '同意',
            cancelButtonText: '拒绝',
            type: 'info'
          }).then(() => {
            this.handleFriendRequests(true, res.username);
          }).catch(() => {
            this.handleFriendRequests(false, res.username);
          });
        }
      })
    },
    handleFriendRequests(accepted, name) {
      if (accepted) {
        this.request.post(`/friend/agree/${this.user.username}/${name}`).then(res =>{
          if(res.code === '200'){
            this.$message.success('已同意好友申请');
          }else{
            this.$message.error(res.msg);
          }
        })
      } else {
        this.request.post(`/friend/refuse/${this.user.username}/${name}`).then(res =>{
          if(res.code === '200'){
            this.$message.info('已拒绝好友申请');
          }else{
            this.$message.error(res.msg);
          }
        })
      }
    },
    save(){
      this.form.username = this.user.username
      this.request.post("/friend",this.form).then(res =>{
        if(res.code === '200'){
          this.$message.success("好友申请已发送")
          this.dialogFormVisible = false
          this.load()
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    cancel(){
      this.dialogFormVisible=false
      this.load()
    },
    handadd(){
      this.dialogFormVisible = true
      this.form = {}
    },
    handleEdit(row){
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    del(friendName){
      this.request.delete(`/friend/delete/${friendName}/${this.user.username}`).then(res =>{
        if(res){
          this.$message.success("删除成功")
          this.dialogFormVisible = false
          this.load()
        }else{
          this.$message.error("删除失败")
        }
      })
    },
    handleSelectionChange(val){
      console.log(val)
      this.multipleSelection = val
    },
    reset(){
      this.friendName = ""
      this.load()
    },
    handleSizeChange(pageSize){
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum){
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    }
  }
}
</script>


<style>
.headerBg{
  background: #eee!important;
}
</style>