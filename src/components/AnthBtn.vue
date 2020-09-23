<template>
  <div>
    <div class="button" @click="clickhandler">{{commit}}</div>
  </div>
</template>

<script>
import LoginVue from "../views/Login.vue";
export default {
  props: ["commit"],
  methods: {
    clickhandler() {
      this.$emit("commit");
    },
  },
};
</script>

<style lang="less" scoped>
.button {
  background-color: #cc3300;
  color: #fff;
  text-align: center;
  line-height: 48/360 * 100vw;
  border-radius: 24/360 * 100vw;
  margin-top: 30/360 * 100vw;
  font-size: 18/360 * 100vw;
}
</style>