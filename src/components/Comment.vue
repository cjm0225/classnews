<template>
  <div class="wrapper">
    <!-- 自调用:递归组件 -->
    <comment v-if="comment.parent" :comment="comment.parent"></comment>

    <div class="commentInfo">
      <img
        :src="$axios.default.baseURL + comment.user.head_img"
        v-if="comment.user.head_img"
      />
      <img src="../assets/logo.png" v-else />
      <div class="user">
        <div class="username">{{ comment.user.nickname }}</div>
        <div class="time">{{ comment.create_date | formatTime }}</div>
      </div>
      <div class="commentBtn" @click="reply">回复</div>
    </div>
    <div class="comment">{{ comment.content }}</div>
  </div>
</template>

<script>
import eventBus from "../eventBus/index";
export default {
  name: "comment",
  props: {
    comment: Object,
  },
  methods: {
    reply() {
      // console.log("click");
      eventBus.$emit("reply", this.comment.id);
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  margin: 0 15/360 * 100vw;
  margin-top: 15/360 * 100vw;
  border: 1px solid #ccc;
  .commentInfo {
    margin: 10/360 * 100vw;
    display: flex;

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
    margin: 20/360 * 100vw;
    font-size: 13/360 * 100vw;
  }
}
</style>