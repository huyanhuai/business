<template>
  <div>    
      <div class="Body_div">
            <div>
                <label for="">关键字</label>
                 <Input v-model="formItem.queryParam" placeholder="代理名称,法人姓名,手机号" style="width: 300px"></Input>
            </div>
            <div>
                 <label for="">创建时间</label>
                 <DatePicker  v-model="formItem.Time" type="daterange" confirm  placement="bottom-end" placeholder="请输入创建时间" style="width: 300px"></DatePicker>
            </div>
            <div>
                 <label for="">状态</label>
                 <Select v-model="formItem.msCheckStatus" style="width: 300px">
                <Option value=" ">请选择</Option>
                <Option value="1">正常</Option>
                <Option value="2">屏蔽</Option>
            </Select>
            </div>


      </div>
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
        msCheckStatus: "",
        queryParam: "",
        Time: ""
      }
    };
  },
  methods: {
    grabble() {
      if (this.formItem.Time) {
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
.Body_div {
  display: flex;
}
.Body_div div {
  flex: 1;
}
</style>
