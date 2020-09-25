<template>
  <div>
    <TopNav title="我的关注" @pushPage="pushPage"></TopNav>
    <div class="followList" v-for="newInfo in newsList" :key="newInfo.id">
      <img v-if="newInfo.head_img" :src="$axios.defaults.baseURL + newInfo.head_img " alt />
      <img v-else src="../assets/logo.png" alt />
      <div class="news">
        <div class="title">{{newInfo.nickname}}</div>
        <div class="time">{{newInfo.create_date.slice(0,10)}}</div>
      </div>
      <div class="cancelFollow" @click="cancelFollow(newInfo.id)">取消关注</div>
    </div>
  </div>
</template>

<script>
import TopNav from "../components/TopNav";
export default {
  data() {
    return {
      newsList: [],
    };
  },
  components: {
    TopNav,
  },
  created() {
    this.loadPage();
  },
  methods: {
    cancelFollow(id) {
      this.$dialog
        .confirm({
          message: "确认要取消关注吗?",
        })
        .then(() => {
          this.$axios({
            url: "/user_unfollow/" + id,
          }).then((response) => {
            if (response.data.message === "取消关注成功") {
              this.$toast.success(response.data.message);
              this.loadPage();
            }
          });
        })
        .catch(() => {});
    },
    loadPage() {
      this.$axios({
        url: "/user_follows",
      }).then((response) => {
        this.newsList = response.data.data;
      });
    },
    pushPage() {
      this.$router.push("/personal");
    },
  },
};
</script>


<style lang="less" scoped>
.followList {
  display: flex;
  align-items: center;
  padding: 0 10/360 * 100vw;
  img {
    width: 40/360 * 100vw;
    height: 40/360 * 100vw;
    border-radius: 50%;
  }
  .news {
    flex: 1;
    font-size: 16/360 * 100vw;
    padding-left: 10/360 * 100vw;
    .time {
      color: #707070;
    }
  }
  .cancelFollow {
    width: 73/360 * 100vw;
    height: 30/360 * 100vw;
    background-color: #e1e1e1;
    text-align: center;
    line-height: 30/360 * 100vw;
    border-radius: 15/360 * 100vw;
  }
}
</style>