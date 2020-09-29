<template>
  <div>
    <TopNav title="我的收藏" @pushPage="pushPage"></TopNav>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <TypeNewShow
        v-for="collection of collectionList"
        :key="collection.id"
        :categoryNews="collection"
      ></TypeNewShow>
    </van-list>
  </div>
</template>

<script>
import TopNav from "../components/TopNav";
import TypeNewShow from "../components/TypeNewShow";
export default {
  data() {
    return {
      collectionList: [],
      loading: false,
      finished: false,
    };
  },
  components: {
    TopNav,
    TypeNewShow,
  },
  created() {
    this.$axios({
      url: "/user_star",
    }).then((response) => {
      this.collectionList = response.data.data;
    });
  },
  methods: {
    pushPage() {
      this.$router.push("/personal");
    },
    onLoad() {
      this.loading = false;
      if (this.collectionList.length > 0) {
        this.finished = true;
      }
    },
  },
};
</script>

<style>
</style>