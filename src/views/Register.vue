<template>
  <div class="pageWrapper">
    <div class="closeBtn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logoWrapper">
      <span class="iconfont iconnew"></span>
    </div>
    <AnthInput type="text" placeholder="账号" :rule="/^\d{6,}$/" error_msg="请输入正确的手机号" />
    <AnthInput type="text" placeholder="昵称" :rule="/^\w{6,}$/" error_msg="请输入正确的昵称" />
    <AnthInput type="password" placeholder="密码" :rule="/^\d{6,}$/" error_msg="请输入正确的密码" />
    <AnthBtn commit="马上注册" @commit="registerhandler"></AnthBtn>
  </div>
</template>

<script>
import AnthInput from "../components/AnthInput";
import AnthBtn from "../components/AnthBtn";

export default {
  components: {
    AnthInput,
    AnthBtn,
  },
  methods: {
    registerhandler() {
      console.log("registerhandler");
    },
  },
};
</script>

<style lang="less" scoped>
.pageWrapper {
  padding: 24/360 * 100vw;
}
.iconicon-test {
  font-size: 26/360 * 100vw;
}
.logoWrapper {
  text-align: center;
  .iconnew {
    font-size: 126/360 * 100vw;
    color: #d81e06;
  }
}
</style>