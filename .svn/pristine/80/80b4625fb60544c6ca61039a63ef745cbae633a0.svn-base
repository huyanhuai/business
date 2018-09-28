<template>
  <div>
      <Toptitle :Title="Title" />
      <div style="padding:0 20px;">
      <Row>
        <Col span="8">
              <label for="" class="laber16" >产品名称</label>
              <Input v-model="formItem.productName" placeholder="请输入产品名称" style="width: 300px"></Input>
        </Col>
        <Col span="8">
              <label for="" class="laber16">订单号</label>
              <Input v-model="formItem.orderNo" placeholder="请输入订单号" style="width: 300px"></Input>
        </Col>
        <Col span="8">
          <label for="" class="laber16">状态</label>
              <Select v-model="formItem.status" style="width:300px">
                <Option v-for="item in cityList"   :value="item.dictValue" :key="item.systemDictId">{{ item.dictExplain }}</Option>
              </Select>
        </Col>
        </Row>
      <Row style="margin-top:10px;">
        <Col span="8">
              <label for="" class="laber16">订单类型</label>
              <Input v-model="formItem.apiTypeName" placeholder="请输入订单类型" style="width: 300px"></Input>
        </Col>
        <Col span="8">
              <label for="" class="laber16">支付时间</label>
              <DatePicker   placement="bottom-end" type="daterange" v-model="formItem.payTimeStartEed" placeholder="请输入支付时间" style="width: 300px"></DatePicker>
        </Col>
        <Col span="8">
          <label for="" class="laber16">支付方式</label>
              <Select v-model="formItem.payType" style="width:300px">
                <Option v-for="item in paymentmethodList"   :value="item.label" :key="item.label">{{ item.value }}</Option>
              </Select>
        </Col>
        </Row>
        <p  style="textAlign:center;margin-top:10px">
            <Button type="success" @click="grabble">搜&nbsp;&nbsp;&nbsp;&nbsp;索</Button>
        </p> 
         <i-table   border  :content="self"  :columns="TabTop" :data="TabBody"  style="margin-top:10px" ></i-table> 
         <div style="textAlign:right;margin-top:10px">
             <Page   :total.sync="PageSize"  :current.sync="formItem.pageNum"  :pageSize="formItem.pageSize"     show-elevator></Page>
         </div>
      </div>
       <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->
  </div>
</template>
<script>
import Toptitle from "./Toptitle";
import { add0, getDate } from "../js/public.js";
export default {
  data() {
    return {
      spinShow: false,
      paymentmethodList: [
        { label: " ", value: "全部" },
        { label: "ALIPAY", value: "App支付宝支付" },
        { label: "WECHAT", value: "微信支付" },
        { label: "UNIONPAY", value: "银联支付" }
      ],
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
          title: "商品价格",
          key: "amount",
          align: "center",
          render(h, params) {
            return params.row.orderPrice + "元";
          }
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
          title: "支付金额",
          key: "payAmount",
          align: "center",
          render(h, params) {
            return params.row.payAmount + "元";
          }
        },
        {
          title: "支付方式",
          key: "payType",
          align: "center",
          render(h, params) {
            if (params.row.payType == "ALIPAY") {
              return "App支付宝支付";
            } else if(params.row.payType == "WECHAT"){
              return "微信支付";
            } else if(params.row.payType == "UNIONPAY"){
              return "银联支付"
            } else if(params.row.payType == "WECHAT_PUBLIC"){
              return "公众号"
            } else if(params.row.payType == "ACTIVITY"){
                return "活动"
            }
          }
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            for (let i of this.cityList) {
              if (i.dictValue == params.row.status) {
                return i.dictExplain;
              }
            }
            if(params.row.status == "INVALID_TICKET") {
              return "已过期"
            }
          }
        },
        {
          title: "佣金结算状态",
          key: "name",
          align: "center",
          render(h, params) {
            if (params.row.settlementStatus == 1) {
              return "佣金冻结";
            } else if (params.row.settlementStatus == 2) {
              return "佣金解冻";
            } else {
              return "无佣金";
            }
          }
        },
        {
          title: "用户姓名",
          key: "nickName",
          align: "center",
        },
        {
          title: "手机号",
          key: "mobile",
          align: "center",
        },
        {
          title: "下单时间",
          key: "createTime",
          align: "center",
          render(h, params) {
            return getDate(params.row.createTime);
          }
        }
      ],
      Title: "订单管理",
      status: " ",
      formItem: {
        payType: " ",
        orderNo: null,
        status: " ",
        productName: null,
        apiTypeName: null,
        createTimeStart: null,
        createTimeEnd: null,
        payTimeStartEed: null,
        apiOrderNo: null,

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
        createTimeStart,
        status,
        createTimeEnd,
        orderNo,
        payType,
        productName,
        apiTypeName,
        apiOrderNo,
      } = this.formItem;

      let data = {};
      data.pageNum = pageNum;
      data.createTimeStart = createTimeStart;
      data.createTimeEnd = createTimeEnd;
      data.orderNo = orderNo;
      data.productName = productName;
      console.log(apiTypeName);
      if(apiTypeName == "同游平台"){
        data.apiType = "TONGYOU";
      }else if(apiTypeName == "智游宝"){
        data.apiType = "ZYB";
      }
      
      if (status != " ") {
        data.status = status;
      }
      if (payType != " ") {
        data.payType = payType;
      }
      this.axios
        .get(`${this.AjaxUrl}/ty_business/order/getList`, {
          params: data
        })
        .then(res => {
          if (res.errorCode == 200) {
            console.log(res.data);
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
        this.formItem.createTimeStart = getDate(this.formItem.payTimeStartEed[0]);
        this.formItem.createTimeEnd = getDate(this.formItem.payTimeStartEed[1]);
      }
      this.formItem.pageNum = 1;
      this.first();
      this.formItem.createTimeStart = null;
      this.formItem.createTimeEnd = null;
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
    this.axios
      .get(`${this.AjaxUrl}/ty_business/order/ticket/getList`, {
        params: {
        }
      })
      .then(res => {
        if (res.errorCode == 200) {
          console.log(res.data);
        } else {
          // this.$Message.error(res.message);
        }
      })
      .catch(err => {});
    this.first();

    this.axios
      .get(`${this.AjaxUrl}/ty_business/general/getDictByCode`, {
        params: {
          dictCode: "TY_ORDER_STATUS"
        }
      })
      .then(res => {
        if (res.errorCode == 200) {
          this.cityList = res.data;
        }
        this.cityList.unshift({ systemDictId: " ", dictExplain: "全部" ,dictValue: " "});
        console.log(this.cityList);
      })
      .catch(err => {});
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

