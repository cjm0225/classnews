<template>
  <div>
    <TopNav title="精彩跟帖" @pushPage="pushPage"></TopNav>
    <Comment
      v-for="comment of CommentList"
      :key="comment.id"
      :comment="comment"
    ></Comment>
    <div class="bottom" v-if="CommentList.length > 0">
      <div class="des">我也是有底线的</div>
    </div>

    <van-empty description="精彩评论还未出现" v-else>
      <van-button round type="danger" class="bottom-button">
        快去献出您的评论
      </van-button>
    </van-empty>
  </div>
</template>

<script>
import TopNav from "../components/TopNav";
import Comment from "../components/Comment";
export default {
  data() {
    return {
      CommentList: [],
    };
  },
  components: {
    TopNav,
    Comment,
  },
  created() {
    this.$axios({
      url: "/post_comment/" + this.$route.params.id,
    }).then((response) => {
      this.CommentList = response.data.data;
    });
  },
  methods: {
    pushPage() {
      this.$router.back(1);
    },
  },
};
</script>

<style lang="less" scoped>
.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25/360 * 100vw 0;
  color: #646566;
  font-size: 15/360 * 100vw;
}
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
