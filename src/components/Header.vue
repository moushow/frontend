<template>
  <div style="line-height: 60px; display: flex; justify-content: space-between; align-items: center; width: auto">
    <div style="display: flex; align-items: center;">
      <span :class="collapseBtnClass" style="cursor: pointer; font-size: 20px;" @click="collapse"></span>
      <el-breadcrumb separator="/" style="display:inline-block; margin-left: 10px">
<!--        <el-breadcrumb-item style="font-weight: bold; color: black">首页</el-breadcrumb-item>-->
        <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown style="width: 150px; cursor: pointer; text-align: right">
      <div style="display: inline-block; position: relative; z-index: 1;">
        <img :src="user.avatar" alt="" style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px">
        <span style="position: relative; z-index: 2;">{{ user.nickname }}</span>
        <i class="el-icon-arrow-down" style="margin-left: 10px;"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <router-link to="/person" style="text-decoration: none">个人信息</router-link>
        </el-dropdown-item>
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <router-link to="/login" style="text-decoration: none">退出</router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
    collapse: Boolean,
    user: Object
  },
  computed: {
    currentPathName() {
      return this.$store.state.currentPathName;  //需要监听的数据
    }
  },
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  watch: { //监听路由变化
    currentPathName(newVal, oldVal) {
      console.log(newVal)
    }
  }
}
</script>

<style scoped>
</style>
