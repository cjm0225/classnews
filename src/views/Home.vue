
<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-sticky>
        <HomeTop></HomeTop>
      </van-sticky>
      <van-tabs
        v-model="activeIndex"
        color="#3a3a3a"
        background="#e4e4e4"
        sticky
        offset-top="13vw"
      >
        <van-tab :title="title.name" v-for="title of titleList" :key="title.id">
          <van-list
            v-model="title.loading"
            :finished="title.finished"
            finished-text="没有更多了"
            @load="loadMorePage"
            :immediate-check="false"
          >
            <TypeNewShow
              v-for="news of title.newsList"
              :key="news.id"
              :categoryNews="news"
            ></TypeNewShow>
          </van-list>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
  </div>
</template>

<script>
import HomeTop from "../components/HomeTop";
import TypeNewShow from "../components/TypeNewShow";
export default {
  data() {
    return {
      activeIndex: 0,
      titleList: [],
      isLoading: false,
    };
  },
  components: {
    HomeTop,
    TypeNewShow,
  },
  created() {
    this.loadTitle();
  },
  methods: {
    // 加载全部新闻标题需要复用
    loadTitle() {
      // 如果是已经登录过了,那就按照存储记录来显示
      if (localStorage.getItem("categoryList")) {
        const titleList = JSON.parse(localStorage.getItem("categoryList"));
        this.titleList = titleList.map((item) => {
          return {
            // 扩展运算符,把对象展开并赋值给新对象
            ...item,
            // 在对象中初始化
            newsList: [],
            // 因为每一个新闻标题的新闻内容都不一样,页数和新闻总数都不一样
            // 而每一个标题的新闻内容都是一个子页面显示,需要有不同的页码记录显示到多少内容,所以需要在每一个对象中保存响应的页码.并记录下来
            // 默认为每页显示5条新闻内容
            pageSize: 5,
            // 默认从第一页开始
            pageIndex: 1,

            //vant list列表组件loading表示loading事件状态,finished表示onload事件是否能够被触发
            // 每一次onload事件被触发都会将loading重新赋值为true,表示数据加载状态
            loading: false,
            finished: false,
          };
        });

        // 给对应下标的对象数组赋值
        this.loadPage();
      } else {
        this.$axios({
          url: "/category",
        }).then((response) => {
          // 需要改造数据来给数据增加字段,而又可以让新增加的字段页被vue监听
          // 在数组的map函数加工每一个数组里面的对象之后返回一个新数组，赋值给已经初始化的数组中
          this.titleList = response.data.data.map((item) => {
            return {
              // 扩展运算符,把对象展开并赋值给新对象
              ...item,
              // 在对象中初始化
              newsList: [],
              // 因为每一个新闻标题的新闻内容都不一样,页数和新闻总数都不一样
              // 而每一个标题的新闻内容都是一个子页面显示,需要有不同的页码记录显示到多少内容,所以需要在每一个对象中保存响应的页码.并记录下来
              // 默认为每页显示5条新闻内容
              pageSize: 5,
              // 默认从第一页开始
              pageIndex: 1,

              //vant list列表组件loading表示loading事件状态,finished表示onload事件是否能够被触发
              // 每一次onload事件被触发都会将loading重新赋值为true,表示数据加载状态
              loading: false,
              finished: false,
            };
          });

          // 给对应下标的对象数组赋值
          this.loadPage();
        });
      }
    },
    // 因为加载新闻内容的代码需要重复使用,所以需要封装一个方法来复用
    loadPage() {
      //activeIndex是当前被激活的tab栏下标,与之对应的是titleList的下标
      // 请求所在tab标题的新闻内容
      this.$axios({
        url: "/post",
        params: {
          category: this.titleList[this.activeIndex].id,
          pageSize: this.titleList[this.activeIndex].pageSize,
          pageIndex: this.titleList[this.activeIndex].pageIndex,
        },
      }).then((response) => {
        // 赋值给被监听了的数组,但是要对应的对象
        // 由于手机移动端的原因,每一页的内容需要拼接在一起显示,所以每一页的数据都要叠加起来
        this.titleList[this.activeIndex].newsList = [
          ...this.titleList[this.activeIndex].newsList,
          ...response.data.data,
        ];

        // console.log(this.titleList[this.activeIndex].newsList);

        // 我们需要在数据加载完之后,通知组件停止加载状态
        this.titleList[this.activeIndex].loading = false;

        // 当数据全部被加载完之后,需要将onload事件禁止触发
        if (
          this.titleList[this.activeIndex].pageSize > response.data.data.length
        ) {
          this.titleList[this.activeIndex].finished = true;
        }

        // 当需要更新全部新闻内容的时候,van-pull-refresh的loading状态需要停止
        this.isLoading = false;
      });
    },
    loadMorePage() {
      // 触发onload事件的条件是屏幕进度条下拉到底部,所以一旦有这个操作,就说明用户想看更多的新闻内容
      // 因为在下拉刷新的时候,用户可能会误操作下拉到底部,从而会触发一个操作性bug,先加载第二页的数据
      // 所以要在下拉刷新的时候就禁止加载更多页面的数据请求操作
      if (this.isLoading === false) {
        this.titleList[this.activeIndex].pageIndex += 1;
        this.loadPage();
      }
      // this.titleList[this.activeIndex].pageIndex += 1;
      // this.loadPage();
    },
    onRefresh() {
      // 重新请求数据,更新最新数据
      this.loadTitle();
    },
  },
  watch: {
    // 每次activeIndex改变时都请求一次数据
    // 但是为了优化请求次数,我们可以判断该标题新闻数据是否已经请求过了,如果请求过了就不再请求
    activeIndex() {
      if (this.titleList[this.activeIndex].newsList.length === 0) {
        this.loadPage();
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-tab {
  font-size: 18/360 * 100vw;
}
</style>