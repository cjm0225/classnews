<template>
  <div class="video-main">
    <div class="videoBox">
      <video
        :src="src"
        ref="video"
        @loadedmetadata="loadedmetadata"
        @timeupdate="timeupdatehandler"
        @ended="endedhandler"
        @click="videoPlay"
      ></video>
      <div class="topBar" v-if="isControBarShow">
        <van-icon
          name="arrow-left"
          class="topBarIcon"
          @click="$router.back(1)"
        />
        <van-icon name="share-o" class="topBarIcon" @click="showShare" />
      </div>

      <!-- 不可以放在topBar中,因为在在视频播放的同时,两秒后会隐藏,会导致分享栏一起隐藏 -->
      <van-share-sheet
        v-model="isShowShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
      />

      <div class="controBar" v-if="isControBarShow">
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
        <div
          class="iconfont icon-quanping"
          @click="fullScreen"
          v-if="isShowFullScreen"
        ></div>
        <div
          class="iconfont icon-tuichuquanping"
          @click="ExitfullScreen"
          v-else
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
  },
  data() {
    return {
      value: 0,
      // 默认视频不自动播放
      isVideoPlay: false,
      // 默认静音
      isMuted: true,
      // 默认显示全屏按钮
      isShowFullScreen: true,
      // 默认显示工具栏
      isControBarShow: true,
      // 视频总长时间
      videodurationTime: 0,
      // 视频播放时间
      currentTime: 0,
      // 定时器id
      timer: null,
      // 分享按钮
      isShowShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
        { name: "QQ", icon: "qq" },
      ],
    };
  },
  created() {
    this.loadedmetadata();
  },
  mounted() {
    this.defaultMuted();
  },
  beforeDestroy() {
    // 关闭视频播放的最后一个定时器
    clearTimeout(this.timer);
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
    showShare() {
      // question:在视频播放的同时,点击分享按钮会出现跟随工具栏一起隐藏的情况
      // answer:不可以放在topBar元素中,因为在在视频播放的同时,两秒后会隐藏,会导致分享栏一起隐藏
      //视频暂停，点击分享默认暂停视频
      this.$refs.video.pause();
      // 更新状态标记符号
      this.isVideoPlay = false;
      // 更新工具栏的状态标记符号
      this.isControBarShow = true;
      // 在视频播放的时候,两秒后会隐藏工具栏
      // 在重复点击播放和暂停清空定时器可以防止出现工具栏在暂停的时候也隐藏的情况
      clearTimeout(this.timer);

      // 显示分享栏
      this.isShowShare = true;
    },
    // 分享栏隐藏
    onSelect(option) {
      this.$toast(option.name);
      if (option.name === "微信") {
        location.href = "weixin://dl/scan";
      }
      this.isShowShare = false;
    },
    defaultMuted() {
      this.$refs.video.muted = true;
    },
    // 在视频源加载完成后,获取视频源的播放时长
    loadedmetadata(videoInfo) {
      if (videoInfo) {
        // videoInfo.target.duration是视屏的时间
        this.videodurationTime = videoInfo.target.duration;
      }
    },
    //在进度条的值发生改变时，通知视频播放时间改变，currentTime是视频的属性，可以改变现有播放时间
    onChange(value) {
      // 进度条是以百分比显示的,所以在进度条改变的时候可以利用百分比来计算出当前进度条和当前播放时间的关系,从而得出视频播放视频
      this.currentTime = this.videodurationTime * (value / 100);
      this.$refs.video.currentTime = this.currentTime;
    },
    // 播放按钮控制
    playBtnhandler() {
      if (this.isVideoPlay === false) {
        this.$refs.video.play();
        this.isVideoPlay = true;

        // 两秒后,隐藏工具栏
        // question:在高频点击之后会出现工具栏会瞬间隐藏的情况
        // answer:可以用防抖动debounce来解决,可以限制事件的间隔事件
        // 默认关闭声音，提高用户体验
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.isControBarShow = false;
        }, 2000);
      } else {
        //视频暂停
        this.$refs.video.pause();
        // 更新状态标记符号
        this.isVideoPlay = false;
        // 更新工具栏的状态标记符号
        this.isControBarShow = true;
        // 在视频播放的时候,两秒后会隐藏工具栏
        // 在重复点击播放和暂停清空定时器可以防止出现工具栏在暂停的时候也隐藏的情况
        clearTimeout(this.timer);
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
      // 更新下面进度条,但是进度条是以百分比显示,需要处理数据
      this.value = parseInt(
        (parseInt(videoInfo.target.currentTime) / this.videodurationTime) * 100
      );
    },
    //拖拉进度条开始时,默认停止视屏
    dragstarthandler() {
      this.$refs.video.pause();
      this.isControBarShow = true;
    },
    // 拖拉进度条结束时,默认播放视屏
    dragendhandler() {
      this.$refs.video.play();
      this.isVideoPlay = true;
      // 更新工具栏的状态标记符号
      this.isControBarShow = true;

      // 两秒后，隐藏工具栏
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isControBarShow = false;
      }, 2000);
    },
    // 播放结束后,初始化播放进度
    endedhandler() {
      this.$refs.video.currentTime = 0;
      this.isVideoPlay = false;
    },
    // 全屏播放
    fullScreen() {
      // webkit引擎浏览器全屏,google safari浏览器
      this.$refs.video.webkitRequestFullScreen &&
        this.$refs.video.webkitRequestFullScreen();
      // 火狐浏览器
      this.$refs.video.mozRequestFullScreen &&
        this.$refs.video.mozRequestFullScreen();

      // IE浏览器
      this.$refs.video.msRequestFullscreen &&
        this.$refs.video.msRequestFullscreen();

      // opera浏览器
      this.$refs.video.oRequestFullscreen &&
        this.$refs.video.oRequestFullscreen();

      // 退出全屏图标显示
      // this.isShowFullScreen = false;
    },
    // 退出全屏
    ExitfullScreen() {
      // webkit引擎浏览器全屏,google safari浏览器
      this.$refs.video.webkitRequestFullScreen &&
        this.$refs.video.webkitRequestFullScreen();
      // 火狐浏览器
      this.$refs.video.mozRequestFullScreen &&
        this.$refs.video.mozRequestFullScreen();

      // IE浏览器
      this.$refs.video.msRequestFullscreen &&
        this.$refs.video.msRequestFullscreen();

      // opera浏览器
      this.$refs.video.oRequestFullscreen &&
        this.$refs.video.oRequestFullscreen();

      // 全屏图标显示
      this.isShowFullScreen = true;
    },

    // 点击视频元素,控制视频播放状态
    videoPlay() {
      this.playBtnhandler();
    },
  },
};
</script>

<style lang="less" scoped>
.video-main {
  .videoBox {
    position: relative;
    video {
      width: 100%;
      height: 203/360 * 100vw;
    }
    .topBar {
      display: flex;
      justify-content: space-between;
      position: absolute;
      top: 0;
      width: 100%;
      font-size: 24/360 * 100vw;

      .topBarIcon {
        margin: 10/360 * 100vw;
        color: #ffffffeb;
      }
    }
    .controBar {
      display: flex;
      align-items: center;
      position: absolute;
      padding: 0 10/360 * 100vw;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
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
        margin: 0 10/360 * 100vw 0 15/360 * 100vw;
      }
      .icon-quanping {
        font-size: 30/360 * 100vw;
      }
    }
  }
}
</style>