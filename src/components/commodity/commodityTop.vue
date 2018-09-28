<template>
  <div>    
      <Row>
        <Col span="8">
                  <label for="">选择商家</label>
                             <Select v-model="formItem.productName" style="width:300px">
                <Option v-for="item in productNames" :value="item" :key="item">{{ item }}</Option>
              </Select>
        </Col>
        <Col span="8">
                  <label for="">选择供应商</label>
                <Select v-model="formItem.enterpriseName" style="width:300px">
                <Option v-for="item in merchants" :value="item" :key="item">{{ item }}</Option>
              </Select>
        </Col>
        <Col span="8">
          <label for="">状态</label>
              <Select v-model="formItem.status" style="width:300px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
        </Col>
    </Row>

                <p  style="textAlign:center;margin-top:10px">
                <Button type="success" @click="grabble">搜&nbsp;&nbsp;&nbsp;&nbsp;索</Button>
            </p>
  </div>
  
</template>

<script>
//import { getDate, add0 } from "../../js/public.js";

export default {
  props: {
    merchants: Array,
    productNames: Array
  },
  data() {
    return {
      formItem: {
        productName: "",
        enterpriseName: "",
        status: ""
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
      this.$emit("From", this.formItem);
    }
  },
  mounted() {}
};
</script>

<style>

</style>
