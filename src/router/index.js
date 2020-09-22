import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home"
import Login from "../views/Login"
import Register from "../views/Register"
import Personal from "../views/Personal"

Vue.use(VueRouter)



const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,

  },
  {
    path: "/personal",
    component: Personal,
  }
]

const router = new VueRouter({
  routes
})


// 导航守卫:beforeEach(to,from,next),to目标路由,from起始路由,next()进行下一步操作的钩子函数
router.beforeEach((to, from, next) => {
  // 如果客户要跳转到个人中心页面,那就需要权限验证,因此需要先做验证,再跳转
  if (to.path === "/personal") {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router
