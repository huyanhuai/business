<template>
  <div>
      <Toptitle :Title="Title" />
      <div style="padding:0 20px;">
      <Row style="margin-top:10px;">
        <Col span="8">
        &nbsp;
        </Col>
        <Col span="10">
              <label for="" class="laber16">起止验票时间</label>
              <DatePicker   placement="bottom-end" type="daterange" v-model="formItem.payTimeStartEed" placeholder="请输入支付时间" style="width: 300px"></DatePicker>
        </Col>
        </Row>
        <p  style="textAlign:center;margin-top:10px">
            <Button type="success" @click="grabble">搜&nbsp;&nbsp;&nbsp;&nbsp;索</Button>
        </p> 
         <i-table    border  :content="self"   :columns="TabTop" :data="TabBody"  style="margin-top:10px" ></i-table> 
         <div style="textAlign:right;margin-top:10px">
             <Page   :total.sync="PageSize"  :current.sync="formItem.pageNum"  :pageSize="formItem.pageSize"     show-elevator></Page>
         </div>
      </div>
       <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->
  </div>
</template>
<script>
import Toptitle from "./Toptitle";
import { getDate,getDateTime,getDateTime0 } from "../js/public.js";
export default {
  data() {
    return {
      spinShow: false,
      self: this,
      TabBody: [],
      PageSize: 0,
      TabTop: [
        {
          title: "订单号",
          key: "orderNo",
          align: "center"
        },
        {
          title: "产品名称",
          key: "productName",
          align: "center"
        },
        {
          title: "订单类型",
          key: "apiTypeName",
          align: "center",
          render(h, params){
            if (params.row.apiType == "TONGYOU") {
              return "同游平台";
            } else {
              return "智游宝";
            }
          }
        },
        {
          title: "套餐名称",
          key: "packageName",
          align: "center",
        },
        {
          title: "订单数量",
          key: "buySum",
          width: 95,
          align: "center",
        },
        {
          title: "验票码",
          key: "checkCode",
          align: "center",
        },
        {
            title: "电子票状态",
            key: "status",
            align: "center",
            render: (h, params) => {
                if (params.row.status == 0) {
                    return "初始/未验票";
                } else if(params.row.status == 1) {
                    return "已验票"
                } else if(params.row.status == 2) {
                    return "已取消"
                }
            }
        },
        {
          title: "验票时间",
          key: "checkTime",
          align: "center",
          render(h, params) {
            return getDateTime0(params.row.checkTime);
          }
        },
      ],
      Title: "票务管理",
      status: " ",
      formItem: {
        payType: " ",
        orderNo: null,
        productName: null,
        apiTypeName: null,
        checkTimeStart: null,
        checkTimeEnd: null,
        payTimeStartEed: null,
        pageSize: 10,
        pageNum: 1
      },
      cityList: []
    };
  },
  methods: {
    first() {
      this.spinShow = true;
      let {
        pageNum,
        checkTimeStart,
        checkTimeEnd,
        orderNo,
        productName,
        apiTypeName,
      } = this.formItem;

      let data = {};
      data.pageNum = pageNum;
      data.checkTimeStart = checkTimeStart;
      data.checkTimeEnd = checkTimeEnd;
      console.log(checkTimeStart);
      data.orderNo = orderNo;
      data.productName = productName;
      if(apiTypeName == "同游平台"){
        data.apiType = "TONGYOU";
      }else if(apiTypeName == "智游宝"){
        data.apiType = "ZYB";
      }
      this.axios
        .get(`${this.AjaxUrl}/ty_business/order/ticket/getList`, {
          params: data
        })
        .then(res => {
          if (res.errorCode == 200) {
            this.TabBody = res.data.list;
            this.PageSize = res.data.total;
          } else {
            this.$Message.error(res.message);
          }
          this.spinShow = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    grabble() {
      if (this.formItem.payTimeStartEed[0] != "") {
        this.formItem.checkTimeStart = getDate(this.formItem.payTimeStartEed[0]);
        this.formItem.checkTimeEnd = getDateTime(this.formItem.payTimeStartEed[1]);
      }
      console.log(this.formItem.checkTimeStart);
      this.formItem.pageNum = 1;
      this.first();
      this.formItem.checkTimeStart = null;
      this.formItem.checkTimeEnd = null;
    }
  },
  watch: {
    "formItem.pageNum": {
      handler: function(val, oldVal) {
        this.first();
      },
      deep: true
    }
  },
  mounted() {
    this.first();
  },
  components: {
    Toptitle
  }
};
</script>
<style  leng="scss">
.updataimg {
  border-radius: 4px;
  width: 100px;
  height: 100px;
  background: red;
  position: relative;
  cursor: pointer;
  margin-right: 30px;
  float: left;
  overflow: hidden;
}

.updataimg img {
  width: 100%;
}

.uploading input[type="file"] {
  width: 100px;
  height: 100px;
  padding: 0;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
}

.uploading {
  position: relative;
  width: 118px;
  height: 118px;
  margin-right: 30px;
  display: block;
  width: 100%;
  margin-bottom: 10px !important;
}
.laber16 {
  display: inline-block;
  width: 16%;
  text-align: left;
}
</style>


