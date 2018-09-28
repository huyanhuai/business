<template>
  <div>    
      <Row>
        <Col span="8">
                  <label for="">订单编号</label>
                    <Input v-model="formItem.orderNo" placeholder="请输入订单编号" style="width: 300px"></Input>
        </Col>
        <Col span="8">
                  <label for="">创建时间</label>
                 <DatePicker  v-model="formItem.Time" type="daterange" confirm  placement="bottom-end" placeholder="请输入创建时间" style="width: 300px"></DatePicker>
        </Col>
    </Row>

              <p  style="textAlign:center;margin-top:10px">
                <Button type="success" @click="grabble">搜&nbsp;&nbsp;&nbsp;&nbsp;索</Button>
            </p>
  </div>
  
</template>

<script>
import { getDate, add0 } from "../../js/public.js";

export default {
  props: {
    merchants: Array,
    productNames: Array
  },
  data() {
    return {
      formItem: {
        orderNo: "",
        Time: ""
      },
      cityList: [
        {
          value: " ",
          label: "全部"
        },
        {
          value: "1",
          label: "上架"
        },
        {
          value: "2",
          label: "下架"
        }
      ]
    };
  },
  methods: {
    grabble() {
      if (!this.formItem.Time) {
        this.formItem.Time[0] = getDate(this.formItem.Time[0]);
        this.formItem.Time[1] = getDate(this.formItem.Time[1]);
      }
      this.$emit("From", this.formItem);
    }
  },
  mounted() {}
};
</script>

<style>

</style>
