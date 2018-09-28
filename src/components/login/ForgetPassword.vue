<template>
    <div class="login">
        <div class="login_top">
          <img src="../../assets/login/logotop.png" alt="" class="login_top" >
        </div>
        <div class="login_body">
            <img src="../../assets/login/logoback.png" alt=""   width="100%" height="600px">    
            <div class="frame"  v-if="ForgetPassword" >
                <p>忘记密码</p>
                <p>
                     <Input   type="text" v-model="mobile" placeholder="请输入手机号" style="width: 100%"></Input>
                </p>
                <p>
                    <Input  type="text" v-model="verificationCode" placeholder="请输入验证码" style="width: 60%"></Input> 
                    <Button type="success" class="verification" style="float:right;"  disabled v-if="send">验证码({{digital}})</Button>
                    <!-- <Button type="success"  style="float:right"  disabled v-if="send">发送验证码</Button> -->
                    <Button type="success"  style="float:right"  v-else   @click="Sendtheverificationcode" >发送验证码</Button>
                </p>
                <p>
                     <Input   type="password" v-model="password" placeholder="请输入密码" style="width: 100%"></Input>
                </p>
                 <p>
                     <Input  type="password" v-model="passwordtow" placeholder="请重新输入密码" style="width: 100%"></Input>
                </p>
                <p>
                     <Button type="success" long   @click="register">提交</Button>
                     <Button type="success" long   @click="login" style="margin-top:10px;">返回登录</Button>
                </p>
            </div>
            <!-- <div v-else  class="frame">
                <p>忘记密码</p>
                <p>
                     <Input   type="password" v-model="password" placeholder="请输入密码" style="width: 100%"></Input>
                </p>
                 <p>
                     <Input  type="password" v-model="passwordtow" placeholder="请重新输入密码" style="width: 100%"></Input>
                </p>
                <p>
                     <Button type="success" long   @click="ResetPassword">提交</Button>
                </p> 
            </div> -->
        </div>  
    </div>
</template>

<script>
export default {
  data() {
    return {
      digital: 60,
      verificationCode: "",
      mobile: "",
      send: false,
      registrationMailbox: "",
      ForgetPassword: true,
      password: "",
      passwordtow: ""
    };
  },
  methods: {
    Sendtheverificationcode() {
      let { mobile } = this;
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(mobile)) {
        this.error("手机号格式不正确！");
        return false;
      }
      const md5 = require("md5");
      let code = md5(mobile + "PC_20!$_TY_HZ");
      let data = {};
      data.mobile = mobile;
      data.code = code;
      data.type = "RESET";
      console.log(data);     
          
      this.axios
        .post(
          `${this.AjaxUrl}/ty_business/home/sendMessage`,
          this.qs.stringify(data)
        )
        .then(res => {
          if(res.errorCode == 200){
            this.send = true;
            let ss = setInterval(() => {
              this.digital -= 1;
              if (this.digital == 0) {
                this.digital = 60;
                this.send = false;
                clearInterval(ss);
              }
            }, 1000);

            // setTimeout(() => {
            //   this.send = false;
            // }, 60000);
            console.log(res);
          }else{
            this.error(res.message);
          }
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    login() {
        //返回登录
        this.$router.push({ path: "/login" });
    },
    // ResetPassword() {
    //   let data = [];
    //   let { password, userId } = this;
    //   data.push({ password, userId });
    //   this.axios
    //     .post(
    //       `${this.AjaxUrl}/tyms/system/forgetAndReset.do`,
    //       this.qs.stringify(data[0])
    //     )
    //     .then(res => {
    //       if (res.data.success) {
    //         this.$emit("Logins", "login");
    //         console.log(data);
    //       } else {
    //         this.error(err.data.msg);
    //       }
    //     })
    //     .catch(err => {
    //       this.error(err.data.msg);
    //     });
    // },
    register() {
      let data = [];
      let { mobile, verificationCode, password } = this;
      if (verificationCode == "") {
        this.error("验证码不能为空！");
        return false;
      }
      if (this.password == "" || this.passwordtow == "") {
        this.error("密码不能为空");
        return false;
      }else if(this.password.length < 6){
        this.error("密码不能少于6位");
        return false;
      }
      if (this.password != this.passwordtow) {
        this.error("二次密码输入不一致");
        return false;
      }
      data.mobile = mobile;
      data.verificationCode = verificationCode;
      const md5 = require("md5");
      data.password = md5(password);
      this.axios
        .post(
          `${this.AjaxUrl}/ty_business/home/resetPassword`,
          this.qs.stringify(data)
        )
        .then(res => {
          if (res.errorCode == 200) {
            this.success(res.message);
            setTimeout(() => {
              this.$emit("Logins", "login");
            }, 1000);
          } else if(res.errorCode == 304){
            this.error(res.message)
          }else{
            this.error(res.message);
          }
          console.log(res);
          // if (res.data.success) {
          //   //this.ForgetPassword = false;
          // } else {
          //   this.error(res.data.msg);
          // }
        })
        .catch(err => {
          this.error(err.data.msg);
        });
    },
    error(text) {
      this.$Message.error(text);
    },
    success(text) {
      this.$Message.success(text);
    }
  },
  created() {
    // let id=this.$route.query.id;
    // console.log(id)
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
    // background-size: 100% 100%;
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
      p:nth-child(4),
      p:nth-child(5),
      p:nth-child(6) {
        padding: 0 30px;
        margin-top: 16px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
