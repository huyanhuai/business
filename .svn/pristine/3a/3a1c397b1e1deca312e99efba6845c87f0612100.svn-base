<template>
  <div>
      <Toptitle :Title="Title" />
      <div style="padding:0 20px;">
      <Row>
        <Col span="8">
              <label for="">操作内容&nbsp;&nbsp; </label>
              <Input v-model="formItem.operationContent" placeholder="请输入操作内容" style="width: 300px"></Input>
        </Col>
        <Col span="8">
              <label for="">操作类型&nbsp;&nbsp; </label>
              <Input v-model="formItem.operationType" placeholder="请输入操作类型" style="width: 300px"></Input>
        </Col>
        <Col span="8">
          <label for="">操作人&nbsp;&nbsp; </label>
          <Input v-model="formItem.operator" placeholder="请输入操作人" style="width: 300px"></Input>    
        </Col>
        </Row>

        <p  style="textAlign:center;margin-top:10px">
            <Button type="success" @click="grabble">搜&nbsp;&nbsp;&nbsp;&nbsp;索</Button>
        </p> 
         <i-table    border  :content="self"   :columns="TabTop" :data="TabBody"  style="margin-top:10px" ></i-table> 
         <div style="textAlign:right;margin-top:10px">
             <Page   :total.sync="PageSize"    :current.sync="pageNum"  :pageSize="formItem.pageSize"    show-elevator></Page>
         </div>
      </div>
   

  </div>
</template>
<script>
import Toptitle from "./Toptitle";
import { add0, getDate, getDateTime0 } from "../js/public.js";
export default {
  data() {
    return {
      self: this,
      TabBody: [],
      PageSize: 0,
      TabTop: [
        {
          title: "操作类型",
          key: "logType",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.logType == "LOGIN") {
              return "登录";
            } else if (params.row.logType == "ADD") {
              return "新增";
            } else if (params.row.logType == "EDIT") {
              return "编辑";
            } else {
              return "删除";
            }
          }
        },
        {
          title: "操作内容",
          key: "logMessage",
          width: 500,
          align: "center"
        },
        {
          title: "操作人",
          key: "userName",
          align: "center"
        },
        {
          title: "ip",
          key: "ip",
          align: "center"
        },
        {
          title: "操作结果",
          key: "userName",
          align: "center",
          render: (h, params) => {
            if (params.row.logResult == "SUCCESS") {
              return "成功";
            } else {
              return "失败";
            }
          }
        },
        {
          title: "创建时间",
          key: "status",
          width: 100,
          align: "center",
          render(h, params) {
            return getDateTime0(params.row.createTime);
          }
        }
      ],
      Title: "日志管理",
      formItem: {
        operationContent: "",
        operationType: "",
        operator: "",
        pageSize: 10,
        pageNum: 1
      },
      pageNum: 1,
      cityList: []
    };
  },
  methods: {
    grabble() {
      this.pageNo = 1;
      this.pageNum = 1;
      this.first();
    },
    first() {
      let {
        operationContent,
        operationType,
        operator,
        pageNum
      } = this.formItem;
      this.axios
        .get(
          `${this.AjaxUrl}/ty_business/system/log/getList`,
          //this.qs.stringify(this.formItem)
          {
            params: {
              operationContent,
              operationType,
              operator,
              pageNum
            }
          }
        )
        .then(res => {
          if (res.errorCode == 200) {
            this.TabBody = res.data.list;
            this.PageSize = res.data.total;
          } else {
            this.$Message.error(res.message);
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.first();
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

