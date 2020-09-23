import axios from "axios"
import Vue from 'vue';
import router from '../router'
import { Toast } from 'vant';

Vue.use(Toast);

Vue.prototype.$axios = axios

axios.defaults.baseURL = "http://127.0.0.1:3000"

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