<template  lang="pug"> 
    div 
        Toptitle(:Title="Title")
        Row(style="padding:0 20px;") 
            Col(span="8")
                label 订单号&nbsp;&nbsp;&nbsp;
                Input(v-model="from.orderNo" placeholder="请输入订单号" style="width: 260px")
            Col(span="8")
                label 评价人手机&nbsp;&nbsp;&nbsp;
                Input(v-model="from.mobile" placeholder="请输入评价人手机" style="width: 260px")
            Col(span="8")
                label 产品名称&nbsp;&nbsp;&nbsp;
                Input(v-model="from.productName" placeholder="请输入产品名称" style="width: 260px")                                
        div(style="text-align:center;margin-top:10px;")      
            Button(type="success"  @click="first") 查    询
        div(style="padding:0 20px;")  
            i-table(border  :content="self"   :columns="TableTop" :data="TableBody"  style="margin-top:10px") 
        div(style="textAlign:right;margin-top:10px")
            Page(:total.sync="total"  :current.sync="from.pageNum"  :pageSize="pageSize"     show-elevator)

</template>

<script>
import Toptitle from "./Toptitle";
import { getDate, add0 } from "../js/public";
export default {
  data() {
    return {
      self: this,
      value: "",
      from: {
        orderNo: "",
        mobile: "",
        productName: "",
        pageNum: 1
      },
      TableTop: [
        {
          title: "订单号",
          key: "orderNo",
          align: "center"
        },
        {
          title: "评分",
          key: "score",
          align: "center"
        },
        {
          title: "评论内容",
          key: "commentContent",
          align: "center"
        },
        {
          title: "评论时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", getDate(params.row.createTime))
            ]);
          }
        },
        {
          title: "产品名称",
          key: "productName",
          align: "center"
        },
        {
          title: "套餐名称",
          key: "packageName",
          align: "center"
        },
        {
          title: "评论者昵称",
          key: "userName",
          align: "center"
        },
        {
          title: "评论者手机号",
          key: "mobile",
          align: "center"
        },
        {
          title: "回复内容",
          key: "revertContent",
          align: "center"
        },
        {
          title: "评论头像",
          key: "headImg",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Avatar", {
                props: {  
                  src: this.ImgUrl + params.row.headImg + '_small.jpg'
                }
              })
            ]);
          }
        },
        {
          title: "操作",
          key: "headImg",
          align: "center",
          render: (h, params) => {
            if (params.row.revertContent != null) {
              return false;
            }
            let productCommentId = params.row.productCommentId;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        onOk: () => {
                          let data = {};
                          data.productCommentId = productCommentId;
                          data.revertContent = this.value;
                          this.axios
                            .post(
                              `${
                                this.AjaxUrl
                              }/ty_business/product/comment/revert`,
                              this.qs.stringify(data)
                            )
                            .then(res => {
                              if (res.errorCode == 200) {
                                this.first();
                                this.$Message.success(res.message);
                              } else {
                                this.$Message.error(res.message);
                              }
                            });
                        },
                        render: h => {
                          return h("Input", {
                            props: {
                              type: "textarea",
                              value: this.value,
                              autofocus: true,
                              placeholder: "请输入回复信息"
                            },
                            on: {
                              input: val => {
                                this.value = val;
                              }
                            }
                          });
                        }
                      });
                    }
                  }
                },
                "回复"
              )
            ]);
          }
        }
      ],
      TableBody: [],
      orderNo: "",
      Title: "售后管理",
      total: 0,
      pageSize: 10
    };
  },
  watch: {
    "form.pageNum": {
      handel: function(val, oval) {
        this.first();
      },
      deep: true
    }
  },
  methods: {
    first() {
      let data = this.from;
      this.axios
        .get(`${this.AjaxUrl}/ty_business/product/comment/getList`, {
          params: data
        })
        .then(res => {
          if (res.errorCode == 200) {
            this.TableBody = res.data.list;
            this.total = res.data.total;
          } else {
            this.$Message.error(res.message);
          }
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
    Toptitle
  }
};
</script>

<style>

</style>
