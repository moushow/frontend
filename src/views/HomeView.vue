<template>
  <el-container style="min-height: 100vh;">
    <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238,241,246); box-shadow: 2px 0 6px rgb(0 21 41 / 35%)">
      <el-menu
          :default-openeds="['1', '3']"
          style="min-height: 100%; overflow-x: hidden"
          background-color="rgb(48,65,86)"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse-transition="false"
          :collapse="isCollapse"
      >
        <div style="height: 60px; line-height: 60px; text-align: center">
          <img src="../assets/schedule.webp" alt="" style="width: 40px; position: relative; top: 15px; margin-right: 5px;" />
          <b style="color: white" v-show="logoTextShow">日程管理系统</b>
        </div>
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-message"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template #title>选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template #title>
            <i class="el-icon-menu"></i>
            <span>导航二</span>
          </template>
          <el-submenu index="2-4">
            <template #title>选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template #title>
            <i class="el-icon-setting"></i>
            <span>导航三</span>
          </template>
          <el-submenu index="3-4">
            <template #title>选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px; display: flex">
        <div style="flex: 1; font-size: 18px">
          <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span> 
        </div>
        <el-dropdown style="width: 70px">
          <span>王小虎</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <el-main>
        <div style="margin-bottom: 30px">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">日程查询</a></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="padding: 10px 0">
          <el-input style="width: 200px" placeholder="请输入日期" suffix-icon="el-icon-date"></el-input>
          <el-input style="width: 200px" placeholder="请输入事务" suffix-icon="el-icon-message-solid" class="ml-5"></el-input>
          <el-input style="width: 200px" placeholder="请输入备注" suffix-icon="el-icon-edit" class="ml-5"></el-input>
          <el-button class="ml-5" type="primary">搜索</el-button>
        </div>

        <div style="margin: 10px 0">
          <el-button type="primary">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
          <el-button type="danger">批量删除 <i class="el-icon-remove-outline"></i></el-button>
          <el-button type="primary">导入 <i class="el-icon-bottom"></i></el-button>
          <el-button type="primary">导出 <i class="el-icon-top"></i></el-button>
        </div>

        <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
          <el-table-column prop="date" label="日期" width="140"></el-table-column>
          <el-table-column prop="schedule" label="事务" width="120"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="success">编辑 <i class="el-icon-edit"></i></el-button>
              <el-button type="danger">删除 <i class="el-icon-remove-outline"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="padding: 10px 0">
          <el-pagination :page-sizes="[5, 10, 15, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    const item = {
      date: '2016-05-02',
      schedule: '王小虎',
      remark: '提瓦特'
    };
    return {
      tableData: Array(10).fill(item),
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      headerBg: 'headerBg'
    };
  },
  created(){
    //请求分页查询数据
    fetch("http://localhost:9090/user/page?pageNum=1&pageSize=2").then(res =>res.json()).then(res =>{
      console.log(res)
    })
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.sideWidth = 64;
        this.collapseBtnClass = 'el-icon-s-unfold';
        this.logoTextShow = false;
      } else {
        this.sideWidth = 200;
        this.collapseBtnClass = 'el-icon-s-fold';
        this.logoTextShow = true;
      }
    }
  }
};
</script>

<style>
.headerBg {
  background: #ccc !important;
}
</style>
