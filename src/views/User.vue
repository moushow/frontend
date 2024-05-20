<template>
    <div>
        <div style="margin-bottom: 30px">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">日程管理</a></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="padding: 10px 0">
          <el-input style="width: 200px" placeholder="请输入事务" suffix-icon="el-icon-message-solid" class="ml-5" v-model="event"></el-input>
          <el-input style="width: 200px" placeholder="请输入状态" suffix-icon="el-icon-s-order" class="ml-5" v-model="state"></el-input>
          <el-input style="width: 200px" placeholder="请输入备注" suffix-icon="el-icon-edit" class="ml-5" v-model="remark"></el-input>
          <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
          <el-button type="warning" @click="reset">重置</el-button>
        </div>

        <div style="margin: 10px 0">
          <el-button type="primary" @click="handadd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
          <el-button type="danger">批量删除 <i class="el-icon-remove-outline"></i></el-button>
          <el-button type="primary">导入 <i class="el-icon-bottom"></i></el-button>
          <el-button type="primary">导出 <i class="el-icon-top"></i></el-button>
        </div>

       
        <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
          <el-table-column type="selection"  width="55"></el-table-column>
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="date" label="日期" width="150"></el-table-column>
          <el-table-column prop="event" label="事务" width="150"></el-table-column>
          <el-table-column prop="state" label="状态" width="150"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
              <el-popconfirm
                  class="ml-5"
                  confirm-button-text='确定'
                  cancel-button-text='我再想想'
                  icon="el-icon-info"
                  icon-color="red"
                  title="确定删除这段日程吗？"
                  @confirm="del(scope.row.id)"
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

        <el-dialog title="日程" :visible.sync="dialogFormVisible" width="30%">
           <el-form label-width="80px" size="small">
            <el-form-item label="日期" >
              <el-input v-model="form.date" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="事务" >
              <el-input v-model="form.event" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="状态" >
              <el-input v-model="form.state" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" >
              <el-input v-model="form.remark" autocomplete="off"></el-input>
            </el-form-item>
    
    
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </div>
</el-dialog>

    </div>
</template>

<script>
export default{
    name: "User",
    data(){
        return{
            tableData: [],
            total: 0,
            pageNum: 1,
            pageSize: 2,
            date:"",
            event: "",
            state: "",
            remark: "",
            form:{},
            dialogFormVisible: false,
            multipleSelection:[],
            headerBg:'headerBg'
        }
    },
    created(){
      this.load();
    },
    methods:{
      load(){
      this.request.get("/schedule/page",{
        params:{
          pageNum:this.pageNum,
          pageSize: this.pageSize,
          date: this.date,
          event: this.event,
          state: this.state,
          remark: this.remark
        }
      }).then(res =>{
            console.log(res)
            this.tableData = res.data
            this.total = res.total
          })
    },
    save(){
      this.request.post("/schedule",this.form).then(res =>{
        if(res){
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()
        }else{
          this.$message.error("保存失败")
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
    del(id){
      this.request.delete("/schedule/" +id).then(res =>{
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
      this.date=""
      this.event=""
      this.state=""
      this.remark=""
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