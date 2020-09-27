<template>
  <div>
    <HomeTop></HomeTop>
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
    // 封装一个查找每个类别文章数据的ajax请求
    findArticleData(name, title) {
      // 数据的name就是文章分类名字,title是插件封装的每一个标签的名字,name是active从初始值0开始的数值
      const news = this.titleList.find((item) => {
        return item.name === title;
      });

      // 找到栏目名字相同的对象数值,并取出响应的文章类型id
      const { id } = news;

      // 发送请求,获取响应的文章类型
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
        console.log(this.titleList);
      });
    },
    // 第一次进入画面的时候,自动渲染第一个标题的新闻内容
    renderedHandler(name, title) {
      if (name === 0) {
        this.findArticleData(name, title);
      }
    },
    // 每次点击标题都获取响应的标题新闻内容
    clickHandler(name, title) {
      this.findArticleData(name, title);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-tab {
  font-size: 18/360 * 100vw;
}
</style>