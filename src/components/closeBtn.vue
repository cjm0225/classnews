<template>
  <div class="closeBtn">
    <van-icon name="cross" size="30" @click="clickhandler" />
  </div>
</template>

<script>
export default {
  methods: {
    clickhandler() {
      this.$emit("click");
    },
  },
};
</script>

<style>
</style>