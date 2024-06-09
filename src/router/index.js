import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Manage.vue'),
    redirect:"/login",
    children:[
      {
        path:'home',name:'首页',component:() => import("../views/Home.vue"),
      },
      {
        path:'schedule',name:'系统功能  /  日程管理',component:() => import("../views/Schedule.vue"),
      },
      {
        path:'calendar',name:'系统功能  /  日历视图',component:() => import("../views/Calendar.vue"),
      },
      {
        path:'person',name:'社交互动  /  个人中心',component:() => import("../views/Person.vue"),
      },
      {
        path:'password',name:'社交互动  /  个人中心  /  修改密码',component:() => import("../views/Password.vue"),
      },
      {
        path:'curriculum',name:'系统功能  /  课表查询',component:() => import("../views/Curriculum.vue"),
      },
      {
        path:'course',name:'系统功能  /  课程管理',component:() => import("../views/Course.vue"),
      },
      {
        path:'friend',name:'社交互动  /  好友列表',component:() => import("../views/Friend.vue"),
      },
      {
        path:'chat',name:'社交互动  /  在线聊天',component:() => import("../views/Chat.vue"),
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//路由守卫
router.beforeEach((to,from,next) => {
  localStorage.setItem("currentPathName",to.name)  //设置当前路由名称
  store.commit("setPath")
  next()
})

export default router
