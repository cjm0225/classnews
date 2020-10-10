<template>
  <div>
    <TopNav title="栏目管理" @pushPage="pushPage"></TopNav>
    <div class="wrapper">
      <div class="title">点击删除以下频道</div>
      <div class="topNews">
        <div v-for="(category, index) of categoryList" :key="category.id">
          <div class="newCategory" @click="deletecategory(category, index)">
            {{ category.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="title">点击添加以下频道</div>
      <div class="topNews">
        <div v-for="(category, index) of deleteCategory" :key="category.id">
          <div class="newCategory" @click="addCategory(category, index)">
            {{ category.name }}
          </div>
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
      deleteCategory: [],
    };
  },
  components: {
    TopNav,
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    deletecategory(category, index) {
      // 考虑到页面必须有内容显示,所以不能讲所有栏目都删除
      if (this.categoryList.length <= 1) {
        this.$toast.fail("至少要有一个栏目");
        return;
      }

      // 考虑到栏目必须有关注和热点栏目,所以不能删除
      if (category.name === "关注" || category.name === "热点") {
        this.$toast.fail("不能删除该栏目");
        return;
      }

      // 用户点击之后将数据存储到两个数组之中,有数据驱动视图
      this.deleteCategory.push(category);
      this.categoryList.splice(index, 1);

      // 存储到本地存储中,在以后的登录也可以用到
      localStorage.setItem(
        "deleteCategory",
        JSON.stringify(this.deleteCategory)
      );
      localStorage.setItem("categoryList", JSON.stringify(this.categoryList));
    },
    addCategory(category, index) {
      // 用户点击之后将数据存储到两个数组之中,有数据驱动视图
      this.categoryList.push(category);
      this.deleteCategory.splice(index, 1);

      // 存储到本地存储中,在以后的登录也可以用到
      localStorage.setItem(
        "deleteCategory",
        JSON.stringify(this.deleteCategory)
      );
      localStorage.setItem("categoryList", JSON.stringify(this.categoryList));
    },
    getCategoryList() {
      if (localStorage.getItem("categoryList")) {
        this.categoryList = JSON.parse(localStorage.getItem("categoryList"));
        this.deleteCategory = JSON.parse(
          localStorage.getItem("deleteCategory")
        );
      } else {
        this.$axios({
          url: "/category",
        }).then((response) => {
          this.categoryList = response.data.data;
        });
      }
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