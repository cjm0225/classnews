<template>
  <div class="content">
    <TopNav title="搜索" class="topnav" @pushPage="pushPage" @search="search">
      <input
        type="text"
        placeholder="请输入要搜索的新闻关键词"
        class="input"
        v-model="keyword"
      />
    </TopNav>

    <!-- 总共有三种显示情况 -->
    <!-- 
      第一:页面初始状态
      第二:显示文章状态
      第三:空状态
     -->

    <div v-show="initpage">
      <!-- 历史记录 -->
      <div class="historySection">
        <h3>历史记录</h3>
        <div class="historyList">
          <div
            class="history"
            v-for="(keyword, index) of searchHistory"
            :key="index"
            @click="historySearch(keyword)"
          >
            {{ keyword }}
          </div>
        </div>
      </div>

      <!-- 热门搜索 -->
      <div class="hotSearch">
        <h3>热门搜索</h3>
        <div class="hotSearchList">
          <div class="hot">热门搜索</div>
          <div class="hot">热门搜索</div>
          <div class="hot">热门搜索</div>
          <div class="hot">热门搜索</div>
        </div>
      </div>
    </div>

    <div v-show="hasArticle">
      <TypeNewShow
        v-for="news of articleList"
        :key="news.id"
        :categoryNews="news"
      ></TypeNewShow>
    </div>

    <div v-show="emptyArticle">
      <van-empty description="该关键词没有新闻,请重新搜索" />
    </div>
  </div>
</template>

<script>
import TopNav from "../components/TopNav";
import TypeNewShow from "../components/TypeNewShow";
export default {
  data() {
    return {
      keyword: "",
      searchHistory: [],
      articleList: [],
      hasArticle: false,
      emptyArticle: false,
      initpage: true,
    };
  },
  components: {
    TopNav,
    TypeNewShow,
  },
  created() {
    if (localStorage.getItem("history")) {
      this.searchHistory = JSON.parse(localStorage.getItem("history"));
    }
  },
  methods: {
    pushPage() {
      if (this.emptyArticle) {
        this.hasArticle = false;
        this.emptyArticle = false;
        this.initpage = true;

        this.keyword = "";
        return;
      }

      if (this.hasArticle) {
        this.hasArticle = false;
        this.emptyArticle = false;
        this.initpage = true;

        this.keyword = "";
        return;
      }

      this.$router.push("/home");
    },
    search() {
      // 如果搜索词已存在,就不新增在关键词数组中
      if (!this.searchHistory.includes(this.keyword)) {
        this.searchHistory.push(this.keyword);
        localStorage.setItem("history", JSON.stringify(this.searchHistory));
      }

      // 如果搜索词为空,则提示
      if (this.keyword === "") {
        this.$toast.fail("关键词不能为空");
        return;
      }

      this.$axios({
        url: "/post_search",
        params: {
          keyword: this.keyword,
        },
      }).then((response) => {
        this.articleList = response.data.data;
        if (this.articleList.length > 0) {
          this.hasArticle = true;
          this.emptyArticle = false;
          this.initpage = false;
        } else {
          this.hasArticle = false;
          this.emptyArticle = true;
          this.initpage = false;
        }
      });
    },
    historySearch(keyword) {
      this.keyword = keyword;
    },
  },
};
</script>

<style lang="less" scoped>
.topnav {
  display: flex;
  align-items: center;
  .input {
    margin: 0 8/360 * 100vw;
    box-sizing: border-box;
    border: 1px solid #ccc;
    width: 240/360 * 100vw;
    height: 30/360 * 100vw;
    padding-left: 10/360 * 100vw;
    border-radius: 15/360 * 100vw;
  }
}
.historySection {
  margin: 0 20/360 * 100vw;
  padding-bottom: 20/360 * 100vw;
  border-bottom: 1px solid #ccc;
  .historyList {
    display: flex;
    flex-wrap: wrap;
    .history {
      padding-right: 20/360 * 100vw;
      margin-top: 15/360 * 100vw;
    }
  }
}
.hotSearch {
  margin: 0 20/360 * 100vw;
  .hotSearchList {
    display: flex;
    flex-wrap: wrap;
    .hot {
      width: 45%;
      padding-right: 10/360 * 100vw;
      margin-bottom: 10/360 * 100vw;
    }
  }
}
</style>
