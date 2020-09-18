import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 引入vant库.因为vant属于vue体系中的库,可以使用Vue.use(Vant)来注册
// 这是一种不推荐的用法,因为这种用法引入了vant的全部模块,增加代码体积,后面可以使用babel插件
import Vant from "vant"
import "vant/lib/index.css"
Vue.use(Vant)

// 引入ajax请求库axios库,并挂载到原型上,这样相当于全局注册
import axios from "axios"
Vue.prototype.$axios = axios


new Vue({
  el: "#app",
  router,
  render: function (h) { return h(App) }
})
