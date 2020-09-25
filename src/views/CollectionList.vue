<template>
  <div>
    <TopNav title="我的收藏" @pushPage="pushPage"></TopNav>
    <TypeNewShow
      v-for="collection of collectionList"
      :key="collection.id"
      :categoryNews="collection"
    ></TypeNewShow>
  </div>
</template>

<script>
import TopNav from "../components/TopNav";
import TypeNewShow from "../components/TypeNewShow";
export default {
  data() {
    return {
      collectionList: [],
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
  },
};
</script>

<style>
</style>