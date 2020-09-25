<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item" :title="item" />
  </van-list>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束,如果没有把   this.loading = false;,那么就会一直触发loading事件
        // this.loading = false;
        console.log(this.loading);

        // 数据全部加载完成,如果没有把 this.finished = true;,那么就会一直触发onload事件
        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
      }, 1000);
    },
  },
};
</script>