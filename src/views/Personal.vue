<template>
  <div>
    <div class="top">
      <img class="avatar" src="../assets/logo.png" />
      <div class="info">
        <div class="name">
          <span
            class="iconfont"
            :class="{
                        iconxingbienan: userInfo.gender == 1,
                        iconxingbienv: userInfo.gender == 0
                    }"
          ></span>

          <span>{{userInfo.nickname}}</span>
        </div>
        <div class="date" v-if="userInfo.create_date">{{userInfo.create_date.split("T")[0]}}</div>
      </div>
      <span class="iconfont iconjiantou1"></span>
    </div>
    <!-- @click="showAttention" -->
    <PersonalCell label="我的关注" desc="关注的用户"></PersonalCell>
    <!-- @click="showFollow" -->
    <PersonalCell label="我的跟帖" desc="跟帖/huitie"></PersonalCell>
    <!-- @click="showCollect" -->
    <PersonalCell label="我的收藏" desc="文章/视频"></PersonalCell>
    <!--  @click="showSettting" -->
    <PersonalCell label="设置"></PersonalCell>
    <PersonalCell label="退出" @click="logout"></PersonalCell>
  </div>
</template>


<script>
import PersonalCell from "../components/PersonalCell";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  components: {
    PersonalCell,
  },
  mounted() {
    this.$axios({
      url: "http://localhost:3000/user/" + localStorage.getItem("userId"),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.data.message === "获取成功") {
        this.userInfo = response.data.data;
      }
    });
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$toast.success("退出成功");
      setTimeout(() => {
        this.$router.replace("/login");
      }, 800);
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  align-items: center;
  padding: 24/360 * 100vw;
  border-bottom: 4px solid #e4e4e4;
  .avatar {
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
    border-radius: 50%;
    // 解决 img 标签的变形问题
    // 常用选项 cover / contain
    object-fit: cover;
  }
  .info {
    // 自动占据剩余空间
    flex: 1;
    padding-left: 10/360 * 100vw;
    font-size: 14/360 * 100vw;
    .iconxingbienan {
      color: #83bfec;
    }
    .iconxingbienv {
      color: #f43dbf;
    }
    .date {
      color: #888;
      padding-top: 6/360 * 100vw;
    }
  }
}
</style>