<template>
  <div class="news" @click="toArtilceDetail">
    <!-- 显示类型为1,但图片只有一张的新闻 -->
    <div v-if="categoryNews.type === 1 && categoryNews.cover.length === 1">
      <div class="typeOne">
        <div class="left">
          <div class="title top">{{ categoryNews.title }}</div>
          <div class="bottom">
            <div class="author">{{ categoryNews.user.nickname }}</div>
            <div class="follow" v-if="categoryNews.comment_length >= 0">
              {{ categoryNews.comment_length }}&nbsp;跟帖
            </div>
            <div class="follow" v-if="categoryNews.comments">
              {{ categoryNews.comments.length }}&nbsp;跟帖
            </div>
          </div>
        </div>
        <div class="right">
          <img
            :src="$axios.defaults.baseURL + categoryNews.cover[0].url"
            v-if="categoryNews.cover[0].url.indexOf('http') === -1"
          />
          <img :src="categoryNews.cover[0].url" v-else />
        </div>
      </div>
    </div>

    <!-- 显示类型为1,但图片有三张的新闻 -->
    <div
      v-if="
        categoryNews.type === 1 &&
        categoryNews.cover.length > 1 &&
        categoryNews.cover.length <= 3
      "
    >
      <div class="typeTwo">
        <div class="title">{{ categoryNews.title }}</div>
        <div class="imgList">
          <img :src="img.url" v-for="img of categoryNews.cover" :key="img.id" />
        </div>
        <div class="bottom">
          <div class="author">{{ categoryNews.user.nickname }}</div>
          <div class="follow" v-if="categoryNews.comment_length >= 0">
            {{ categoryNews.comment_length }}&nbsp;跟帖
          </div>
          <div class="follow" v-if="categoryNews.comments">
            {{ categoryNews.comments.length }}&nbsp;跟帖
          </div>
        </div>
      </div>
    </div>

    <!-- 显示类型为2的新闻 -->
    <div v-if="categoryNews.type === 2">
      <div class="typeThree">
        <div class="title">{{ categoryNews.title }}</div>
        <div class="video">
          <img :src="categoryNews.cover[0].url" />
          <span class="iconfont iconshipin"></span>
        </div>
        <div class="bottom">
          <div class="author">{{ categoryNews.user.nickname }}</div>
          <div class="follow" v-if="categoryNews.comment_length >= 0">
            {{ categoryNews.comment_length }}&nbsp;跟帖
          </div>
          <div class="follow" v-if="categoryNews.comments">
            {{ categoryNews.comments.length }}&nbsp;跟帖
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categoryNews: Object,
  },
  methods: {
    toArtilceDetail() {
      this.$router.push(
        "/articledetail/" +
          this.categoryNews.id +
          "/" +
          this.categoryNews.comment_length
      );
    },
  },
};
</script>

<style lang="less" scoped>
.news {
  border-bottom: 1px solid #ccc;
  padding: 20/360 * 100vw 10/360 * 100vw;
  .typeOne {
    display: flex;
    font-size: 16/360 * 100vw;
    .left {
      flex: 1;
      .bottom {
        display: flex;
        color: #a4a4a4;
        margin-top: 12/360 * 100vw;
        font-size: 14/360 * 100vw;
        .follow {
          margin-left: 20/360 * 100vw;
        }
      }
    }
    .right {
      width: 121/360 * 100vw;
      height: 75/360 * 100vw;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .typeTwo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      font-size: 16/360 * 100vw;
      margin-bottom: 5/360 * 100vw;
    }
    .imgList {
      img {
        width: 110/360 * 100vw;
        height: 75/360 * 100vw;
        object-fit: cover;
        &:nth-child(2) {
          margin: 0 2px;
        }
      }
    }
    .bottom {
      display: flex;
      color: #a4a4a4;
      margin-top: 12/360 * 100vw;
      font-size: 14/360 * 100vw;
      .follow {
        margin-left: 20/360 * 100vw;
      }
    }
  }
  .typeThree {
    .title {
      font-size: 16/360 * 100vw;
      margin-bottom: 5/360 * 100vw;
    }
    .video {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 340/360 * 100vw;
      height: 170/360 * 100vw;
      img {
        width: 100%;
        height: 100%;
      }
      .iconshipin {
        position: absolute;
        font-size: 50/360 * 100vw;
        color: #fff;
        text-align: center;
        line-height: 50/360 * 100vw;
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        background-color: #ffffff8a;
        border-radius: 50%;
      }
    }
    .bottom {
      display: flex;
      color: #a4a4a4;
      margin-top: 12/360 * 100vw;
      font-size: 14/360 * 100vw;
      .follow {
        margin-left: 20/360 * 100vw;
      }
    }
  }
}
</style>