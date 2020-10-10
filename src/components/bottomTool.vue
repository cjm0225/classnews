<template>
  <!-- 底部工具栏 -->
  <div class="bottomwrapper">
    <!-- 评论分享工具 -->
    <div class="bottomTool" v-if="isBottomToolShow">
      <div class="writeFollow" @click="showTextarea">
        {{ textareaValue ? textareaValue : "写跟帖" }}
      </div>
      <van-icon name="chat-o" badge="99+" size="8vw" />
      <van-icon name="star-o" size="8vw" class="star" />
      <div class="iconfont iconfenxiang"></div>
    </div>
    <!-- 评论输入框 -->
    <div class="commentInput" v-else>
      <textarea
        type="textarea"
        class="textarea"
        v-model="textareaValue"
        @blur="blurhandler"
        ref="textarea"
      />
      <button class="sendBtn" @click="sendComment">发送</button>
    </div>
  </div>
</template>

<script>
import eventBus from "../eventBus/index";
export default {
  data() {
    return {
      isBottomToolShow: true,
      textareaValue: "",
      commentId: "",
    };
  },
  props: {
    articleId: String,
    CommentList: Array,
  },
  created() {
    // 方法一:
    // 由于created钩子函数,是在组件创建时触发,在事件总线中,每一次组件的创建都会绑定一个reply事件,会导致多次绑定事件的情况出现
    //所以需要在组件创建绑定之前,就需要把这个reply事件解绑,这样就可以只绑定一个reply事件了
    // eventBus.$off("reply");
    eventBus.$on("reply", (commentId) => {
      //存储到data中
      this.commentId = commentId;
      // 显示输入框
      setTimeout(() => {
        this.showTextarea();
      }, 150);
    });
  },
  //方法二:beforeDestroy()钩子函数中解绑
  //该方法可以解决,暂时无bug存在
  beforeDestroy() {
    // 方法二:beforeDestroy()钩子函数中解绑,一般会在这里清除全局事件和全局定时器
    // 注意:事件总线的事件在组件创建之后被绑定,而回调函数只在兄弟组件触发$emit之后才会触发,所以数据在事件绑定的时候也只是初始值,正确的数据只在$emit触发之后才会有
    eventBus.$off("reply");
  },
  methods: {
    sendReply(commentId) {
      this.$axios({
        method: "post",
        url: "/post_comment/" + this.articleId,
        data: {
          content: this.textareaValue,
          parent_id: this.commentId,
        },
      }).then((response) => {
        if (response.data.message === "评论发布成功") {
          // 清空文本输入框
          this.textareaValue = "";
          // 通知父组件更新数据
          this.$emit("loadComment");
        }
      });
    },
    showTextarea() {
      // 因为vue的执行顺序是先执行完js代码,在更新视图,下一次也是继续循环
      // 所以顺序就是数据更新->视图更新
      this.isBottomToolShow = false;

      //nextTick函数是vue提供的函数,它可以让代码在视图更新之后再执行代码
      //   也就是说在下一次循环开始才执行里面的代码
      this.$nextTick(() => {
        this.$refs.textarea.focus();
      });
    },
    blurhandler() {
      // 因为blur事件比点击事件执行顺序要早,所以要想点击发送事件比失去焦点事件早
      // 要设定一个延时器
      setTimeout(() => {
        this.isBottomToolShow = true;
      }, 50);
    },
    sendComment() {
      if (this.textareaValue === "") {
        this.$toast("评论内容不能为空");
        return;
      }
      this.$axios({
        method: "post",
        url: "/post_comment/" + this.articleId,
        data: {
          content: this.textareaValue,
          parent_id: this.commentId,
        },
      }).then((response) => {
        if (response.data.message === "评论发布成功") {
          // 清空文本输入框
          this.textareaValue = "";
          // 通知父组件更新数据
          this.$emit("loadComment");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.bottomwrapper {
  .bottomTool {
    display: flex;
    align-items: center;
    margin: 20/360 * 100vw;
    .writeFollow {
      width: 160/360 * 100vw;
      height: 40/360 * 100vw;
      padding-left: 15/360 * 100vw;
      margin-right: 20/360 * 100vw;
      border-radius: 20 /360 * 100vw;
      background-color: #ccc;
      line-height: 40/360 * 100vw;
      font-size: 16/360 * 100vw;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .star {
      margin: 0 20/360 * 100vw;
    }
    .iconfenxiang {
      font-size: 8vw;
    }
  }
  .commentInput {
    margin: 0 15/360 * 100vw;
    display: flex;
    align-items: flex-end;
    margin-bottom: 20/360 * 100vw;
    .textarea {
      height: 90/360 * 100vw;
      width: 260 /360 * 100vw;
      padding-top: 10px;
      text-indent: 2em;
      background-color: #d7d7d7;
      border: none;
      outline: none;
      border-radius: 8/360 * 100vw;
    }
    .sendBtn {
      width: 60/360 * 100vw;
      height: 30/360 * 100vw;
      margin-left: 20/360 * 100vw;
      border: none;
      outline: none;
      border-radius: 15/360 * 100vw;
      background-color: #ff0000;
    }
  }
}
</style>