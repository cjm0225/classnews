<template>
  <van-slider
    class="verticalSlider"
    vertical
    v-model="value"
    button-size="20px"
    active-color="#e5e5e5"
    inactive-color="#1989fa"
    @change="onChange"
  />
</template>

<script>
export default {
  data() {
    return {
      value: 100,
    };
  },
  methods: {
    onChange(value) {
      console.log(100 - value);
    },
  },
};
</script>


<style lang="less" scoped>
.verticalSlider {
  margin: 50/360 * 100vw;
  width: 5/360 * 100vw;
  height: 150/360 * 100vw;
  // transform: rotate(-180deg);
}
</style>