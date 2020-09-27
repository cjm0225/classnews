
<template>
  <div>
    <HomeTop></HomeTop>
    <van-tabs v-model="activeIndex" color="#3a3a3a" background="#e4e4e4">
      <van-tab :title="title.name" v-for="title of titleList" :key="title.id">
        <van-list
          v-model="title.loading"
          :finished="title.finished"
          finished-text="新闻已经全部加载完了"
          @load="LoadMoreNews"
          :immediate-check="false"
        >
          <TypeNewShow v-for="news of title.newsList" :key="news.id" :categoryNews="news"></TypeNewShow>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import HomeTop from "../components/HomeTop";
import TypeNewShow from "../components/TypeNewShow";
export default {
  data() {
    return {
      activeIndex: 0,
      titleList: [],
    };
  },
  components: {
    HomeTop,
    TypeNewShow,
  },
  created() {
    this.getNews();
  },
  methods: {
    toPersonalPage() {
      this.$router.push("/personal");
    },
    LoadMoreNews() {
      // List列表插件的onload事件会自动在屏幕下拉到底部的时候自动触发处理函数
      this.titleList[this.activeIndex].pageIndex += 1;

      // 刷新新闻内容
      this.loadNewsList();
    },
    // 封装一个查找每个类别文章数据的ajax请求
    // 获取标题列表
    getNews() {
      this.$axios({
        url: "/category",
      }).then((response) => {
        // 在这里,我们需要先改造数据,再赋值给vue的data中的属性
        // 因为vue监听原理是与第一次赋值的数据有关,vue只能监听第一次赋值绑定的数据结构
        // 在赋值之后增加的数据结构是无法监听的
        // 总的来说,vue数据监听就是在vue的data属性中第一次绑定之后就初始化数据监听的

        // 遍历数据并给数据增加自己想要的字段
        // 给每一个对象增加属性,可以让每一个对象都能管理自己的属性,而不会发生冲突

        this.titleList = response.data.data.map((item) => {
          return {
            ...item,
            newsList: [],
            pageSize: 5,
            pageIndex: 1,
            loading: false,
            finished: false,
          };
        });

        // 第一次加载自动刷新页面
        this.loadNewsList();
      });
    },
    loadNewsList() {
      this.$axios({
        url: "/post",
        params: {
          category: this.titleList[this.activeIndex].id,
          pageSize: this.titleList[this.activeIndex].pageSize,
          pageIndex: this.titleList[this.activeIndex].pageIndex,
        },
      }).then((response) => {
        console.log(response);
        // 此时赋值给已有的空数组,那就可以让后面新增的数据也实现监听
        this.titleList[this.activeIndex].newsList = [
          ...this.titleList[this.activeIndex].newsList,
          ...response.data.data,
        ];

        // 数据显示完成,就通知插件停止加载状态
        this.titleList[this.activeIndex].loading = false;

        // 如果没有数据了,就停止加载,并显示 finished-text
        if (
          response.data.data.length < this.titleList[this.activeIndex].pageSize
        ) {
          this.titleList[this.activeIndex].finished = true;
        }
      });
    },
  },
  watch: {
    activeIndex() {
      // 当每次标题页被更新的时候再次将数据添加到响应的对象中管理
      // 优化:因为每次都会将新数据添加到原有空数组中,考虑到并不需要实时更新数据,可以判断是否已有数据后去减少请求
      if (this.titleList[this.activeIndex].newsList.length === 0) {
        this.loadNewsList();
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-tab {
  font-size: 18/360 * 100vw;
}
</style>