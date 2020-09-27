<template>
  <div>
    <div class="typeOne" v-if="articleDetail.type === 1">
      <div class="top">
        <span class="iconfont iconjiantou" @click="$router.back(1)"></span>
        <h3 class="logo">new</h3>
        <div
          class="followBtn"
          :class="{
            unfollow: !articleDetail.has_follow,
          }"
          @click="handlerFollow"
        >
          {{ articleDetail.has_follow ? "已关注" : "关注" }}
        </div>
      </div>
      <div class="content">
        <h2 class="title">{{ articleDetail.title }}</h2>
        <div class="info">
          <div class="user" v-if="articleDetail.user">
            {{ articleDetail.user.nickname }}
          </div>
          <div class="time" v-if="articleDetail.create_date">
            {{ articleDetail.create_date.slice(0, 10) }}
          </div>
        </div>
        <div class="article" v-html="articleDetail.content"></div>
      </div>
    </div>
    <div class="typeTwo" v-if="articleDetail.type === 2">
      <div class="wrapper">
        <div class="overlay" @click="playhandler" v-if="isOverlayShow">
          <span class="iconfont iconshipin"></span>
        </div>
        <div class="video" @click="playhandler">
          <video
            src="https://video.pearvideo.com/mp4/adshort/20200925/cont-1699101-15402375_adpkg-ad_hd.mp4"
            controls
            ref="video"
            @pause="pausehandler"
            @seeking="seekinghandler"
          ></video>
        </div>
      </div>
      <div class="content">
        <div class="info">
          <img src="../assets/logo.png" class="avatar" />
          <span class="username">火星时报</span>
          <div class="followBtn">关注</div>
        </div>
        <div class="title">
          {{ articleDetail.title }}
        </div>
      </div>
    </div>
    <div class="bottom">
      <div
        class="like btn"
        :class="{
          liked: articleDetail.has_like,
        }"
        @click="handlerLike"
      >
        <span class="iconfont icondianzan"></span>
        <span>{{ articleDetail.like_length }}</span>
      </div>
      <div class="wechat btn">
        <span class="iconfont iconweixin"></span>
        <span>微信</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleDetail: [],
      isOverlayShow: true,
    };
  },
  created() {
    this.$axios({
      url: "/post/" + this.$route.params.id,
    }).then((response) => {
      this.articleDetail = response.data.data;
      console.log(this.articleDetail);
    });
  },
  methods: {
    handlerFollow() {
      if (this.articleDetail.has_follow) {
        this.$axios({
          url: "/user_unfollow/" + this.articleDetail.user.id,
        }).then((response) => {
          // 优化:减少一次请求,只在本次文章详情数据中手动修改数据
          // 也可以重新向服务器重新请求一次数据,但是考虑到关注按钮操作可以无限操作,用户可能会恶意操作,所以减少服务器压力,只请求关注接口数据,不请求文章详情数据
          this.articleDetail.has_follow = false;
        });
      } else {
        this.$axios({
          url: "/user_follows/" + this.articleDetail.user.id,
        }).then((response) => {
          this.articleDetail.has_follow = true;
        });
      }
    },
    handlerLike() {
      this.$axios({
        url: "/post_like/" + this.$route.params.id,
      }).then((response) => {
        console.log(response.data);
        if (response.data.message === "点赞成功") {
          // 直接手动修改,不重新请求文章详情数据
          this.articleDetail.has_like = true;
          this.articleDetail.like_length += 1;
        } else if (response.data.message === "取消成功") {
          this.articleDetail.has_like = false;
          this.articleDetail.like_length -= 1;
        }
      });
    },
    playhandler() {
      this.$refs.video.play();
      this.isOverlayShow = false;
    },
    pausehandler() {
      this.isOverlayShow = true;
    },
    timeupdatehandler() {
      this.isOverlayShow = false;
    },
    seekinghandler() {
      this.isOverlayShow = false;
    },
  },
};
</script>


<style lang="less" scoped>
.typeOne {
  margin: 0 20/360 * 100vw;
  .top {
    display: flex;
    align-items: center;

    font-size: 18/360 * 100vw;
    .logo {
      flex: 1;
      margin-left: 10/360 * 100vw;
    }
    .followBtn {
      font-size: 13/360 * 100vw;
      line-height: 20/360 * 100vw;
      padding: 0 6/360 * 100vw;
      border: 1px solid #888;
      border-radius: 10/360 * 100vw;
      &.unfollow {
        background-color: red;
        color: white;
        border: 1px solid red;
      }
    }
  }
  .content {
    .title {
      font-size: 20/360 * 100vw;
      margin-top: 0;
      margin-bottom: 10/360 * 100vw;
    }

    .info {
      display: flex;
      align-items: center;
      color: #888;
      font-size: 14/360 * 100vw;
      .user {
        margin-right: 10/360 * 100vw;
      }
    }
    .article {
      margin-top: 20/360 * 100vw;
      font-size: 14/360 * 100vw;
      line-height: 25/360 * 100vw;
      /deep/ img {
        max-width: 100%;
      }
    }
  }
}
.typeTwo {
  margin-bottom: 30/360 * 100vw;
  .wrapper {
    position: relative;
    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .iconshipin {
        font-size: 50/360 * 100vw;
        width: 60/360 * 100vw;
        height: 60/360 * 100vw;
        text-align: center;
        line-height: 60/360 * 100vw;
        color: white;
        background-color: #ffffffab;
        border-radius: 50%;
      }
    }
    video {
      width: 100%;
    }
  }
  .info {
    display: flex;
    align-items: center;
    margin: 10/360 * 100vw 20/360 * 100vw;
    .avatar {
      width: 30/360 * 100vw;
      height: 30/360 * 100vw;
      border-radius: 50%;
    }
    .username {
      flex: 1;
      font-size: 14/360 * 100vw;
      color: #888;
    }
    .followBtn {
      padding: 0 18/360 * 100vw;
      height: 26/360 * 100vw;
      border: 1px solid #888;
      border-radius: 13/360 * 100vw;
      text-align: center;
      line-height: 26/360 * 100vw;
      font-size: 14/360 * 100vw;
    }
  }
  .title {
    font-size: 16/360 * 100vw;
    margin: 20/360 * 100vw;
    margin-bottom: 0;
  }
}
.bottom {
  display: flex;
  padding: 0 80/360 * 100vw;
  justify-content: space-around;
  .btn {
    border: 1px solid #888;
    width: 60/360 * 100vw;
    height: 26 /360 * 100vw;
    border-radius: 13/360 * 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .liked {
    color: red;
  }
  .icondianzan {
    margin-right: 5 /360 * 100vw;
  }
  .iconweixin {
    margin-right: 5 /360 * 100vw;
    color: #0a0;
  }
}
</style>