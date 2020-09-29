<template>
  <div>
    <TopNav title="精彩跟帖" @pushPage="pushPage"></TopNav>
    <Comment
      v-for="comment of CommentList"
      :key="comment.id"
      :comment="comment"
    ></Comment>
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
      url: "/post_comment/" + 1,
      params: {
        pageSize: 5,
        pageIndex: 2,
      },
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
</style>
