<template>
<div style="position:relative">
  <Toptitle :Title="Title" />
  <div style="margin:0 20px;">
  <div class="div_status">
      <span>上架</span>  
      <span>下架</span>      
  </div>
      <div style="margin:10px 0;">
        <Row>
        <Col span="8">
            <label for="" class="laber16" >产品名称</label>
            <Input v-model="productName" placeholder="请输入产品名称" style="width: 250px"></Input>
        </Col>
         <Col span="8">
            <label for="" class="laber16">上下架</label>
            <!-- <Input v-model="productCode" placeholder="请输入产品编码" style="width: 250px"></Input> -->
            <Select v-model="productCode" style="width:250px;">
                <Option  value="2" key="2" @click.native="grabble0()">全部</Option>
                <Option  value="1" key="1" @click.native="grabble('1')">上架</Option>
                <Option  value="0" key="0" @click.native="grabble('0')">下架</Option>
            </Select> 
        </Col>
        <Col span="3">
            <Button type="success" @click="grabble1">搜&nbsp;&nbsp;&nbsp;&nbsp;索</Button>
            <!-- <Button type="success" @click="grabble0" style="margin-left:15px;">全&nbsp;&nbsp;&nbsp;&nbsp;部</Button> -->
        </Col>
        </Row>
      </div>
      <div>
        <Commoditylist   @Page="Page" :pageSize="pageSize"  :DataList="DataList" />  
        <Spin size="large" fix v-if="spinShow"></Spin>
      </div>
      
  </div>
<!-- <router-view></router-view> -->

</div>

</template>

<script>
import Qrcode from "v-qrcode";
import E from "wangeditor";
import Toptitle from "./Toptitle";
import Commoditylist from "./Commoditylist/Commoditylist";

export default {
  data() {
    return {
      modal1: false,
      qrCls: "qrcode",
      qrText: "",
      spinShow: false,
      editorContent: "",
      Title: "商品信息",
      DataList: [],
      page: 1,
      pageSize: 0,
      pageNum: 1,
      productName: "",
      productCode: "",
      numbers: null
    };
  },
  components: {
    Toptitle,
    Commoditylist,
    Qrcode
  },
  methods: {
    ok() {},
    cancel() {},
    Generatemothercode() {
      this.axios
        .get(`${this.AjaxUrl}/ty_business/business/user/getMasterCode`, {})
        .then(res => {
          if (res.errorCode == 200) {
            this.qrText = res.data;
            console.log(res.data);
            this.modal1 = true;
          }
        });
    },
    Page(res) {
      if (res.break == false) {
        this.pageNum = res.page;
        this.first();
      } else {
        this.pageNum = res.page;
        this.first();
      }
      console.log(res);
      // for (let i in res) {
      //   if (i == "page") {
      //     this.pageNum = res[i];
      //     this.first();
      //   } else {
      //     if (res[i]) {
      //       this.first();
      //     } else {
      //       this.pageNum = 1;
      //       this.first();
      //     }
      //   }
      // }
    },
    grabble0() {
      this.pageNum = 1;
      // this.page = this.pageNum;
      this.productCode = "2";
      this.productName = "";
      this.first(); 
    },
    grabble1() {
      this.pageNum = 1;
      // this.page = this.pageNum;
      this.productCode = "";
      this.first(); 
    },
    grabble(status) {
      this.pageNum = 1;
      this.productCode = status;
      this.first();
      // this.page = this.pageNum;
    },
    first() {
      this.spinShow = true;
      let qs = require("qs");
      let data = {};
      if(this.productCode == "0" || this.productCode == "1") {
        data.status = this.productCode
      }
      data.productName = this.productName;
      data.pageNum = this.pageNum;
      data.pageSize = 4;
      this.axios
        .get(`${this.AjaxUrl}/ty_business/product/getList`, {
          params: data
        })
        .then(res => {
          if(res.errorCode == 200){
            this.DataList = res.data.list;
            this.pageSize = res.data.total;
            this.numbers = this.pageNum;
            this.spinShow = false;
            // this.productCode = "";
          }else if(res.errorCode == 303){
            this.$Message.error(res.message);
            this.$emit("Logins", false);
          }else{
            this.$Message.error(res.message);
          }
          
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.productCode = "";
    this.first();
  }
};
</script>

<style  lang="scss" scoped>
.code {
  height: 40px;
  width: 100%;
  margin: 0 auto;
  background: #eee;
  span {
    height: 100%;
    display: inline-block;
    width: 140px;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 6px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }
}

.div_status {
  width: 100%;
  height: 40px;
  line-height: 40px;
  span {
    display: inline-block;
    text-indent: 20px;
    background-image: url("../assets/Commodity/shangjia.png");
    background-repeat: no-repeat;
    background-position-y: 8px;
  }
  span:nth-child(2) {
    background-image: url("../assets/Commodity/xiajia.png");
  }
}
</style>
