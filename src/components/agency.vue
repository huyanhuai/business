<template>
  <div class="ProductList">
    <Toptitle :Title="'代理商管理'"/>
         <Form :label-width="80" style="padding-top:20px;"> 
            <div class="FormItem">
                <FormItem label="企业名称" class="FormItem_inp">
                    <Input v-model="Inquire.companyName" placeholder="请输入企业名称"></Input>
                </FormItem>
                <FormItem label="法人姓名" class="FormItem_inp">
                    <Input v-model="Inquire.legalRepresentativeName" placeholder="请输入法人姓名"></Input>
                </FormItem>
                <FormItem label="法人手机号" class="FormItem_inp">
                    <Input v-model="Inquire.legalRepresentativeMobile" placeholder="请输入法人手机号"></Input>
                </FormItem>
            </div>
           </Form> 
            <div style="text-align:center;margin-bottom:10px;">
                <Button type="success" @click="grabble">搜索</Button>
            </div>      
        <Table  style="margin-bottom:8px;" :loading="loading" border :columns="TableTop" :data="Tabledata"></Table>  
        <Page  width="100%"   @on-change="chang" :total="total" show-elevator style="text-align:right"></Page>


  </div>
</template>
<script>
import Toptitle from "./Toptitle";
export default {
  data() {
    return {
      Inquire: {
        pageNum: 1,
        companyName: "",
        legalRepresentativeName: "",
        legalRepresentativeMobile: ""
      },
      total: 0,
      loading: true,
      Tabledata: [],
      TableTop: [
        {
          title: "企业名称",
          key: "companyName",
          align: "center",
          width: 140,
          fixed: "left",
          // render: (h, params) => {
          //     let text = "";
          //     if(params.row.companyType == "PERSONAL") {
          //       text = "个人";
          //     }else {
          //       text = params.row.companyName;
          //     }
          //     return h("div", [
          //       h("strong", text)
          //     ]);
          //   }
        },
        {
          title: "具体地址",
          key: "companyAddress",
          align: "center"
        },
        {
          title: "法定姓名",
          key: "legalRepresentativeName",
          align: "center"
        },
        {
          title: "法人手机号",
          key: "legalRepresentativeMobile",
          align: "center"
        },
        {
          title: "昵称",
          key: "userName",
          align: "center"
        },
        {
          title: "开户账号",
          key: "bankAccount",
          align: "center"
        },
        {
          title: "代理审核状态",
          key: "applyStatus",
          width: 140,
          align: "center",
          render: (h, params) => {
            let text = "";
            let icon = "";
            let color = "";
            if (params.row.applyStatus == "INIT") {
              text = "初始";
            } else if (params.row.applyStatus == "SUCCESS") {
              text = "审核通过";
              icon = "checkmark-circled";
              color = "green";
            } else {
              text = "审核不通过";
              icon = "close-circled";
              color = "red";
            }
            return h("div", [
              h("Icon", {
                props: {
                  type: icon,
                  color: color
                }
              }),
              h("strong",{
                style: {
                    color: color
                  }
              }, text)
            ]);
          }
        },
        {
          title: "头像",
          key: "legalRepresentativeMobile",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Avatar", {
                props: {
                  src: this.ImgUrl+params.row.headImg+"_small.jpg"
                }
              })
            ]);
          }
        },
        {
          title: "操作",
          key: "legalRepresentativeMobile",
          width: 250,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            let a = h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    if(this.Tabledata[params.index].companyType == "COMPANY"){
                        this.detailed(params.index);
                    }else{
                        this.detailed0(params.index);
                    }
                  }
                }
              },
              "查看详情"
            );
            let b = h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.operating("SUCCESS", params.index);
                  }
                }
              },
              "审核通过"
            );
            let c = h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.operating("FAIL", params.index);
                  }
                }
              },
              "审核驳回"
            );
            let type = params.row.applyStatus;
            if (type == "INIT") {
              return h("div", [a, b, c]);
            } else if (type == "SUCCESS") {
              let d = h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.operating("MASK", params.index);
                    }
                  }
                },
                "屏蔽"
              );
              return h("div", [a, d]);
            } else if (type == "MASK") {
              let d = h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.operating("SUCCESS", params.index);
                    }
                  }
                },
                "启用"
              );
              return h("div", [a, d]);
            }
          }
        }
      ]
    };
  },
  methods: {
    operating(status, index) {
      let content = "";
      if(status == "SUCCESS" && this.Tabledata[index].applyStatus =="INIT") {
        content = "<p>确认审核通过吗？</p>";
      } else if(status == "FAIL" && this.Tabledata[index].applyStatus =="INIT") {
        content = "<p>确认审核驳回吗？</p>";
      } else if(this.Tabledata[index].applyStatus == "SUCCESS" && status == "MASK") {
        content = "<p>确认屏蔽吗？</p>";
      } else if(this.Tabledata[index].applyStatus == "MASK" && status == "SUCCESS") {
        content = "<p>确认启用吗？</p>";
      }
      this.$Modal.confirm({
        title: "提示",
        content: content,
        onOk: () => {
          let businessAgentUserId = this.Tabledata[index].businessAgentUserId;
          let data = {};
          data.status = status;
          data.businessAgentUserId = businessAgentUserId;
          this.axios
            .post(
              `${this.AjaxUrl}/ty_business/business/agent/user/audit`,
              this.qs.stringify(data)
            )
            .then(res => {
              if (res.errorCode == 200) {
                this.$Message.success(res.message);
                this.Comfort();
              } else {
                this.$Message.error(res.message);
              }
            });

        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
    },
    detailed0(index) {
      this.$Modal.success({
        title: "查看图片",
        width: "70%",
        content: `
        <div style="font-size:15px;">
        <p  style="width: 25%;float: left;margin-right:3%;">导游证图片
        <img  style="width: 100%;height:25vw;" src="${this.ImgUrl}${
          this.Tabledata[index].tourGuideCardImgurl
        }.jpg"/></p>
        <p  style="width: 25%;float: left;margin-right:3%;">身份证正面
        <img   style="width: 100%;height:25vw;" src="${this.ImgUrl}${
          this.Tabledata[index].identityCardFrontImgurl
        }.jpg"/></p>
        <p  style="width: 25%;float: left;">身份证反面
        <img  style="width: 100%;height:25vw;" src="${this.ImgUrl}${
          this.Tabledata[index].identityCardReverseImgurl
        }.jpg"/></p>
        <p  style="width: 100%;height:25vw;"></p>
        </div>
        `,
        onOk: () => {
          // this.$Message.info("Clicked ok");
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
    },
    detailed(index) {
      this.$Modal.success({
        title: "查看图片",
        width: "80%",
        content: `
        <div style="font-size:15px;">
        <p  style="width: 20%;float: left;margin-right:3%;">旅行社营业许可证
        <img  style="width: 100%;height:25vw;" src="${this.ImgUrl}${
          this.Tabledata[index].travelAgencyLicenceImgurl
        }.jpg"/></p>
        <p  style="width: 20%;float: left;margin-right:3%;">营业执照图片
        <img  style="width: 100%;height:25vw;" src="${this.ImgUrl}${
          this.Tabledata[index].businessLicenseImgurl
        }.jpg"/></p>
        <p  style="width: 20%;float: left;margin-right:3%;">身份证正面
        <img   style="width: 100%;height:25vw;" src="${this.ImgUrl}${
          this.Tabledata[index].identityCardFrontImgurl
        }.jpg"/></p>
        <p  style="width: 20%;float: left;">身份证反面
        <img  style="width: 100%;height:25vw;" src="${this.ImgUrl}${
          this.Tabledata[index].identityCardReverseImgurl
        }.jpg"/></p>
        <p  style="width: 100%;height:25vw;"></p>
        </div>
        `,
        onOk: () => {
          // this.$Message.info("Clicked ok");
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
    },
    chang(pageNum) {
      this.Inquire.pageNum = pageNum;
      this.Comfort();
    },
    grabble() {
      this.Inquire.pageNum = 1;
      this.Comfort();
    },
    Comfort() {
      this.loading = true;
      let data = this.Inquire;
      this.axios
        .get(`${this.AjaxUrl}/ty_business/agent/user/info/getList`, {
          params: data
        })
        .then(res => {
          if(res.errorCode == 200){
            this.loading = false;
            this.Tabledata = res.data.list;
            // console.log(this.Tabledata[0].companyType);
            this.total = res.data.total;
          }else{
            this.$Message.error(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.Comfort();
  },
  components: {
    Toptitle
  }
};
</script>

<style scoped>
.ivu-modal-confirm-body p{
  float: left;
}
.ProductList {
  background: #fff;
  padding: 0 20px;
}
.FormItem {
  display: flex;
}

.FormItem_inp {
  flex: 1;
}
.p_img {
  width: 100%;
}
</style>

