<template>
<div>
  <Toptitle  :Title="Title"/>
  <div style="margin:0 20px">
      <div>
          <Row>
              <Col  span="16">
                 <label for="">起止时间&nbsp;&nbsp; </label>
                 <DatePicker  v-model="Time" type="daterange" confirm  placement="right-start" placeholder="请输入起止时间" style="width: 300px"></DatePicker> 

                  <Select v-model="TypeCode" style="width:200px;margin-left:40px;">
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>          
              </Col>
          </Row>
      </div>

      <div style="text-align:center;margin-top:20px;" >
            <Button type="success"  @click="first">查&nbsp;&nbsp;&nbsp;&nbsp;询</Button>
      </div>
      <div  id="ec_div"  style="height:400px;margin-top:20px"></div>
  </div>
</div>

</template>

<script>
import Toptitle from "./Toptitle";
import echarts from "echarts";
import { getDate, add0, AjaxUrl } from "../js/public.js";

export default {
  data() {
    return {
      Title: "统计分析",
      Time: [],
      TypeCode: "商品排名",
      cityList: [
        {
          value: "代理商排名",
          label: "代理商排名"
        },
        {
          value: "商品排名",
          label: "商品排名"
        }
      ]
    };
  },
  components: {
    Toptitle
  },
  computed: {
    Urlcode: function() {
      if (this.TypeCode == "代理商排名") {
        return "/ty_business/report/getAgentRank";
      } else {
        return "/ty_business/report/getProductRank";
      }
    }
  },
  methods: {
    first() {
      let data = {};
      if (this.Time == "") {
        data.startTime = getDate();
        data.endTime = getDate();
      } else {
        data.startTime = getDate(this.Time[0]);
        data.endTime = getDate(this.Time[1]);
      }
      this.axios
        .get(`${this.AjaxUrl}${this.Urlcode}`, data)
        .then(res => {
          let name = [];
          let Vaule = [];
          let text="";
          console.log(res)
          if(this.TypeCode=='代理商排名'){
            text='销量排名前10的代理商'
          }else{
            text='销量排名前10的商品'
          }
          var data = res.data;
          for (let i of data) {
            name.push(i.productName);
            Vaule.push(i.count);
          }

          ec(name, Vaule,text);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.first();
  }
};

function ec(name, data,text) {
  var myChart = echarts.init(document.getElementById("ec_div"));
  myChart.setOption({
    title: {
      text: text,
      x: "center",
      textStyle: {
        fontSize: 16
      }
    },
    xAxis: {
      data: name
    },
    tooltip: {
      show: true
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        barMaxWidth: 200,
        data: data,
        itemStyle: {
          normal: {
            color: "#52c0c7"
          }
        }
      }
    ]
  });
}
</script>

<style>

</style>
