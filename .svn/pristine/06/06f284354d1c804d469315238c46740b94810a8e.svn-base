<template>
<div style="position:relative">
  <Toptitle :Title="Title" />
  <div style="margin:0 20px">
  <div class="div_status">
      <span>上架</span>  
      <span>下架</span>      
  </div>
      <Commoditylist   @Page="Page" :pageSize="pageSize"   :DataList="DataList" />  
  </div>
  <div class="code">
        <span @click="Generatemothercode">生成母码</span>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  

    <Modal
        v-model="modal1"
        title="生成母码"
        @on-ok="ok"
        @on-cancel="cancel">
        <Qrcode  style="text-align:center;" :size="200"  :cls="qrCls" :value="qrText"></Qrcode>
    </Modal>
<router-view></router-view>
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
      pageSize: 0,
      pageNum: 1
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
            this.modal1 = true;
          }
        });
    },
    Page(res) {
      if (res.break) {
        this.first();
      } else {
        this.pageNum = 1;
        this.first();
      }
      console.log(res);
      for (let i in res) {
        if (i == "page") {
          this.pageNum = res[i];
          this.first();
        } else {
          if (res[i]) {
            this.first();
          } else {
            this.pageNum = 1;
            this.first();
          }
        }
      }
    },
    first() {
      this.spinShow = true;
      let qs = require("qs");
      this.axios
        .get(`${this.AjaxUrl}/ty_business/product/getList`, {
          params: {
            pageNum: this.pageNum,
            pageSize: 2
          }
        })
        .then(res => {
          this.DataList = res.data.list;
          this.pageSize = res.data.total;
          this.spinShow = false;
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
