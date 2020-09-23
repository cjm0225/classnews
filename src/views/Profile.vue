<template>
  <div>
    <TopNav title="编辑资料"></TopNav>
    <div class="avatar">
      <label>
        <van-uploader style="display:none" :max-count="1" :after-read="afterRead" />
        <div v-if="userInfo.head_img">
          <van-image
            round
            fit="cover"
            :src="$axios.defaults.baseURL +  userInfo.head_img"
            width="20vw"
            height="20vw"
          />
        </div>
        <div v-else>
          <van-image round fit="cover" src="../assets/logo.png" width="20vw" height="20vw" />
        </div>
      </label>
    </div>

    <!-- 昵称 -->
    <PersonalCell label="昵称" :desc="userInfo.nickname" @click="isShownickname = true" />
    <van-dialog
      v-model="isShownickname"
      title="修改昵称"
      show-cancel-button
      @confirm="editNickname"
      @cancel="newNickname = ''"
    >
      <van-cell-group>
        <van-field v-model="newNickname" placeholder="请输入修改的昵称" type="test" />
      </van-cell-group>
    </van-dialog>

    <!-- 密码 -->
    <PersonalCell label="密码" desc="******" @click="isShowpassword = true" />
    <van-dialog
      v-model="isShowpassword"
      title="修改密码"
      show-cancel-button
      @confirm="editPassword"
      @cancel="newPassword=''"
    >
      <van-cell-group>
        <van-field v-model="newPassword" placeholder="请输入修改的密码" type="password" />
      </van-cell-group>
    </van-dialog>

    <PersonalCell label="性别" :desc="userInfo.gender===1 ? '男':'女'" @click="isShowgender = true" />
    <van-action-sheet
      v-model="isShowgender"
      :actions="actions"
      close-on-click-action
      cancel-text="取消"
      title="请选择性别"
      @select="selectHandler"
    />
  </div>
</template>

<script>
import TopNav from "../components/TopNav";
import PersonalCell from "../components/PersonalCell";
import LoginVue from "./Login.vue";
export default {
  data() {
    return {
      userInfo: {},
      isShownickname: false,
      isShowpassword: false,
      isShowgender: false,
      newNickname: "",
      newPassword: "",
      actions: [
        { name: "男", genderCode: 1 },
        { name: "女", genderCode: 0 },
      ],
      fileList: [],
    };
  },
  components: {
    TopNav,
    PersonalCell,
  },
  created() {
    this.$axios({
      url: "/user/" + localStorage.getItem("userId"),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      this.userInfo = response.data.data;
    });
  },
  methods: {
    afterRead(file) {
      const data = new FormData();
      data.append("file", file.file);

      // question:为什么上传失败的时候,没有被拦截器拦截信息
      // answer:因为后面的toast会覆盖前面的toast,当后面与前面的toast同时触发的时候

      // question:data的参数是一个对象,为什么不能直接传file对象
      // answer:因为前端与后端的通信数据格式只有两个格式:字符串和二进制.file对象需要让FormData对象转换为二进制格式的数据才能发给服务器处理
      this.$axios({
        method: "post",
        url: "/upload",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: data, //data是FormData对象
      }).then((response) => {
        if (response.data.message === "文件上传成功") {
          // 在文件上传成功之后,发送请求将数据改了
          this.editProfile(
            {
              head_img: response.data.data.url,
            },
            () => {
              // 修改显示的图片
              this.userInfo.head_img = response.data.data.url;
            }
          );
        }
      });
    },
    editProfile(dataObj, callback) {
      this.$axios({
        method: "post",
        url: "/user_update/" + localStorage.getItem("userId"),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: dataObj,
      }).then((response) => {
        this.$toast.success(response.data.message);
        callback();
      });
    },
    editNickname() {
      // 判断是否为空
      if (this.newNickname === "") {
        this.$toast.fail("修改失败,昵称不能为空");
        return;
      }

      // 判断是否符合要求
      const reg = /^[\u4E00-\u9FA5]{2,6}$/;
      if (!reg.test(this.newNickname.trim())) {
        this.$toast.fail("修改失败,昵称不符合要求");
        return;
      }

      //   不为空才发送请求
      this.editProfile(
        {
          nickname: this.newNickname,
        },
        () => {
          // 直接修改
          this.userInfo.nickname = this.newNickname;

          // 清空输入框
          this.newNickname = "";
        }
      );
    },
    editPassword() {
      // 判断是否为空
      if (this.newPassword === "") {
        this.$toast.fail("修改失败,密码不能为空");
        return;
      }

      // 判断是否符合要求
      const reg = /^\d{6,}$/;
      if (!reg.test(this.newNickname.trim())) {
        this.$toast.fail("修改失败,密码必须要六位数以上的数字");
        return;
      }

      //   不为空才发送请求
      this.editProfile(
        {
          password: this.newPassword,
        },
        () => {
          // 清空输入框
          this.newPassword = "";
        }
      );
    },
    selectHandler(item) {
      this.editProfile(
        {
          gender: item.genderCode,
        },
        () => {
          // 修改显示
          this.userInfo.gender = item.genderCode;
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.avatar {
  padding: 20/360 * 100vw 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>