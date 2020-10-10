<template>
  <div>
    <TopNav title="精彩跟帖" @pushPage="pushPage"></TopNav>
    <div class="list">
      <div class="item" v-for="comment in CommentList" :key="comment.id">
        <div class="date" v-if="comment.create_date">
          {{ comment.create_date.slice(0, 10) }}
        </div>
        <div class="parentWrapper" v-if="comment.parent">
          <div class="info">回复 {{ comment.parent.user.nickname }}</div>
          <div class="parentContent">
            {{ comment.parent.content }}
          </div>
        </div>
        <div class="mainComment">
          {{ comment.content }}
        </div>
        <div class="originPost">原文: {{ comment.post.title }}</div>
      </div>
    </div>
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
      url: "/user_comments",
    }).then((response) => {
      console.log(response.data.data);
      this.CommentList = response.data.data;
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
.item {
  padding: 16/360 * 100vw;
  border-bottom: 1px solid #e4e4e4;
  .date {
    font-size: 12/360 * 100vw;
    color: #888;
    padding-bottom: 10/360 * 100vw;
  }
  .parentWrapper {
    background: #e4e4e4;
    padding: 16/360 * 100vw;
    .info {
      font-size: 14/360 * 100vw;
      color: #999;
    }
    .parentContent {
      margin-top: 10/360 * 100vw;
      color: #888;
      font-size: 16/360 * 100vw;
    }
  }
  .mainComment {
    font-size: 16/360 * 100vw;
    margin: 10/360 * 100vw 0;
  }
  .originPost {
    font-size: 14/360 * 100vw;
    color: #888;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>