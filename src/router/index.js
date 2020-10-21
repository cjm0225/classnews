import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/Home"
import CategoryList from "../views/CategoryList"
import ArticleSearch from "../views/ArticleSearch"
import ArticleDetail from "../views/ArticleDetail"


import Login from "../views/Login"
import Register from "../views/Register"

import Personal from "../views/Personal"
import Profile from "../views/Profile"
import Follow from "../views/Follow"
import CollectionList from "../views/CollectionList"
import CommentList from "../views/CommentList"
import MoreComment from "../views/MoreComment"



import Test from "../views/Test"


import { Toast } from 'vant';

Vue.use(Toast);

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
    path: "/test",
    component: Test,

  },

  {
    path: "/personal",
    component: Personal,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/follow",
    component: Follow,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: "/collectionList",
    component: CollectionList,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: "/categoryList",
    component: CategoryList
  },
  {
    path: "/commentList",
    component: CommentList,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: "/articlesearch",
    component: ArticleSearch
  },
  {
    path: "/articledetail/:id/:length",
    component: ArticleDetail

  },
  {
    path: "/morecomment/:id",
    component: MoreComment
  },

]

const router = new VueRouter({
  routes
})


// 导航守卫:beforeEach(to,from,next),to目标路由,from起始路由,next()进行下一步操作的钩子函数
router.beforeEach((to, from, next) => {
  // 如果客户要跳转到个人中心页面,那就需要权限验证,因此需要先做验证,再跳转
  if (to.meta.requiresAuth) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      Toast.fail("请先登录");
      setTimeout(() => {
        router.push("/login");
      }, 800);
    }
  } else {
    next();
  }
});

export default router
