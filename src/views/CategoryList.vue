<template>
  <div>
    <TopNav title="栏目管理" @pushPage="pushPage"></TopNav>
    <div class="wrapper">
      <div class="title">点击删除以下频道</div>
      <div class="topNews">
        <div v-for="category of categoryList" :key="category.id">
          <div
            class="newCategory"
            v-if="category.is_top===1"
            @click="deleteTop(category.name)"
          >{{category.name}}</div>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="title">点击添加以下频道</div>
      <div class="topNews">
        <div v-for="category of categoryList" :key="category.id">
          <div class="newCategory" v-if="category.is_top===0">{{category.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "../components/TopNav";
export default {
  data() {
    return {
      categoryList: [],
    };
  },
  components: {
    TopNav,
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    deleteTop(name) {
      console.log(name);
      this.$axios({
        url: "/category",
        method: "post",
        data: {
          name,
          is_top: 0,
        },
      }).then((response) => {
        console.log(response);
        this.getCategoryList();
      });
    },
    getCategoryList() {
      this.$axios({
        url: "/category",
      }).then((response) => {
        this.categoryList = response.data.data;
      });
    },
    pushPage() {
      this.$router.push("/home");
    },
  },
};
</script>


<style lang="less" scoped>
.wrapper {
  margin-top: 20/360 * 100vw;
  padding: 0 18/360 * 100vw;
  .title {
    color: #75707c;
    margin-bottom: 10/360 * 100vw;
  }
  .topNews {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .newCategory {
      border: 1px solid #ccc;
      width: 70/360 * 100vw;
      text-align: center;
      line-height: 35/360 * 100vw;
      margin: 5/360 * 100vw 0;
      margin-right: 9/360 * 100vw;
      font-size: 16/360 * 100vw;
    }
  }
}
</style>