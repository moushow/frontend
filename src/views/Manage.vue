<template>
  <el-container style="min-height: 100vh;">
    <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238,241,246); box-shadow: 2px 0 6px rgb(0 21 41 / 35%)">
      <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow" />
    </el-aside>

    <el-container>
      <el-header style="border-bottom: 1px solid #ccc; ">
        <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse" :user="user"/>
      </el-header>

      <el-main>
        
        <router-view @refreshUser="getUser" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Message } from 'element-ui';
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";

export default {
  name: 'Home',
  data() {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      headerBg: 'headerBg',
      user:{}
    };
  },
 
  components:{
    Aside,
    Header
  },
  created(){
    //从后台获取最新的User数据
    this.getUser()
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
    },
    //获取用户的最新数据
    getUser(){
      let username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : ""
      if(username){
        //从后台获取User数据
        this.request.get("/user/" + username).then(res =>{
          //重新赋值后台的最新User数据
          this.user = res.data
        })
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
