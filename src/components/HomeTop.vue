<template>
  <div class="top">
    <h2>new</h2>
    <div class="search" @click="$router.push('/articlesearch')">
      <div class="iconfont iconsearch"></div>
      <span>搜索新闻</span>
    </div>
    <div class="iconfont iconwode" @click="$router.push('/personal')"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.top {
  height: 47/360 * 100vw;
  display: flex;
  align-items: center;
  background-color: #ff0000;
  padding: 0 15/360 * 100vw;
  color: #fcdcdc;
  h2 {
    font-size: 24/360 * 100vw;
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin: 0 25/360 * 100vw;
    border-radius: 34/360 * 100vw;
    height: 34/360 * 100vw;
    font-size: 15/360 * 100vw;

    background-color: #f97979;
  }
  .iconfont {
    font-size: 24/360 * 100vw;
  }
  .iconwode {
    opacity: 0.8;
  }
}
</style>