<template>
  <div>
      <Toptitle :Title="Title" />
      <div style="padding:0 20px;">
      <Row>
        <Col span="8">
         &nbsp;
        </Col>
        <Col span="8" style="text-align: center;">
              <label for="">角色名称&nbsp;&nbsp; </label>
              <Input v-model="formItem.roleName"  placeholder="请输入角色名称" style="width: 300px;"></Input>
        </Col>
        </Row>

        <p  style="textAlign:center;margin-top:10px">
            <Button type="success" @click="grabble">搜&nbsp;&nbsp;&nbsp;&nbsp;索</Button>
        </p>
         <div style="margin-top:10px">
           <Button type="success" @click="modal4=true">新&nbsp;&nbsp;&nbsp;&nbsp;增</Button>
         </div> 
         <i-table    border  :content="self"   :columns="TabTop" :data="TabBody"   ></i-table> 
         <div style="textAlign:right;margin-top:10px">
             <Page   :total.sync="total"    :current.sync="formItem.pageNum"  :pageSize="formItem.pageSize"     show-elevator></Page>
         </div>
      </div>
   
    <Modal
        v-model="modal1"
        title="编辑"
        @on-ok="ok(1)"
        @on-cancel="cancel">
        <p  style="text-align: center; margin-bottom:8px;">
          <label style="margin-right:8px;">角色名称</label>
          <Input v-model="roleName"  placeholder="请输入角色名称" style="width: 300px"></Input>
        </p>
        <p  style="text-align: center; margin-bottom:8px;">
          <label style="margin-right:8px;">角色描述</label>
          <Input v-model="describe"  placeholder="请输入角色描述" style="width: 300px"></Input>
        </p>
    </Modal>

    <Modal
        v-model="modal2"
        title="删除"
        @on-ok="ok(2)"
        @on-cancel="cancel">
        <p>确认删除吗?</p>
    </Modal>   

    <Modal
        v-model="modal3"
        title="设置权限"
        @on-ok="ok(3)"
        @on-cancel="cancel">
        <p>
           <Tree getCheckedNodes="check" :data="Tree" show-checkbox multiple  ref="tree"></Tree>
        </p>
    </Modal>  

    <Modal
        v-model="modal4"
        title="新增"
        @on-ok="ok(4)"
        @on-cancel="cancel">
        <p  style="text-align: center; margin-bottom:8px;">
          <label style="margin-right:8px;">角色名称</label>
          <Input  v-model="Newtown.roleName"  placeholder="请输入角色名称" style="width: 300px"></Input>
        </p>
        <p  style="text-align: center;margin-bottom:8px;">
          <label style="margin-right:8px;">角色描述</label>
          <Input v-model="Newtown.describe"  placeholder="请输入角色描述" style="width: 300px"></Input>
        </p>
    </Modal>       
  </div>
</template>
<script>
import Toptitle from "./Toptitle";
import { add0, getDate, getDateTime0 } from "../js/public.js";
export default {
  data() {
    return {
      Newtown: {
        roleName: "",
        describe: ""
      },
      auth_id: "",
      jurisdiction: [],
      check: "",
      Tree: [],
      describe: "",
      roleName: "",
      businessRoleId: "",
      self: this,
      TabBody: [],
      total: 0,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      TabTop: [
        {
          title: "角色ID",
          key: "businessRoleId",
          align: "center"
        },
        {
          title: "角色名称",
          key: "roleName",
          align: "center"
        },
        {
          title: "角色描述",
          key: "describe",
          align: "center"
        },
        {
          title: "添加时间",
          key: "createDt",
          align: "center",
          render(h, params) {
            return getDateTime0(params.row.createTime);
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
                      this.modal1 = true;
                      this.businessRoleId = this.TabBody[
                        params.index
                      ].businessRoleId;
                      this.describe = this.TabBody[params.index].describe;
                      this.roleName = this.TabBody[params.index].roleName;
                      // console.log(params.index);
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
                      this.businessRoleId = this.TabBody[
                        params.index
                      ].businessRoleId;
                      console.log(params.index);
                      this.modal2 = true;
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
                      this.Tree = [];
                      //console.log(params.index);
                      let data = {};
                      this.businessRoleId = this.TabBody[
                        params.index
                      ].businessRoleId;
                      let businessRoleId = this.TabBody[params.index]
                        .businessRoleId;
                      this.axios
                        .get(
                          `${
                            this.AjaxUrl
                          }/ty_business/system/auth/getAuthByBusiness`,
                          {
                            params: {
                              businessRoleId
                            }
                          }
                        )
                        .then(res => {
                          if (res.errorCode == 200) {
                            let data = res.data;
                            this.jurisdiction = data;
                            console.log(data);
                            for (let i = 0; i < data.length; i++) {
                              if (data[i].authList == "") {
                                var title = data[i].authName;
                                var checked = data[i].check;
                                this.Tree.push({ title, checked });
                              } else {
                                let title = data[i].authName;
                                let expand = true;
                                let children = [];

                                for (let x of data[i].authList) {
                                  let title = x.authName;
                                  let checked = x.check;
                                  children.push({ title, checked });
                                }
                                this.Tree.push({ title, expand, children });
                              }
                            }
                            this.modal3 = true;
                          } else {
                            this.$Message.error(res.message);
                          }
                        })
                        .catch(err => {
                          //this.$Message.error(res.data.errorMessage);
                        });
                    }
                  }
                },
                "角色授权"
              )
            ]);
          }
        }
      ],
      Title: "角色管理",
      formItem: {
        roleName: null,
        pageSize: 10,
        pageNum: 1
      },
      pageNum: 1,
      cityList: []
    };
  },
  methods: {
    first() {
      let { roleName, pageNum } = this.formItem;
      this.axios
        .get(`${this.AjaxUrl}/ty_business/business/role/getList`, {
          params: {
            roleName,
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
      let { roleName } = this.formItem;
      let pageNum = 1;
      // console.log(roleName);
      this.axios
        .get(`${this.AjaxUrl}/ty_business/business/role/getList`, {
          params: {
            roleName,
            pageNum
          }
        })
        .then(res => {
          this.TabBody = res.data.list;
          this.total = res.data.total;
        })
        .catch(err => {});
    },
    ok(type) {
      if (type == 1) {
        let data = {};
        data.businessRoleId = this.businessRoleId;
        data.describe = this.describe;
        data.roleName = this.roleName;
        data.auth_id = this.auth_id;
        this.axios
          .post(
            `${this.AjaxUrl}/ty_business/business/role/update`,
            this.qs.stringify(data)
          )
          .then(res => {
            if (res.errorCode == 200) {
              this.$Message.info(res.message);
              console.log(res.errorCode == 200);
              this.first();
            } else {
              this.$Message.error(res.message);
            }
          })
          .catch(err => {
            //this.$Message.error(res.data.errorMessage);
          });
      } else if (type == 2) {
        let data = {};
        data.businessRoleId = this.businessRoleId;
        data.auth_id = this.auth_id;
        this.axios
          .post(
            `${this.AjaxUrl}/ty_business/business/role/delete`,
            this.qs.stringify(data)
          )
          .then(res => {
            if (res.errorCode == 200) {
              this.$Message.info(res.message);
              this.first();
            } else {
              this.$Message.error(res.message);
            }
          })
          .catch(err => {
            //this.$Message.error(res.data.errorMessage);
          });
      } else if (type == 3) {
        let pitch = this.$refs.tree.getCheckedNodes();
        let data = {};
        let authIdArray = "";
        let jurisdiction = [];
        for (let i of this.jurisdiction) {
          jurisdiction.push({ name: i.authName, systemAuthId: i.systemAuthId });

          if (i.authList != "") {
            for (let x = 0; x < i.authList.length; x++) {
              jurisdiction.push({
                name: i.authList[x].authName,
                systemAuthId: i.authList[x].systemAuthId
              });
            }
          }
        }

        for (let i of pitch) {
          for (let x = 0; x < jurisdiction.length; x++) {
            if (jurisdiction[x].name == i.title) {
              authIdArray += jurisdiction[x].systemAuthId + ",";
            }
          }
        }

        console.log(authIdArray);

        data.businessRoleId = this.businessRoleId;
        data.authIds = authIdArray;
        data.auth_id = this.auth_id;
        this.axios
          .post(
            `${this.AjaxUrl}/ty_business/business/role/auth/allotAuth`,
            this.qs.stringify(data)
          )
          .then(res => {
            if (res.errorCode == 200) {
              this.$Message.info(res.message);
              this.first();
            } else {
              this.$Message.error(res.message);
            }
          })
          .catch(err => {
            //this.$Message.error(res.data.errorMessage);
          });
      } else {
        let data = {};
        let { roleName, describe } = this.Newtown;
        data.roleName = roleName;
        data.describe = describe;
        data.auth_id = this.auth_id;
        this.axios
          .post(
            `${this.AjaxUrl}/ty_business/business/role/createRole`,
            this.qs.stringify(data)
          )
          .then(res => {
            if (res.errorCode == 200) {
              this.$Message.info(res.message);
              this.first();
            } else {
              this.$Message.error(res.message);
            }
          })
          .catch(err => {
            //this.$Message.error(res.data.errorMessage);
          });
      }
    },
    cancel() {
      //this.roleId="";
      //this.$Message.info("Clicked cancel");
    }
  },
  mounted() {
    this.first();
    this.auth_id = this.$route.params.id;
  },
  watch: {
    pageNo() {
      this.formItem.pageNo = this.pageNo;
      this.first();
    }
  },
  components: {
    Toptitle
  }
};
</script>

