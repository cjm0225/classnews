<template>
  <div class="inputDom">
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="val"
      :class="{error:!isValid}"
      @blur="bluehandler"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: "",
      isValid: true,
    };
  },
  props: ["type", "placeholder", "rule", "error_msg"],
  watch: {
    val() {
      //子组件输入框内容改变的时候把value值传给父组件
      //因为每次检测数据改变都要及时通知父组件,所以要放在最前面
      this.$emit("valChange", this.val);

      // 在输入框为空的时候,不显示错误提示
      if (!this.val.trim()) {
        this.isValid = true;
        return;
      }

      //在输入框不为空的时候,检测输入框内容是否符合标准
      if (this.rule.test(this.val.trim())) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    },
  },
  methods: {
    bluehandler() {
      if (this.isValid === false) {
        this.$toast.fail({
          message: this.error_msg,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.inputDom {
  padding-bottom: 20/360 * 100vw;
  input {
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid #888;
    font-size: 18/360 * 100vw;
    line-height: 36/360 * 100vw;
  }
  .error {
    border-bottom: 1px solid red;
  }
}
</style>