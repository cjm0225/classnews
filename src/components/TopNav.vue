<template>
  <div class="navWrapper">
    <span class="iconfont iconjiantou2" @click="clickhandler"></span>
    <slot></slot>
    <div class="title" @click="search">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  methods: {
    clickhandler() {
      this.$emit("pushPage");
    },
    search() {
      this.$emit("search");
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
    padding-right: 10/360 * 100vw;
  }
  .iconjiantou2 {
    font-size: 18px;
  }
}
</style>