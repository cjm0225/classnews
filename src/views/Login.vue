<template>
  <div class="pageWrapper">
    <closeBtn @click="clickhandler"></closeBtn>
    <div class="logoWrapper">
      <span class="iconfont iconnew"></span>
    </div>

    <AnthInput
      type="text"
      placeholder="账号"
      :rule="/^\d{11}$/"
      error_msg="请输入正确的手机号"
      @valChange="setUsername"
    />

    <AnthInput
      type="password"
      placeholder="密码"
      :rule="/^\d{6,18}$/"
      error_msg="请输入正确的密码"
      @valChange="setPassword"
    />

    <AnthBtn commit="马上登陆" @commit="loginhandler"></AnthBtn>
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
    };
  },
  components: {
    AnthInput,
    AnthBtn,
    closeBtn,
  },
  methods: {
    loginhandler() {
      if (this.username === "") {
        this.$toast.fail("手机号不能为空");
        return;
      }
      if (this.password === "") {
        this.$toast.fail("密码不能为空");
        return;
      }
      this.$axios({
        url: "/login",
        method: "post",
        data: { username: this.username, password: this.password },
      }).then((response) => {
        if (response.data.message === "登录成功") {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("userId", response.data.data.user.id);
          this.$toast.success("登录成功");
          setTimeout(() => {
            this.$router.replace("/personal");
          }, 800);
        }
      });
    },
    setUsername(username) {
      this.username = username;
    },
    setPassword(password) {
      this.password = password;
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