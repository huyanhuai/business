<template>
  <div>    
      <Row>
        <Col span="8">
        &nbsp;
                  <!-- <label for="">订单编号</label>
                 <Input v-model="formItem.orderNo" placeholder="请输入订单号" style="width: 300px"></Input> -->
        </Col>
        <Col span="8">
                  <label for="">支付时间</label>
                 <DatePicker  v-model="formItem.Time" type="daterange" confirm  placement="bottom-end" placeholder="请输入创建时间" style="width: 300px"></DatePicker>
        </Col>
        <!-- <Col span="8">
          <label for="">关键字</label>
                <Input v-model="formItem.queryParam" placeholder="请输入商品名称或套餐名称" style="width: 300px"></Input>
        </Col> -->
    </Row>
        <p  style="textAlign:center;margin-top:10px">
          <Button type="success" @click="grabble">搜&nbsp;&nbsp;&nbsp;&nbsp;索</Button>
        </p>
  </div>
  
</template>

<script>
import { getDate, add0 } from "../../js/public.js";

export default {
  data() {
    return {
      formItem: {
        queryParam: "",
        orderNo: "",
        Time: ""
      },
      cityList: [
        {
          value: " ",
          label: "全部"
        },
        {
          value: "微信支付",
          label: "微信支付"
        }
      ]
    };
  },
  methods: {
    grabble() {    
      if (!this.formItem.Time) {
        this.formItem.Time[0] = getDate(this.formItem.Time[0]);
        this.formItem.Time[1] = getDate(this.formItem.Time[1]);
        this.checkTime();
      }
      // this.$emit("From", this.formItem);
    },
    checkTime() {
        this.formItem.Time[0] = getDate(this.formItem.Time[0]);
        this.formItem.Time[1] = getDate(this.formItem.Time[1]);
        var begintime = this.formItem.Time[0];
        var endtime = this.formItem.Time[0];
        if(!endtime){
            return true;
        }
        console.log(begintime);

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

    }
  },
  mounted() {}
};
</script>

<style>

</style>
