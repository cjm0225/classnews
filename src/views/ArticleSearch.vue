<template>
  <div class="content">
    <TopNav title="搜索" class="topnav" @pushPage="pushPage">
      <div class="search">
        <div class="iconfont iconsearch">
          <span>通灵兽消失术</span>
        </div>
      </div>
    </TopNav>

    <!-- 历史记录 -->
    <div class="historySection">
      <h3>历史记录</h3>
      <div class="historyList">
        <div class="history">美女</div>
      </div>
    </div>

    <!-- 热门搜索 -->
    <div class="hotSearch">
      <h3>热门搜索</h3>
      <div class="hotSearchList">
        <div class="hot">办公室小野否认解散</div>
        <div class="hot">月季如何嫁接</div>
        <div class="hot">办公室小野否认解散</div>
        <div class="hot">月季如何嫁接</div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "../components/TopNav";
export default {
  components: {
    TopNav,
  },
  methods: {
    pushPage() {
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="less" scoped>
.topnav {
  display: flex;
  align-items: center;
  .search {
    margin: 0 8/360 * 100vw;
    box-sizing: border-box;
    border: 1px solid #ccc;
    width: 240/360 * 100vw;
    height: 30/360 * 100vw;
    padding-left: 10/360 * 100vw;
    border-radius: 15/360 * 100vw;
    .iconsearch {
      color: #cccccc;
      line-height: 30/360 * 100vw;
      span {
        color: black;
        margin-left: 10/360 * 100vw;
      }
    }
  }
}
.historySection {
  margin: 0 20/360 * 100vw;
  padding-bottom: 20/360 * 100vw;
  border-bottom: 1px solid #ccc;
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
