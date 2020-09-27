<template>
  <div class="video-main">
    <div class="videoBox">
      <video
        src="https://video.pearvideo.com/mp4/adshort/20200927/cont-1699344-15404736_adpkg-ad_hd.mp4"
        ref="video"
        @loadedmetadata="loadedmetadata"
        @timeupdate="timeupdatehandler"
        @ended="endedhandler"
        @click="videoPlay"
      ></video>
      <div class="controBar">
        <!-- 播放按钮 -->
        <div
          class="iconfont icon-ziyuan playBtn"
          @click="playBtnhandler"
          v-if="!isVideoPlay"
        ></div>
        <div
          class="iconfont icon-bofangzhong playBtn"
          @click="playBtnhandler"
          v-else
        ></div>
        <div class="videotime">
          {{ currentTime | timeCamp }}/{{ videodurationTime | timeCamp }}
        </div>
        <!-- 进度条 -->
        <van-slider
          v-model="value"
          @change="onChange"
          button-size="16px"
          @drag-end="dragendhandler"
          @drag-start="dragstarthandler"
        />
        <!-- 静音按钮 -->
        <div
          class="iconfont icon-shengyin volumeBtn"
          v-if="!isMuted"
          @click="volumeBtnHandler"
        ></div>
        <div
          class="iconfont icon-ziyuan1 volumeBtn"
          v-else
          @click="volumeBtnHandler"
        ></div>
        <!-- 全屏按钮 -->
        <div class="iconfont icon-quanping" @click="fullScreen"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      isVideoPlay: false,
      isMuted: true,
      videodurationTime: 0,
      currentTime: 0,
      videoElement: {},
    };
  },
  created() {
    this.loadedmetadata();
  },
  mounted() {
    this.defaultMuted();
  },
  filters: {
    // 获取正确的视频时间显示效果
    timeCamp(oldValue) {
      // 1000秒
      // 1000 / 60 是等于16.66666666分钟 取整 得出16分钟 需要分钟显示
      // 1000 / 60 / 60 是等于 0.2777777777小时 取整等于0,所以不需要小时来显示
      // 剩下的来显示秒数
      let hour = parseInt(oldValue / 60 / 60);

      let minute = parseInt((oldValue - hour * 3600) / 60);

      let second = parseInt(oldValue - hour * 60 * 60 - minute * 60);

      if (hour < 10) {
        hour = `0${hour}`;
      }

      if (minute < 10) {
        minute = `0${minute}`;
      }

      if (second < 10) {
        second = `0${second}`;
      }

      if (hour === "00") {
        return `${minute}:${second}`;
      } else {
        return `${hour}:${minute}:${second}`;
      }
    },
  },
  methods: {
    // 默认关闭声音，提高用户体验
    defaultMuted() {
      // this.$refs.video.defaultMuted = true;
      this.$refs.video.muted = true;
    },
    // 获取视频源的播放时长
    loadedmetadata(videoInfo) {
      if (videoInfo) {
        // videoInfo.target.duration是视屏的时间
        this.videodurationTime = videoInfo.target.duration;
      }
    },
    //在进度条的值发生改变时，通知视频播放时间改变，currentTime是视频的属性，可以改变现有播放时间
    onChange(value) {
      this.currentTime = this.videodurationTime * (value / 100);
      this.$refs.video.currentTime = this.currentTime;
    },
    // 播放按钮控制
    playBtnhandler() {
      if (this.isVideoPlay === false) {
        this.$refs.video.play();
        this.isVideoPlay = true;
      } else {
        this.$refs.video.pause();
        this.isVideoPlay = false;
      }
    },
    // 音量按钮控制
    volumeBtnHandler() {
      if (this.isMuted === true) {
        this.isMuted = false;
        this.$refs.video.muted = false;
      } else {
        this.isMuted = true;
        this.$refs.video.muted = true;
      }
    },
    // 在播放时间发生改变时,通知事件数据改变
    timeupdatehandler(videoInfo) {
      // 时间进度
      this.currentTime = parseInt(videoInfo.target.currentTime);
      // 更新下面进度条
      this.value = parseInt(videoInfo.target.currentTime);
    },
    //拖拉进度条开始时,默认停止视屏
    dragstarthandler() {
      this.$refs.video.pause();
    },
    // 拖拉进度条结束时,默认播放视屏
    dragendhandler() {
      this.$refs.video.play();
      this.isVideoPlay = true;
    },
    // 播放结束后,初始化播放进度
    endedhandler() {
      // this.$refs.video.currentTime = 0;
      this.isVideoPlay = false;
    },
    // 全屏播放
    fullScreen() {
      this.$refs.video.webkitRequestFullScreen();
    },
    videoPlay() {
      this.playBtnhandler();
    },
  },
};
</script>

<style lang="less" scoped>
video {
  width: 100%;
  height: 250/360 * 100vw;
}
.video-main {
  .videoBox {
    position: relative;
    video {
      width: 100%;
      height: 250/360 * 100vw;
    }
    .controBar {
      display: flex;
      align-items: center;
      position: absolute;
      padding: 0 10/360 * 100vw;
      bottom: 0;
      width: 100%;
      height: 50/360 * 100vw;
      background-color: #0000007a;
      color: #ffffffeb;

      .playBtn {
        font-size: 30/360 * 100vw;
      }
      .videotime {
        margin-left: 10/360 * 100vw;
        margin-right: 20/360 * 100vw;
        color: #ffffffb8;
      }
      /deep/.van-slider {
        width: 150/360 * 100vw;
      }
      .volumeBtn {
        font-size: 20/360 * 100vw;
        padding: 0 10/360 * 100vw 0 15/360 * 100vw;
      }
      .icon-quanping {
        font-size: 30/360 * 100vw;
      }
    }
  }
}
</style>