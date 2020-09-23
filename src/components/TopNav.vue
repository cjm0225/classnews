<template>
  <div class="navWrapper">
    <span class="iconfont iconjiantou2" @click="clickhandler"></span>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  methods: {
    clickhandler() {
      this.$router.push("/personal");
    },
  },
};
</script>


<style lang="less" scoped>
.navWrapper {
  display: flex;
  padding: 20/360 * 100vw;
  .title {
    flex: 1;
    text-align: center;
    font-size: 14/360 * 100vw;
    font-weight: bold;
    padding-right: 10/360 * 100vw;
  }
  .iconjiantou2 {
    font-size: 18px;
  }
}
</style>