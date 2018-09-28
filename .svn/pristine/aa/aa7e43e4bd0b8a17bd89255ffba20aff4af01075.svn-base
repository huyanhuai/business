<template>
    <div class="login" >
        <div class="login_top"  >
          <img src="../../assets/login/logotop.png" alt="" class="login_top" >
        </div>
        <div class="login_body" @keydown.enter="register">
            <img src="../../assets/login/logoback.png" alt=""   width="100%" height="600px">    
            <div class="frame">
                <Tabs value="name1" type="line" size="default" class="Tabs">
                     <!-- <TabPane label="扫码登录" name="name1"  class="tabslist">
                          <p style="margin-bottom:10px;">扫码登录</p>
                          <Qrcode style="text-align:center" :size="200"  :cls="qrCls" :value="qrText"  :bgColor="'#d1ecf1'"></Qrcode>
                     </TabPane> -->
                     <TabPane label="账号登录" name="name2"  class="tabslist" >
                          <p>用户登录</p>
                          <p>
                              <Input   type="text" v-model="admin" placeholder="请输入手机号" style="width: 100%"></Input>
                          </p>
                          <p>
                              <Input  type="password" v-model="password" placeholder="请输入密码" style="width: 100%"></Input>
                          </p>
                          <!-- <p>  
                              <Input  type="text" v-model="randCode" placeholder="请输入验证码" style="width: 50%"></Input> 
                              <img :src="ImgUrl" alt=""  @click="Imgupdata"  style="float:right;height:32px;">
                          </p> -->
                          <p>
                              <Button type="success" long   @click="register">登录</Button>
                                <Button type="success" long  style="margin-top:20px;"  @click="ForgetPassword" >忘记密码</Button>
                              <p style="text-align:center; padding:16px 0px">
                                  <a  @click="enroll"  style="color:#337ab7">没有账号,去注册</a>
                              </p>
                          </p>
                     </TabPane>
                </Tabs>
            </div>
        </div> 
    </div>
</template>

<script>
import Qrcode from "v-qrcode";
export default {
  data() {
    return {
      qrCls: "qrcode",
      qrText: "",
      admin: "",
      password: "",
      randCode: "",
      //ImgUrl: this.AjaxUrl + "/randCodeImage?v=" + new Date().getTime()
      ImgUrl: `url${require("../../assets/login/logotop.png")}`
    };
  },
  methods: {
    uploadSuccess (res, file) { // 文件上传回调 上传成功后删除待上传文件
      console.log(res);
      console.log(file);
    },
    ForgetPassword() {
      this.$emit("Logins", "ForgetPassword");
    },
    Imgupdata() {
      this.ImgUrl = this.AjaxUrl + "/randCodeImage?v=" + new Date().getTime();
    },
    enroll() {
      this.$emit("Logins", "register");
      //this.$router.push({path:register})
    },
    register() {
      // if (this.randCode == "") {
      //   this.error("验证码不能为空");
      //   return false;
      // }
      if (this.userId == "") {
        this.error("用户名不能为空");
        return false;
      }
      if (this.password == "") {
        this.error("密码不能为空");
        return false;
      }
      let data = {};
      let { admin, password } = this;
      data.admin = admin;
      var md5 = require("md5");
      data.password = md5(password);
      let url = `${this.AjaxUrl}/ty_business/home/login`;
      this.axios
        .post(url, this.qs.stringify(data))
        .then(res => {
          let code = res.errorCode;
          if (code == 200) {
            let token = res.data;
            setCookie("token", token);
            this.$emit("Logins", true);
          } else if(code == 501){
            this.error(res.message);
          } else if(code == 510){
            this.error(res.message);
            let token = res.data;
            this.$router.push({
              name: "Auditinformation",
              query: { data: res.data }
            });
          }else if(code == 511){
            this.error(res.message);
            let token = res.data;
            this.$router.push({
              name: "Auditinformation",
              query: { data: res.data }
            });
          }else if(code == 512){
            this.error(res.message);
            let token = res.data;
            this.$router.push({
              name: "Auditinformation",
              query: { data: res.data }
            });
          }else{
            this.error(res.message);
            
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    error(text) {
      this.$Message.error(text);
    },
    success(text) {
      this.$Message.success(text);
    }
  },
  components: {
    Qrcode
  },
  mounted() {

    // let ws = "";
    // if ("WebSocket" in window) {
    //   // 初始化一个 WebSocket 对象
    //   ws = new WebSocket(`ws://${this.WebSocket}/home/websocket`);
    //   // 建立 web socket 连接成功触发事件
    //   ws.onopen = function() {
    //     // 使用 send() 方法发送数据
    //     ws.send("PC_USER_LOGIN");
    //     // alert("数据发送中...");
    //   };

    //   // 接收服务端数据时触发事件
    //   ws.onmessage = function(evt) {
    //     //console.log(evt);
    //     let url = JSON.parse(evt.data);
    //     console.log(url);
    //     this.qrText = url.info.key;
    //     //ws.close(); //关闭TCP连接
    //   };
    //   // 断开 web socket 连接成功触发事件
    //   ws.onclose = function() {
    //     alert("连接已关闭...");
    //   };
    // } else {
    //   this.error("该浏览器不能扫码登录！");
    // }
  }
};
</script>

<style  lang="scss" scoped>
.login {
  width: 100%;
  .login_top {
    height: 70px;
    width: 100%;
    // background-image: url("../../assets/login/logotop.png");
    // background-size: 100% 70px;
  }
  .login_body {
    position: relative;
    .frame {
      position: absolute;
      width: 330px;
      top: 60px;
      right: 140px;
      background: #d1ecf1;
      border-radius: 6px;
      p:nth-child(1) {
        padding-top: 16px;
        text-align: center;
        color: #0d9bb6;
        font-size: 16px;
      }
      p:nth-child(2),
      p:nth-child(3),
      p:nth-child(4) {
        padding: 0 30px;
        margin-top: 16px;
      }
      p:nth-child(5) {
        padding: 0 30px;
        margin-top: 12px;
      }
    }
  }
}
// .ivu-tabs-nav .ivu-tabs-tab{
//   width: 50%;
//   margin-right: 0px;
//   padding: 0px;
//   text-align: center;
// }
// .Tabs{
//   width: 100% !important;
// }
</style>
