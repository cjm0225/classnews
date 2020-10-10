import axios from "axios"
import Vue from 'vue';
import router from '../router'
import { Toast } from 'vant';

Vue.use(Toast);

// 将axios挂载到全局中
Vue.prototype.$axios = axios

// 设置默认服务器，在ajax请求中会自动加上协议，域名，端口
axios.defaults.baseURL = "http://127.0.0.1:3000"


// axios请求拦截器
axios.interceptors.request.use(request => {
    // 如果本地有token,而且axios请求headers.authrization没有带上token,就自动带上token
    if (localStorage.getItem("token") && !request.headers.Authorization) {
        request.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }

    return request;
});


// axios响应拦截器
axios.interceptors.response.use(response => {

    // 匹配响应状态码为400,但是服务器返回失败码为400-500之间的服务器状态码
    const reg = /^4\d{2}$/;
    if (reg.test(response.data.statusCode)) {
        Toast.fail(response.data.message);
    }


    if (response.data.message == '用户信息验证失败') {
        // 清理所有错误或者过期的信息, 再跳转
        localStorage.clear()
        router.replace('/login')
    }

    return response;
}, error => {
    Toast.fail("服务器错误");
});


export default axios;