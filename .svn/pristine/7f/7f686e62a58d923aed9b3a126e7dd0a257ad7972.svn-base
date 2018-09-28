<template>
<div>
   <Title :Title="Title" />
   <div  style="padding:0 20px">
        <h2>&nbsp; 账户金额</h2>
        <div style="margin:15px 0;font-size:16px;">
            <Row>
                <Col span="8">&nbsp; 账户总金额：{{balance}}元 </Col>
                <Col span="8">&nbsp; 可用余额：{{validBalance}}元</Col>
                <Col span="8">&nbsp; 冻结金额：{{freezonBalance}}元</Col>
            </Row>
        </div>
    <div>    
      
  </div>
    <h2>&nbsp; 流水明细</h2>
    <!-- <Row style="margin:10px 0;">
        <Col span="12">
            <label for=""> &nbsp;&nbsp; 产品名称</label>
            <Input v-model="formItem.productName" placeholder="请输入产品名称" style="width: 300px;margin-right:5px;"></Input>
            <Button type="success" @click="grabble">搜&nbsp;&nbsp;&nbsp;&nbsp;索</Button>
        </Col>
    </Row> -->
    <i-table   border  :content="self"   :columns="TabTop" :data="TabBody"  style="margin-top:10px" ></i-table>
   </div>
   <div style="textAlign:right;margin-top:10px;padding:0 20px">
      <Page   :total.sync="total"    :current.sync="pageNum"  :pageSize="pageSize"     show-elevator></Page>
   </div>
</div>
</template>
<script>
import Title from "./Toptitle";
import { getDate, getDateTime0, AjaxUrl } from "../js/public.js";

export default {
  data() {
    return {
      formItem: {
        queryParam: "",
        orderNo: "",
        Time: ""
      },
      self: this,
      balance: null,
      validBalance: null,
      freezonBalance: null,
      pageSize: 10,
      pageNum: 1,
      pageNo: 1,
      total: 0,
      TabTop: [
        {
          title: "产品名称",
          key: "productName",
          align: "center",
        },
        {
          title: "代理商名称",
          key: "companyName",
          align: "center",
        },
        {
          title: "订单号",
          key: "orderNo",
          align: "center"
        },
        {
          title: "流水总金额（元）",
          key: "amount",
          align: "center"
        },
        {
          title: "入账冰洁金额（元）",
          key: "freezeAmount",
          align: "center"
        },
        {
          title: "入账可用金额（元）",
          key: "validAmount",
          align: "center"
        },
        {
          title: "入账时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            return getDateTime0(params.row.createTime);
          }
        },
      ],
      TabBody: [],
      Title: "我的账户",
    };
  },
  components: {
    Title,
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
    first() {
      let data = {};
      data.pageNum = this.pageNum;
      this.axios
        .get(`${this.AjaxUrl}/ty_business/user/account/bill/getList`, {
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
      this.axios
        .post(`${this.AjaxUrl}/ty_business/user/account/myAccount`,)
        .then(res => {
            if(res.errorCode == 200){
                this.balance = res.data.balance;
                this.freezonBalance = res.data.freezonBalance;
                this.validBalance = res.data.validBalance;
            }
        })
        .catch(err => {
          console.log(err);
        });
    this.first();
  }
};
</script>

<style>

</style>
