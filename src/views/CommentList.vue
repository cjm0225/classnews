<template>
  <div>
    <TopNav title="精彩跟帖" @pushPage="pushPage"></TopNav>

    <div class="wrapper">
      <div class="commentInfo">
        <img src="../assets/logo.png" />
        <div class="user">
          <div class="username">网友</div>
          <div class="time">2小时前</div>
        </div>
        <div class="commentBtn">回复</div>
      </div>
      <div class="comment">文章说的很有道理</div>
    </div>

    <div class="wrapper">
      <div class="commentInfo">
        <img src="../assets/logo.png" />
        <div class="user">
          <div class="username">网友</div>
          <div class="time">2小时前</div>
        </div>
        <div class="commentBtn">回复</div>
      </div>
      <div class="moreCommentList">
        <!-- 更多评论 -->
        <div class="moreComment">
          <div class="moreCommentInfo">
            <div class="commentNumber">1</div>
            <div class="commentUser">火星网友</div>
            <div class="commentTime">2小时前</div>
            <div class="commentBtn">回复</div>
          </div>
          <div class="comment">文章说的很有道理!!!!</div>
        </div>

        <!-- 更多评论 -->
        <div class="moreComment">
          <div class="moreCommentInfo">
            <div class="commentNumber">1</div>
            <div class="commentUser">火星网友</div>
            <div class="commentTime">2小时前</div>
            <div class="commentBtn">回复</div>
          </div>
          <div class="comment">文章说的很有道理!!!!</div>
        </div>

        <!-- 更多评论 -->
        <div class="moreComment">
          <div class="moreCommentInfo">
            <div class="commentNumber">1</div>
            <div class="commentUser">火星网友</div>
            <div class="commentTime">2小时前</div>
            <div class="commentBtn">回复</div>
          </div>
          <div class="comment">文章说的很有道理!!!!</div>
        </div>
      </div>

      <div class="comment">文章说的很有道理</div>
    </div>
  </div>
</template>

<script>
import TopNav from "../components/TopNav";
export default {
  components: {
    TopNav,
  },
  created() {
    this.$axios({
      url: "/user_comments",
    }).then((response) => {
      console.log(response);
    });
  },
  methods: {
    pushPage() {
      this.$router.push("/personal");
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  margin: 0 15/360 * 100vw;
  margin-top: 15/360 * 100vw;
  border-bottom: 1px solid #ccc;
  .commentInfo {
    display: flex;
    margin-bottom: 20/360 * 100vw;
    img {
      width: 35/360 * 100vw;
      height: 35/360 * 100vw;
      border-radius: 50%;
    }
    .user {
      flex: 1;
      margin-left: 10/360 * 100vw;
      .username {
        font-size: 14/360 * 100vw;
      }
      .time {
        font-size: 10/360 * 100vw;
        color: #707070;
      }
    }
    .commentBtn {
      color: #707070;
    }
  }
  .comment {
    margin: 20/360 * 100vw 0;
    font-size: 13/360 * 100vw;
  }
  .moreCommentList {
    .moreComment {
      padding: 20/360 * 100vw 15/360 * 100vw;
      font-size: 13/360 * 100vw;
      border: 1px solid #ccc;
      border-bottom: 0;
      &:last-child {
        border-bottom: 1px solid #ccc;
      }

      .moreCommentInfo {
        display: flex;
        .commentNumber {
          font-size: 10/360 * 100vw;
          margin-right: 8/360 * 100vw;
        }
        .commentUser {
          margin-right: 8/360 * 100vw;
        }
        .commentTime {
          flex: 1;
          font-size: 10/360 * 100vw;
          color: #707070;
        }
        .commentBtn {
          color: #707070;
          font-size: 10/360 * 100vw;
        }
      }
      .comment {
        margin-bottom: 0;
      }
    }
  }
}
</style>
