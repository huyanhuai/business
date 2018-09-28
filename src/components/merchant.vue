<template  lang="pug">
    div
      p.Title {{Title}}
        span >
        span.list {{list}}
      div(style="background:#f7f7f7;padding-top:40px;")
        Row(style="width:1000px;margin:0 auto") 
            Col(:span="8" :offset="2" )
              Upload(
                :before-upload="handleUpload"
                :action="updataurl"
                 ref="upload"
                :on-success="updataimg"
                :headers="headerstoken"
                :default-file-list="imglist"
                :show-upload-list="false"
     
              )
                Avatar(shape="square" :src="AvatarUrl"  size="small" style="width:330px;height:240px;")
            Col(:span="12" :offset="2") 
              div.fromlist 
                h5.inputLaber 商家名称
                Input(v-model="userform.userName" style="width:300px" ) 
              div.fromlist
                h5.inputLaber 联系人
                Input(v-model="userform.corporateContactsName" style="width:300px" ) 
              div.fromlist
                h5.inputLaber 服务电话
                Input(v-model="userform.corporateContactsMobile" placeholder="请输入号码" style="width:300px" ) 
              //- div.fromlist
              //-   h5.inputLaber 商家地址
              //-   Input(v-model="userform.msMerchantAddress" style="width:300px" ) 
              //- div.fromlist
              //-   h5.inputLaber 行业
              //-   Select(v-model="userform.industry"  style="width:300px" )
              //-       <Option v-for="item in industrylist" :value="item.value" :key="item.value">{{ item.label }}</Option>
              //- div.fromlist
              //-   h5.inputLaber 类型
              //-   Select(v-model="userform.managementType"  style="width:300px" )
              //-       <Option v-for="item in managementTypelist" :value="item.name" :key="item.value">{{ item.name }}</Option>
            Col(span="22" offset="2" style="margin-top:40px")
              p 文本介绍         
              Input(v-model="userform.detail"  :rows="6" type="textarea" placeholder="商家介绍")
            
            Col( span="24" style="text-align:center;margin-top:14px")
               Button(type="success" @click="upload" :loading="loadingStatus") 提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交
</template>
<script>
import jsondata from "../JsonData.json";
export default {
  data() {
    return {
      updataurl: `${this.AjaxUrl}/ty_business/bbusiness/user/uploadHeadImg`,
      headerstoken: { token: "111" },
      auth_id: "",
      Title: "商家管理",
      list: "商家信息",
      userform: {
        detail: "",
        userName: "",
        enterpriseName: "",
        corporateContactsName: "",
        corporateContactsMobile: "",
        businessUserId: "",
        headImg: ""
      },
      industrylist: [],
      file: null,
      loadingStatus: false,
      AvatarUrl: "",
      datalist: { auth_id: this.auth_id },
      imglist: [{ name: "file", url: "" }]
    };
  },
  computed: {},
  methods: {
    handleUpload(file) {
      let data = new FormData();
      data.append("head_img", file);
      data.append("auth_id", this.auth_id);
      this.axios
        .post(`${this.AjaxUrl}/ty_business/business/user/uploadHeadImg`, data)
        .then(res => {
          // this.AvatarUrl = res.data + ".jpg";
          this.userform.headImg = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

      // this.file = file;
      var reader = new FileReader();
      var _this = this;
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        _this.AvatarUrl = this.result;
      };
      // this.imglist[0].url = this.AvatarUrl;
      return false;
    },
    upload() {
      let url = `${this.AjaxUrl}/ty_business/business/user/update`;
      let data = {};
      let {
        detail,
        userName,
        enterpriseName,
        corporateContactsName,
        corporateContactsMobile,
        businessUserId,
        headImg
      } = this.userform;
      let nums = /^1[34578][0-9]{9}$/;
      // if(nums.test(corporateContactsMobile)) {
        data.corporateContactsMobile = corporateContactsMobile;
      // }else{
      //   this.$Message.error("请输入正确的11位手机号");
      //   return false;
      // }

      data.detail = detail;
      data.headImg = headImg;
      data.userName = userName;
      data.corporateContactsName = corporateContactsName;
      data.businessUserId = businessUserId;
      data.auth_id = this.auth_id;
      console.log(data.auth_id);

      this.axios
        .post(url, this.qs.stringify(data))
        .then(res => {
          if (res.errorCode == 200) {
            this.$Message.success(res.message);
          } else if (res.errorCode == 2001) {
            deleteCookie("token");
            this.$emit("Logins", "login");
          } else {
            this.$Message.error(res.message);
          }
        })
        .catch(err => {
          // console.log(11);
        });
    },
    updataimg(response, file, fileList) {
      this.userform.merchantImg = response.data;
      console.log(this.userform);
    }
  },
  mounted() {
    this.auth_id = this.$route.params.id;

    this.userform.industry = jsondata.obj[0].name;
    let url = `${this.AjaxUrl}/ty_business/business/user/getUserInfo`;

    var data = {};

    this.axios
      .get(url, {})
      .then(res => {
        if (res.errorCode == 200) {
          let {
            userName,
            detail,
            corporateContactsName,
            corporateContactsMobile,
            businessUserId
          } = res.data;

          this.userform.userName = userName;
          this.userform.detail = detail;
          this.userform.corporateContactsName = corporateContactsName;
          this.userform.corporateContactsMobile = corporateContactsMobile;
          this.userform.businessUserId = businessUserId;
          this.userform.headImg = res.data.headImg;
          this.AvatarUrl = this.ImgUrl + res.data.headImg + ".jpg";
        } else {
          this.$Message.error(res.message);
        }
      })
      .catch(err => {});
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.Title {
  height: 40px;
  line-height: 40px;
  // color: #929292;
  background: #f7f7f7;
  text-indent: 16px;
  font-size: 16px;
  border-bottom: 1px solid #52c0c7;
  span {
    margin-left: 4px;
  }
}
.fromlist {
  margin-bottom: 8px;
}
.inputLaber {
  display: inline-block;
  margin-right: 8px;
  min-width: 60px;
}
</style>

