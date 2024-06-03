<template>
    <el-menu
          :default-openeds="['1', '3']"
          style="min-height: 100%; overflow-x: hidden"
          background-color="rgb(48,65,86)"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse-transition="false"
          :collapse="isCollapse"
          router
      >
        <div style="height: 60px; line-height: 60px; text-align: center">
          <img src="../assets/logo.png" alt="" style="width: 30px; position: relative; top: 10px; margin-right: 5px;" />
          <b style="color: white; font-size: 18px" v-show="logoTextShow">日程管理系统</b>
        </div>

          <el-menu-item index="/home">
            <template slot="title">
            <i class="el-icon-house"></i>
            <span slot="title">主页</span>
          </template>

          </el-menu-item>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">系统功能</span>
          </template>
            <el-menu-item index="/schedule">
              <i class="el-icon-s-order"></i>
              <span slot="title">日程管理</span>
            </el-menu-item>
            <el-menu-item index="/calendar">
            <i class="el-icon-date"></i>
            <span slot="title">日历视图</span>
          </el-menu-item>
          </el-submenu>

        <!-- <el-submenu index="3">
          <template #title>
            <i class="el-icon-setting"></i>
            <span>导航三</span>
          </template>
          <el-submenu index="3-4">
            <template #title>选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu> -->
      </el-menu>
</template>

<script>
export default{
    name:"Aside",
    props:{
        isCollapse: Boolean,
        logoTextShow: Boolean
    },
    methods:{
      handleSelect(index){
        
      }
    }
}
</script>

<style scoped>

</style>