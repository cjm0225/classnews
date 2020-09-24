
<template>
  <div>
    <HomeTop @click="toPersonalPage"></HomeTop>
    <van-tabs
      v-model="active"
      color="#3a3a3a"
      background="#e4e4e4"
      @rendered="renderedHandler"
      @click="clickHandler"
    >
      <van-tab :title="title.name" v-for="title of titleList" :key="title.id">
        <TypeNewShow
          v-for="categoryNews of newsList"
          :key="categoryNews.id"
          :categoryNews="categoryNews"
        ></TypeNewShow>
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
      active: 0,
      titleList: [],
      newsList: [],
    };
  },
  components: {
    HomeTop,
    TypeNewShow,
  },
  created() {
    this.getTitleList();
  },
  methods: {
    toPersonalPage() {
      this.$router.push("/personal");
    },
    // 每次点击标题都获取响应的标题新闻内容
    clickHandler(name, title) {
      const news = this.titleList.find((item) => {
        return item.name === title;
      });
      const id = news.id;
      this.$axios({
        url: "/post",
        params: {
          category: id,
        },
      }).then((response) => {
        this.newsList = response.data.data;
      });
    },
    // 获取标题列表
    getTitleList() {
      this.$axios({
        url: "/category",
      }).then((response) => {
        this.titleList = response.data.data;
      });
    },
    // 第一次进入画面的时候,自动渲染第一个标题的新闻内容
    renderedHandler(name, title) {
      if (name === 0) {
        const news = this.titleList.find((item) => {
          return item.name === title;
        });
        const id = news.id;
        this.$axios({
          url: "/post",
          params: {
            category: id,
          },
        }).then((response) => {
          this.newsList = response.data.data;
        });
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