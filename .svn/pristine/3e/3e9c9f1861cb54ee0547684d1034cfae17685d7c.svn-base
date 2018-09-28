<template>
    <div>
  <Toptitle  :Title="Title" :list="list"/>
  <div style="margin:0 20px">
    <condition @From="chang" />  
    <i-table    border  :content="self"   :columns="TabTop" :data="TabBody"  style="margin-top:10px" ></i-table>
  </div>
</div>

</template>

<script>
import Toptitle from "./Toptitle";
import condition from "./commission/condition";
import { getDate, add0, AjaxUrl } from "../js/public.js";

export default {
  data() {
    return {
      self: this,
      TabTop: [
        {
          title: "序号",
          key: "name",
          align: "center",
          render(h, params) {
            return params.index + 1;
          }
        },
        {
          title: "订单编号",
          key: "orderNo",
          align: "center"
        },
        {
          title: "套餐名称",
          key: "name",
          align: "center",
          render(h, params) {
            return params.row.order.productName;
          }
        },
        {
          title: "平台价",
          key: "name",
          align: "center",
          render(h, params) {
            return (
              (params.row.order.amount / params.row.order.productNum).toFixed(
                2
              ) + "元"
            );
          }
        },
        {
          title: "佣金",
          key: "name",
          align: "center",
          render(h, params) {
            return params.row.commission.toFixed(2) + "元";
          }
        },
        {
          title: "创建时间",
          key: "name",
          align: "center",
          render(h, params) {
            return getDate(params.row.createTime);
          }
        }
      ],
      TabBody: [],
      Title: "佣金管理",
      list: "代理商佣金"
    };
  },
  methods: {
    chang(res) {
      let { Time, orderNo } = res;
      let startTime = Time[0];
      let endTime = Time[0];
      this.first(startTime, endTime, orderNo);
    },
    first(startTime = "", endTime = "", orderNo = "") {
      let qs = require("qs");
      let data = [];
      data.push({ orderNo, startTime, endTime });
      this.axios
        .post(`${AjaxUrl}/tyms/agent/getMyCommission.do`, qs.stringify(data[0]))
        .then(res => {
          this.TabBody = res.data.obj;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.first();
  },
  components: {
    Toptitle,
    condition
  }
};
</script>

<style>

</style>
