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
            <el-menu-item index="/course">
            <i class="el-icon-collection"></i>
            <span slot="title">课程管理</span>
            </el-menu-item>
            <el-menu-item index="/calendar">
            <i class="el-icon-date"></i>
            <span slot="title">日历视图</span>
            </el-menu-item>
            <el-menu-item index="/curriculum">
            <i class="el-icon-search"></i>
            <span slot="title">课表查询</span>
            </el-menu-item>
          </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>社交互动</span>
          </template>
          <el-menu-item index="/person">
            <i class="el-icon-user"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="/friend">
            <i class="el-icon-user-solid"></i>
            <span slot="title">好友列表</span>
          </el-menu-item>
          <el-menu-item index="/chat">
            <i class="el-icon-chat-line-round"></i>
            <span slot="title">在线聊天</span>
          </el-menu-item>
        </el-submenu>

      </el-menu>
</template>

<script>
export default{
    name:"Aside",
    props:{
        isCollapse: Boolean,
        logoTextShow: Boolean
    }
}
</script>

<style scoped>

</style>