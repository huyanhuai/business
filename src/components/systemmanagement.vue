<template>
  <div>
      <Toptitle :Title="Title" />
      <div style="padding:0 20px;">
      <Row>
        <Col span="8">
              <label for="">用户名称&nbsp;&nbsp; </label>
              <Input v-model="formItem.roleName" placeholder="请输入用户名称" style="width: 300px"></Input>
        </Col>
        <Col span="8">
              <label for="">手机号&nbsp;&nbsp; </label>
              <Input v-model="formItem.mobile" placeholder="请输入手机号" style="width: 300px"></Input>
        </Col>
        <Col span="8">
          <label for="">用户状态&nbsp;&nbsp; </label>
                <Select v-model="formItem.status" style="width:300px">
                    <Option v-for="item in statelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>   
        </Col>
        </Row>

        <p  style="textAlign:center;margin-top:10px">
            <Button type="success" @click="grabble">搜&nbsp;&nbsp;&nbsp;&nbsp;索</Button>
        </p> 
        <div  style="margin-top:10px" >
          <Button type="success" @click="NewlyIncreasedFun">新&nbsp;&nbsp;&nbsp;&nbsp;增</Button>
        </div>
         <i-table    border  :content="self"   :columns="TabTop" :data="TabBody" ></i-table> 
         <div style="textAlign:right;margin-top:10px">
             <Page   :total.sync="total"    :current.sync="pageNum"  :pageSize="formItem.pageSize"     show-elevator></Page>
         </div>
      </div>
   
      <Modal
        v-model="modal4"
        title="新增">
        <p  style="text-align: center; margin-bottom:8px;">
          <label style="margin-right:8px;width: 50px;display: inline-block;text-align:right">用户名称</label>
          <Input v-model="newlyIncreased.userName"  type="text" placeholder="请重新输入用户名称" style="width: 300px"></Input>
        </p>
        <p  style="text-align: center; margin-bottom:8px;">
          <label style="margin-right:8px;width: 50px;display: inline-block;text-align:right">手机号</label>
          <Input v-model="newlyIncreased.mobile"  type="text" placeholder="请重新输入手机号" style="width: 300px"></Input>
        </p>
          <p  style="text-align: center; margin-bottom:8px;">
          <label style="margin-right:8px;width: 50px;display: inline-block;text-align:right">密码</label>
          <Input  v-model="newlyIncreased.password" type="password"  placeholder="请输入密码" style="width: 300px"></Input>
        </p>
        <p  style="text-align: center; margin-bottom:8px;">
          <label style="margin-right:8px;width: 50px;display: inline-block;text-align:right">确认密码</label>
          <Input v-model="newlyIncreased.twopassword"  type="password" placeholder="请重新输入密码" style="width: 300px"></Input>
        </p>    
        <div  style="text-align: center;">
            <label style="margin-right:8px;width: 50px;display: inline-block;text-align:right">角色</label>
            <div style="width:300px;display:inline-block">         
            <RadioGroup  v-model="newlyIncreased.businessRoleId">
                  <Radio  :label="item.businessRoleId" style="display:block;text-align:left" :key="key" v-for="(item, key) in toEditlist">
                      <span>{{item.roleName}}</span>
                  </Radio >
              </RadioGroup>
            </div>
        </div>  
        <div slot="footer">
            <Button type="text" size="large" @click="cancel">取消</Button>
            <Button type="primary" size="large" :loading="addLoading" @click="ok">确认</Button>
        </div>  
    </Modal>


      <Modal
        v-model="modal1"
        title="修改密码">
          <p  style="text-align: center; margin-bottom:8px;">
          <label style="margin-right:8px;width: 50px;display: inline-block;text-align:right">密码</label>
          <Input  v-model="operation.password" type="password"  placeholder="请输入密码" style="width: 300px"></Input>
        </p>
        <p  style="text-align: center;">
          <label style="margin-right:8px;width: 50px;display: inline-block;text-align:right">确认密码</label>
          <Input v-model="operation.twopassword"  type="password" placeholder="请重新输入密码" style="width: 300px"></Input>
        </p>
        <div slot="footer">
            <!-- <Button type="text" size="large" @click="cancel">取消</Button> -->
            <Button type="primary" size="large"  @click="ok">确认</Button>
        </div> 
    </Modal>

        <Modal
        v-model="modal2"
        title="确认删除？"
        @on-ok="ok">
        <p>确认删除该用户吗？</p>
    </Modal>

      <Modal
        v-model="modal3"
        title="编辑"
        @on-ok="ok">
          <p  style="text-align: center; margin-bottom:8px;">
          <label style="margin-right:8px;width: 50px;display: inline-block;text-align:right">用户名称</label>
          <Input  v-model="operation.userName"   placeholder="请输入用户名称" style="width: 300px"></Input>
        </p>
        <p  style="text-align: center;">
          <label style="margin-right:8px;width: 50px;display: inline-block;text-align:right">手机号</label>
          <Input  v-model="operation.mobile"   placeholder="请输入手机号" style="width: 300px"></Input>
        </p>
        <p  style="text-align: center;margin-top: 10px;">
          <label style="margin-right:8px;width: 50px;display: inline-block;text-align:right">状态</label>
          <Select v-model="operation.status" style="width:300px">
              <Option v-for="item in statelist"  :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </p>
        <div  style="text-align: center;margin-top: 10px;">
            <label style="margin-right:8px;width: 50px;display: inline-block;text-align:right">角色</label>
            <div style="width:300px;display:inline-block">         
            <RadioGroup  v-model="operation.businessRoleId">
                  <Radio  :label="item.businessRoleId" style="display:block;text-align:left" :key="key" v-for="(item, key) in toEditlist">
                      <span>{{item.roleName}}</span>
                  </Radio >
              </RadioGroup>
            </div>
        </div>
    </Modal>    
  </div>
</template>
<script>
import Toptitle from "./Toptitle";
import { add0, getDate } from "../js/public.js";
export default {
  data() {
    return {
      auth_id:"",
      newlyIncreased: {
        password: "",
        roleIds: "",
        userId: "",
        userName: "",
        userStat: "NORMAL",
        twopassword: "",
        businessRoleId: "",
        mobile: "",
        addLoading: false
      },
      toEditlist: [],
      operation: {
        type: "",
        userName: "",
        mobile: "",
        status: "",
        businessRoleId: "",
        businessUserId: "",
        password: "",
        twopassword: ""
      },
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      self: this,
      TabBody: [],
      total: 0,
      statelist: [{ value: 0, label: "正常" }, { value: 1, label: "无效" }],
      TabTop: [
        {
          title: "用户名称",
          key: "userName",
          width: 140,
          align: "center"
        },
        {
          title: "手机号",
          key: "mobile",
          align: "center"
        },
        //roleName
        {
          title: "角色",
          key: "roleName",
          align: "center"
        },
        // {
        //   title: "添加时间",
        //   key: "lastEditDt",
        //   align: "center",
        //   render(h, params) {
        //     return getDate(params.row.lastEditDt);
        //   }
        // },
        // {
        //   title: "最后登录",
        //   key: "lastLognDttm",
        //   align: "center",
        //   render(h, params) {
        //     return getDate(params.row.lastLognDttm);
        //   }
        // },
        {
          title: "用户状态",
          key: "userStat",
          width: 100,
          align: "center",
          render(h, params) {
            return params.row.status == 0 ? "正常" : "无效";
          }
        },
        {
          title: "操作",
          key: "status",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
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
                      this.operation.type = 1;
                      this.modal3 = true;

                      this.operation.businessUserId = this.TabBody[
                        params.index
                      ].businessUserId;

                      this.operation.userName = this.TabBody[
                        params.index
                      ].userName;

                      this.operation.mobile = this.TabBody[params.index].mobile;

                      this.operation.status = this.TabBody[params.index].status;
                      console.log(this.operation.status);
                      this.operation.businessRoleId = this.TabBody[
                        params.index
                      ].businessRoleId;
                    }
                  }
                },
                "编辑"
              ),
              h(
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
                      this.modal2 = true;
                      this.operation.type = 2;
                      this.operation.businessUserId = this.TabBody[
                        params.index
                      ].businessUserId;
                      console.log(this.operation.businessUserId);
                    }
                  }
                },
                "删除"
              ),
              h(
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
                      this.operation.password = "";
                      this.operation.twopassword = "";
                      this.modal1 = true;
                      this.operation.type = 3;
                      this.operation.businessUserId = this.TabBody[
                        params.index
                      ].businessUserId;
                      //console.log(params.index);
                    }
                  }
                },
                "修改密码"
              )
            ]);
          }
        }
      ],
      Title: "系统管理",
      formItem: {
        userName: null,
        mobile: null,
        status: null,
        pageSize: 10,
        pageNum: 1
      },
      pageNum: 1,
      cityList: []
    };
  },
  methods: {
    cancel() {
      this.modal4 = false;
    },
    NewlyIncreasedFun() {
      this.modal4 = true;
      this.newlyIncreased.userName = "";
      this.newlyIncreased.mobile = "";
      this.newlyIncreased.password = "";
      this.newlyIncreased.twopassword ="";
      this.operation.type = 4;
    },
    ok() {
      if (this.operation.type == 1) {
        let url = `${this.AjaxUrl}/ty_business/business/user/updateAccount`;
        let data = {};

        let {
          userName,
          businessRoleId,
          businessUserId,
          mobile,
          status
        } = this.operation;

        data.userName = userName;
        data.businessRoleId = businessRoleId;
        data.businessUserId = businessUserId;
        data.mobile = mobile;
        data.status = status;
        data.auth_id=this.auth_id;
        this.axios
          .post(url, this.qs.stringify(data))
          .then(res => {
            if (res.errorCode == 200) {
              this.$Message.success(res.message);
              this.first();
            } else {
              this.$Message.error(res.message);
            }
          })
          .catch(err => {});
      } else if (this.operation.type == 2) {
        let url = `${this.AjaxUrl}/ty_business/business/user/deleteAccount`;
        let data = {};
        data.businessUserId = this.operation.businessUserId;
        data.auth_id=this.auth_id;
        this.axios
          .post(url, this.qs.stringify(data))
          .then(res => {
            if (res.errorCode == 200) {
              this.$Message.success(res.message);
              this.first();
            } else {
              this.$Message.error(res.message);
            }
          })
          .catch(err => {});
      } else if (this.operation.type == 3) {
        if (this.operation.password != "" && this.operation.password == this.operation.twopassword) {
          let url = `${
            this.AjaxUrl
          }/ty_business/business/user/updateAccountPassword`;
          let data = {};
          var md5 = require("md5");
          data.password = md5(this.operation.password);
          data.businessUserId = this.operation.businessUserId;
          data.auth_id=this.auth_id;
          this.axios
            .post(url, this.qs.stringify(data))
            .then(res => {
              if (res.errorCode == 200) {
                this.modal1 = false;
                this.$Message.success(res.message);
              } else {
                this.$Message.error(res.message);
              }
            })
            .catch(err => {});
        } else {
          this.$Message.error("两次密码输入不一致!");
          this.operation.password = "";
          this.operation.twopassword = "";
          return false;
        }
      } else {
        // var regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
        // if (regExp.test(this.newlyIncreased.password)) {
        if (this.newlyIncreased.password.length >= 6) {
          this.addLoading = true;
          if (this.newlyIncreased.password == this.newlyIncreased.twopassword) {
            let url = `${this.AjaxUrl}/ty_business/business/user/createAccount`;
            let data = {};
            let md5 = require("md5");

            data.password = md5(this.newlyIncreased.password);
            data.businessRoleId = this.newlyIncreased.businessRoleId;

            //data.userId = this.newlyIncreased.userId;
            data.userName = this.newlyIncreased.userName;
            data.mobile = this.newlyIncreased.mobile;
            data.auth_id = this.auth_id;
            this.axios
              .post(url, this.qs.stringify(data))
              .then(res => {
                if (res.errorCode == 200) {
                  for (var i in this.newlyIncreased) {
                    if (i == "social") {
                      this.newlyIncreased[i] = [];
                    } else {
                      this.newlyIncreased[i] = "";
                    }
                  }
                  this.modal4 = false;
                  this.addLoading = false;
                  this.$Message.success(res.message);
                  this.first();
                } else {
                  this.addLoading = false;
                  this.$Message.error(res.message);
                }
              })
              .catch(err => {});
          } else {
            this.addLoading = false;
            this.$Message.error("二次密码输入不一致！");
          }
        } else {
          this.addLoading = false;
          this.$Message.error("密码不少于6位！");
        }
      }
    },
    first() {
      let { roleName, status, pageNum, mobile } = this.formItem;

      this.axios
        .get(`${this.AjaxUrl}/ty_business/business/user/getList`, {
          params: {
            mobile,
            roleName,
            status,
            pageNum
          }
        })
        .then(res => {
          this.TabBody = res.data.list;
          this.total = res.data.total;
        })
        .catch(err => {});
    },
    grabble() {
      this.pageNum = 1;
      this.first();
    }
  },
  mounted() {
    this.first();
    this.auth_id = this.$route.params.id;
    let url = `${this.AjaxUrl}/ty_business/business/role/getAll`;
    this.axios
      .get(url, {
        params: {}
      })
      .then(res => {
        this.toEditlist = res.data;
      })
      .catch(err => {});
  },
  watch: {
    pageNum() {
  
      this.formItem.pageNum = this.pageNum;
      this.first();
    }
  },
  components: {
    Toptitle
  }
};
</script>

