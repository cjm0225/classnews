import Vue from 'vue'
import moment from "moment"

// 先修改为中文显示
moment.locale('zh-cn')


// 全局过滤方法
Vue.filter('formatTime', function (Oldvalue) {
    const time = moment(Oldvalue).format("YYYYMMDDHHmmss");
    const formatTime = moment(time, "YYYYMMDDhhmmss").fromNow();
    return formatTime;
});

export default moment