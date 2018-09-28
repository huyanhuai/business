<template  lang="pug">
    div
        p.Title {{Title}}
            span >
            span.list {{list}}
        .content
            .content_top
                span 1
                span 2
                span 3
                b
                i(:style="Iwidth")
            .content_body
                div.fromlist 
                    h5.inputLaber 旧密码
                    Input(v-model="changparssword.oldPassword"  type="password" style="width:290px" ) 
                div.fromlist 
                    h5.inputLaber 新密码
                    Input(v-model="changparssword.password" type="password" style="width:290px" )
                div.fromlist 
                    h5.inputLaber 确认密码
                    Input(v-model="changparssword.repetition" type="password" style="width:290px" )  
                .fromlist(style="text-align:center")
                    Button(type="success"  @click="grabble") 提&nbsp;&nbsp;&nbsp;&nbsp;交                 
</template>

<script>
export default {
  data() {
    return {
      auth_id: "",
      Title: "商家信息",
      list: "修改密码",
      Iwidth: {
        width: "0px"
      },
      changparssword: {
        oldPassword: "",
        password: "",
        repetition: ""
      }
    };
  },
  methods: {
    grabble() {
      if (this.changparssword.password == this.changparssword.repetition) {
        let data = {};
        var md5 = require("md5");
        let url = `${this.AjaxUrl}/ty_business/business/user/updatePassword`;
        data.oldPassword = md5(this.changparssword.oldPassword);
        data.newPassword = md5(this.changparssword.password);
        data.auth_id = this.auth_id;
        this.axios
          .post(url, this.qs.stringify(data))
          .then(res => {
            if (res.errorCode == 200) {
              this.$Message.success(res.message);
            } else {
              this.$Message.error(res.message);
            }
          })
          .cathc(err => {});
      } else {
        this.$Message.error("两次密码输入不一致!");
      }
    }
  },
  mounted() {
    this.auth_id = this.$route.params.id;
  }
};
</script>
<style lang="scss" scoped >
.content_body {
  margin-top: 40px;
  .fromlist {
    margin-bottom: 10px;
    .inputLaber {
      display: inline-block;
      margin-right: 8px;
      min-width: 60px;
    }
  }
}
.Title {
  height: 40px;
  line-height: 40px;
  color: #929292;
  background: #f7f7f7;
  text-indent: 16px;
  font-size: 16px;
  border-bottom: 1px solid #52c0c7;
  span {
    margin-left: 4px;
  }
}
.content {
  margin: 0 auto;
  margin-top: 100px;
  width: 360px;
  .content_top {
    height: 50px;
    line-height: 50px;
    width: 100%;
    position: relative;
    span {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #52c0c7;
      line-height: 40px;
      text-align: center;
      color: #fff;
      position: absolute;
      top: 5px;
      z-index: 1;
    }
    b {
      display: inline-block;
      width: 100%;
      height: 2px;
      background: #bbb;
    }
    i {
      display: inline-block;
      height: 2px;
      position: absolute;
      top: 27px;
      background: #52c0c7;
      z-index: 0;
      left: 0px;
    }
    span:nth-child(1) {
      left: 0px;
    }
    span:nth-child(2) {
      left: 50%;
      margin-left: -20px;
    }
    span:nth-child(3) {
      right: 0px;
    }
  }
}
</style>
