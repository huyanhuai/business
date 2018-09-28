<template> 
    <div>
    <Toptitle :Title="Title"  :list="list" />

        <Row style="padding:0 20px;">
            <Col span="8">
                 <label>票名</label>
                 <Input v-model="name" placeholder="请输入票名" style="width: 300px"></Input>
            </Col>
            <Col span="8">
                <label>票的种类</label>
                <Select v-model="type" style="width:200px">
                    <Option v-for="item in typelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="8">
                <label>状态</label>
                <Select v-model="state" style="width:200px">
                    <Option v-for="item in statelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
        </Row>

      <div style="text-align:center;margin-top:10px;" >
            <Button type="success"  @click="first">查&nbsp;&nbsp;&nbsp;&nbsp;询</Button>
      </div>
        <div style="padding:0 20px;">
            <i-table  border  :content="self"   :columns="E_order" :data="E_orderbody"  style="margin-top:10px" ></i-table>
        </div>
     
    </div>
</template>

<script>
import Toptitle from "../Toptitle";
export default {
  data() {
    return {
      self: this,
      E_order: [
        {
          title: "电子票名称",
          key: "name",
          align: "center",
          render(h, params) {
            return params.index + 1;
          }
        },
        {
          title: "产品描述",
          key: "name",
          align: "center",
          render(h, params) {
            return params.index + 1;
          }
        },
        {
          title: "类型",
          key: "name",
          align: "center",
          render(h, params) {
            return params.index + 1;
          }
        },
        {
          title: "订单(电子票)状态",
          key: "name",
          align: "center",
          render(h, params) {
            return params.index + 1;
          }
        }
      ],
      E_orderbody: [],
      name: "",
      type: " ",
      state: " ",
      typelist: [
        { value: " ", label: "所有类型" },
        { value: "1", label: "普通票" },
        { value: "2", label: "每天限时购买" }
      ],
      statelist: [
        { value: " ", label: "所有状态" },
        { value: "1", label: "已创建(已上架)" },
        { value: "2", label: "下架" }
      ],
      Title: "票务核销",
      list: "电子票管理"
    };
  },
  methods: {
    first() {
      console.log(11);
    }
  },
  components: {
    Toptitle
  }
};
</script>

<style>

</style>
