
// 创建一个事件总线,统一管理事件触发,让组件间可以立即通信
import Vue from "vue"

const eventBus = new Vue();


export default eventBus

