<template>
<div>
  <Toptitle :Title="Title" />
  <div style="margin:0 20px">
      <commodityTop    @From="chang"  :merchants="merchants"  :productNames="productNames" />
    <i-table    border  :content="self"   :columns="TabTop" :data="TabBody"  style="margin-top:10px" ></i-table>
  </div>
          <Modal v-model="modal2" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>{{hinttext}}</span>
        </p>
        <div style="text-align:center">
            <!-- <p>After this task is deleted, the downstream 10 tasks will not be implemented.</p>
            <p>Will you delete it?</p> -->
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="del">确认</Button>
        </div>
    </Modal>
</div>
</template>
<script>
import Toptitle from "./Toptitle";
import commodityTop from "./commodity/commodityTop";
import { getDate, add0, AjaxUrl } from "../js/public";

export default {
  data() {
    return {
      self: this,
      id: "",
      status: "",
      hinttext: "",
      modal2: false,
      modal_loading: false,
      merchants: [],
      productNames: [],
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
          title: "商家",
          key: "productName",
          align: "center"
        },
        {
          title: "供应商",
          key: "enterpriseName",
          align: "center"
        },
        {
          title: "状态",
          key: "name",
          align: "center",
          render(h, params) {
            var Text = "";

            if (params.row.status == 1) {
              Text = "上架";
            } else {
              Text = "下架";
            }
            return Text;
          }
        },
        {
          title: "平台价",
          key: "name",
          align: "center",
          render(h, params) {
            return params.row.saleAmount + "元";
          }
        },
        {
          title: "操作",
          key: "name",
          align: "center",
          render: (h, params) => {
            let Text = "";
            if (this.TabBody[params.index].status == "1") {
              this.hinttext = "确认下架该商品吗";
              Text = "下架";
            } else {
              this.hinttext = "确认上架该商品吗";
              Text = "上架";
            }
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.id = this.TabBody[params.index].id;
                      this.status = this.TabBody[params.index].status;
                      if (this.modal2) {
                        this.modal2 = false;
                      } else {
                        this.modal2 = true;
                      }
                    }
                  }
                },
                Text
              )
            ]);
          }
        }
      ],
      TabBody: [],
      Title: "商品管理"
    };
  },
  components: {
    Toptitle,
    commodityTop
  },
  methods: {
    chang(res) {
      let { enterpriseName, productName, status } = res;
      this.first(enterpriseName, productName, status);
    },
    first(enterpriseName = "", productName = "", status = "") {
      let qs = require("qs");
      let data = [];
      data.push({ enterpriseName, productName, status });
      this.axios
        .post(`${AjaxUrl}/tyms/agent/getMyProduct.do`, qs.stringify(data[0]))
        .then(res => {
          if (this.merchants == "") {
            this.merchants = res.data.attributes.merchants;
            // this.merchants.unshift('全部')
          }
          if (this.productNames == "") {
            
            this.productNames = res.data.attributes.productNames; 
            // this.productNames.unshift('全部')
            console.log(this.productNames)
          }

          this.TabBody = res.data.obj;
        })
        .catch(err => {
          console.log(err);
        });
    },
    del() {
      this.modal_loading = true;
      let qs=require('qs');
      this.axios
        .post(`${AjaxUrl}/agent/back/tymallProduct/changeStatus.do`, qs.stringify({id:this.id,status:this.status}) )
        .then(res => {
          setTimeout(
            () => {
              this.modal_loading = false;
              this.modal2 = false;
              this.$Message.success(res.data.msg);
               this.first();
            }, 1000
          );
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

<style>

</style>
