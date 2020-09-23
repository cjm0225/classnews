<template>
  <div class="pageWrapper">
    <closeBtn @click="clickhandler"></closeBtn>
    <div class="logoWrapper">
      <span class="iconfont iconnew"></span>
    </div>
    <AnthInput
      type="text"
      placeholder="账号/手机号"
      :rule="/^\d{11}$/"
      error_msg="请输入正确的手机号"
      @valChange="setUsername"
    />

    <AnthInput
      type="text"
      placeholder="昵称"
      :rule="/^[\u4E00-\u9FA5]{2,6}$/"
      error_msg="请输入正确的昵称"
      @valChange="setNickname"
    />

    <AnthInput
      type="password"
      placeholder="密码"
      :rule="/^\d{6,}$/"
      error_msg="请输入正确的密码"
      @valChange="setPassword"
    />

    <AnthBtn commit="马上注册" @commit="registerhandler"></AnthBtn>
  </div>
</template>

<script>
import AnthInput from "../components/AnthInput";
import AnthBtn from "../components/AnthBtn";
import closeBtn from "../components/closeBtn";

export default {
  data() {
    return {
      username: "",
      password: "",
      nickname: "",
    };
  },
  components: {
    AnthInput,
    AnthBtn,
    closeBtn,
  },
  methods: {
    setUsername(username) {
      this.username = username;
    },
    setNickname(nickname) {
      this.nickname = nickname;
    },
    setPassword(password) {
      this.password = password;
    },
    registerhandler() {
      if (this.username === "") {
        this.$toast.fail("账号/手机号不能为空");
        return;
      }

      if (!/^\d{11}$/.test(this.username)) {
        this.$toast.fail("请输入正确的手机号");
        return;
      }

      if (this.nickname === "") {
        this.$toast.fail("昵称不能为空");
        return;
      }
      if (this.password === "") {
        this.$toast.fail("密码不能为空");
        return;
      }

      this.$axios({
        url: "/register",
        method: "post",
        data: {
          username: this.username,
          nickname: this.nickname,
          password: this.password,
        },
      }).then((response) => {
        if (response.request.readyState === 4 && response.status === 200) {
          this.$toast(response.data.message);
        }
      });
    },
    clickhandler() {
      this.$router.push("/home");
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