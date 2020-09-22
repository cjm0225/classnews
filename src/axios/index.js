import axios from "axios"
import Vue from 'vue';
import router from '../router'
import { Toast } from 'vant';

Vue.use(Toast);

Vue.prototype.$axios = axios

// axios响应拦截器
axios.interceptors.response.use(response => {
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