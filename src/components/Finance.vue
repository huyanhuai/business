<template>
<div>
   <Title :Title="Title" />
   <div  style="padding:0 20px">
    <!-- <FinanceTop  @From="chang" /> -->
    <div>    
      <Row>
        <Col span="8">
        &nbsp;
        </Col>
        <Col span="8" style="text-align: center;">
                  <label for="">支付时间</label>
                 <DatePicker  v-model="formItem.Time" type="daterange" confirm  placement="bottom-end" placeholder="请输入创建时间" style="width: 300px;margin-left:10px;"></DatePicker>
        </Col>
    </Row>
        <p  style="textAlign:center;margin-top:10px">
          <Button type="success" @click="grabble">搜&nbsp;&nbsp;&nbsp;&nbsp;索</Button>
        </p>
  </div>
    <div style="margin-top:10px;text-align:right">
       <Button   @click="Excel" type="primary" icon="ios-search">导出Excel</Button>
    </div>
    <i-table ref="table"   :loading="loading"   border  :content="self"   :columns="TabTop" :data="TabBody"  style="margin-top:10px" ></i-table>
    <Switch    v-model="loading"></Switch>
   </div>
   <div style="textAlign:right;margin-top:10px;padding:0 20px">
      <Page   :total.sync="total"    :current.sync="pageNum"  :pageSize="pageSize"     show-elevator></Page>
   </div>
</div>
  
    
</template>

<script>
import Title from "./Toptitle";
import FinanceTop from "./Finance/FinanceTop";
import { getDate, add0, AjaxUrl } from "../js/public.js";

export default {
  data() {
    return {
      formItem: {
        queryParam: "",
        orderNo: "",
        Time: ""
      },
      self: this,
      loading: false,
      pageSize: 10,
      pageNum: 1,
      pageNo: 1,
      total: 0,
      TabTop: [
        {
          title: "订单数量",
          key: "orderCount",
          align: "center",
        },
        {
          title: "订单金额",
          key: "orderPrice",
          align: "center",
          render: (h, params) => {
            return params.row.orderPriceSum + "元";
          }
        },
        {
          title: "结算价",
          key: "settlementPriceSum",
          align: "center",
          render: (h, params) => {
            return params.row.settlementPriceSum + "元";
          }
        },
        {
          title: "订单时间",
          key: "checkDate",
          align: "center"
        },
      ],
      TabBody: [],
      Title: "财务管理",
      orderNo: null,
      queryParam: null,
      payTimeStart: null,
      payTimeEnd: null
    };
  },
  components: {
    Title,
    FinanceTop
  },
  methods: {
    grabble() {    
      if (this.formItem.Time[0] != "") {
        this.formItem.Time[0] = getDate(this.formItem.Time[0]);
        this.formItem.Time[1] = getDate(this.formItem.Time[1]);
        console.log(this.formItem.Time[0]);
        this.checkTime();
      }
      this.pageNum = 1;
      this.first();
      this.formItem.Time[0] = null;
      this.formItem.Time[1] = null;
    },
    checkTime() {
        this.formItem.Time[0] = getDate(this.formItem.Time[0]);
        this.formItem.Time[1] = getDate(this.formItem.Time[1]);
        var begintime = this.formItem.Time[0];
        var endtime = this.formItem.Time[1];
        if(!endtime){
            return true;
        }
        console.log(begintime);
        console.log(endtime);

//        把日期转化为毫秒数
        var time1 = new Date(begintime).getTime();
        var time2 = new Date(endtime).getTime();

        //判断时间跨度是否大于3个月
        var arr1 = begintime.split('-');
        var arr2 = endtime.split('-');
        arr1[1] = parseInt(arr1[1]);
        arr1[2] = parseInt(arr1[2]);
        arr2[1] = parseInt(arr2[1]);
        arr2[2] = parseInt(arr2[2]);
        var flag = true;
        if(arr1[0] == arr2[0]){//同年
            if(arr2[1]-arr1[1] > 3){ //月间隔超过3个月
                flag = false;
            }else if(arr2[1]-arr1[1] == 3){ //月相隔3个月，比较日
                if(arr2[2] > arr1[2]){ //结束日期的日大于开始日期的日
                    flag = false;
                }
            }
        }else{ //不同年
            if(arr2[0] - arr1[0] > 1){
                flag = false;
            }else if(arr2[0] - arr1[0] == 1){
                if(arr1[1] < 10){ //开始年的月份小于10时，不需要跨年
                    flag = false;
                }else if(arr1[1]+3-arr2[1] < 12){ //月相隔大于3个月
                    flag = false;
                }else if(arr1[1]+3-arr2[1] == 12){ //月相隔3个月，比较日
                    if(arr2[2] > arr1[2]){ //结束日期的日大于开始日期的日
                        flag = false;
                    }
                }
            }
        }
        if(!flag){
            alert("时间跨度不得超过3个月！");
            return false;
        }
        return true;

    },
    chang(res) {
      let { orderNo, queryParam, Time } = res;
      let payTimeStart = Time[0];
      let payTimeEnd = Time[0];
      this.orderNo = orderNo;
      this.queryParam = queryParam;
      this.payTimeStart = payTimeStart;
      this.payTimeEnd = payTimeEnd;
      this.pageNum = 1;
      this.first();
    },
    Excel() {
      // let url = `${this.AjaxUrl}/jw/fxmall/order/financialManagementToExcel.do?&appName=tyms&token=${getCookie('token')}`;

      // if (this.orderNo) {
      //   url += `&orderNo=${this.orderNo}`;
      // }
      // if (this.queryParam) {
      //   url += `&queryParam=${this.queryParam}`;
      // }
      // if (this.payTimeStart) {
      //   url += `&payTimeStart=${this.payTimeStart}`;
      // }
      // if (this.payTimeEnd) {
      //   url += `&payTimeEnd=${this.payTimeEnd}`;
      // }
      // location.href = url;
      let data = {};
      console.log(this.formItem.Time[0] == "" || this.formItem.Time[0] == null);
      if(this.formItem.Time[0] == "" || this.formItem.Time[0] == null){
        let url = `${this.AjaxUrl}/ty_business/report/financialStatementsDownload?&token=${getCookie('token')}`;
        window.open(url);   
      }else{
        data.checkTimeStart = getDate(this.formItem.Time[0]);
        data.checkTimeEnd = getDate(this.formItem.Time[1]);
        console.log(data.checkTimeStart);
        let url = `${this.AjaxUrl}/ty_business/report/financialStatementsDownload?&token=${getCookie('token')}&checkTimeStart=${getDate(this.formItem.Time[0])}&checkTimeEnd=${getDate(this.formItem.Time[1])}`;
        window.open(url);
      }
      // this.axios
      //   .get(`${this.AjaxUrl}/ty_business/report/financialStatementsDownload`, {
      //     params: {
      //       data
      //   }
      //   })
      //   .then(res => {
      //     let url = `${this.AjaxUrl}/ty_business/report/financialStatementsDownload?&token=${getCookie('token')}`;
      //     window.open(url); 
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    first() {
      let data = {};
      // data.orderNo = this.orderNo;
      // data.queryParam = this.queryParam;
      // data.payTimeStart = this.payTimeStart;
      // data.payTimeEnd = this.payTimeEnd;
      data.checkTimeStart = this.formItem.Time[0];
      data.checkTimeEnd = this.formItem.Time[1];
      data.pageNum = this.pageNum;
      this.axios
        .get(`${this.AjaxUrl}/ty_business/report/financialStatements`, {
          params: data
        })
        .then(res => {
          if (res.errorCode == 200) {
            this.total = res.data.total;
            this.TabBody = res.data.list;
          } else if (res.errorCode == 2001) {
            this.$emit("Logins", "login");
            deleteCookie("token");
          } else {
            this.$Message.error(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    pageNo() {
      this.first();
    }
  },
  mounted() {
    this.first();
  }
};
</script>

<style>

</style>
