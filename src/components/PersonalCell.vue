<template>
  <div class="cellWrapper" @click="clickhandler">
    <div class="label">{{label}}</div>
    <div class="desc">{{desc}}</div>
    <span class="iconfont iconjiantou1"></span>
  </div>
</template>

<script>
export default {
  props: ["label", "desc"],
  methods: {
    clickhandler() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="less" scoped>
.cellWrapper {
  display: flex;
  padding: 16/360 * 100vw;
  padding-left: 0;
  margin-left: 16/360 * 100vw;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;
  .label {
    flex: 1;
    color: #333;
    font-size: 14/360 * 100vw;
  }
  .desc {
    color: #888;
    font-size: 12/360 * 100vw;
    padding-right: 10/360 * 100vw;
  }
}
</style>