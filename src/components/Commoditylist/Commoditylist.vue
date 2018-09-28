<template>
  <div  class="Box_list">     
         <div  v-for="(list,index) of DataList"  :key="index"  style="width:49%; display:inline-block;margin-bottom:8px;">
             <div class="Commoditylist">
             <div >
             <p  v-if="list.status==1" :style="{ backgroundImage:`url( ${linkImg[0].src })` }" >
             {{list.productName}} 
             <span class="Bj_R"  @click="Editpackage(index)" >
               <img src="../../assets/Commodity/bianji.png" alt="" style="float: left;margin-top:8px;">
             </span>
             </p> 
             <p v-else :style="{ backgroundImage:`url( ${linkImg[1].src })` }" >
              {{list.productName}}
              <span class="Bj_R" @click="Editpackage(index)" >
                <img src="../../assets/Commodity/bianji.png" alt="" style="float: left;margin-top:8px;">
              </span>
             </p>        
             <div class="CommodityBody">
                 <div>
                     <p >产品编码</p> 
                     <p>{{list.productCode}}</p>
                 </div>
                 <div>
                      <p>产品分类</p>
                     <p>{{list.categoryName}}</p>
                 </div>
                 <div class="CommImg">
                     <img v-bind:src="pictureUrlSrc(list.pictureUrl)" alt="">
                 </div>
                 <!-- <p class="mar8">是否实名制</p>
                 <p class="mar8" v-if="list.isRealName==0">否</p>
                 <p class="mar8" v-else>是</p> -->
                 <div class="CommodityBottom">
                      <p>商品地址</p>
                      <p>{{list.provinceName}}{{list.cityName}}{{list.areaName}}</p>
                 </div>
                 
             </div>
             </div>
             <RightList  :mark="index" @Form="chang"  :status="list.status" @Num="statusNum(list.status)"/>
            <Spin size="large" fix v-if="spinShow"></Spin>
             </div>
         </div>
         <div style="clear:both"></div>
         <div style="display: flex;width:100%;">
            <div class="code" style="flex:1">
              <Button type="info" size="large" @click="Generatemothercode" style="background-color: rgb(82, 192, 199);">生成母码</Button>
            </div>
            <div style="text-align:right;flex:1;">
                <Page  :total="pageSize"  :current.sync="page"  :pageSize="Size"  show-elevator></Page>
            </div>  
         </div>

          <Modal
              v-model="modal1"
              title="生成母码"
              @on-ok="ok1"
              @on-cancel="cancel">
              <qrcode-vue 
                size="200" 
                :value="qrText" 
                :src="logo" 
                :bgColor="bgColor" 
                :fgColor="fgColor"
                style="text-align:center;"
              ></qrcode-vue>
              <!-- <vue-qr  :text="qrText" :logoSrc="userLogo" height="200" width="200"></vue-qr> -->
              <!-- <img src="http://image.tongyoutrip.com/default/defalut_busines_headimg.jpg" alt=""> -->
              <!-- <Qrcode  style="text-align:center;" :size="200"  :cls="qrCls" :value="qrText"></Qrcode> -->
          </Modal>     
        <!-- 套餐 -->
          <div v-show="Listshow" style="position: fixed;overflow: auto;top: 0;right: 0;bottom: 0;width:100%;height:100%;background: rgba(0,0,0,.5);z-index:90;">
            <transition  enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
              <MenuList  @Shutdown="changer" v-show="Listshow"  @close="close"   :TypeList="TypeList" ></MenuList>
            </transition>
          </div>
        <!-- 商品详情 -->
          <div v-show="packageShow" style="position: fixed;overflow: auto;top: 0;right: 0;bottom: 0;width:100%;height:100%;background: rgba(0,0,0,.5);z-index:90;">
            <transition  enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
              <PageAdd  v-show="packageShow"  :productId.sync="productIdList" :series="series"  @closechang="closechang"></PageAdd>
            </transition>
          </div>
          <!-- 上下架 删除   -->
          <Modal
            v-model="modelIndex"
            :title="ModelTitle"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>{{ModalText}}</p>
          </Modal>
          <!-- 海报弹框 -->
          <Modal
            v-model="poster"
            :title="ModelTitle"
            @on-cancel="cancel">
            <p style="text-align: center;">
              <div style="width:180px;height:225px;margin:0 auto;position: relative;border: 1px solid #DCDCDC;">
                  <img :src="PictureImg" style="width:180px;height:225px;">
                  <Spin size="large" fix v-show="spinShowImg"></Spin>
              </div>
              <div style="width:180px;margin:0 auto;position: relative;">
                <Upload
                    :before-upload="handleUpload"
                    action="//jsonplaceholder.typicode.com/posts/">
                    <Button type="ghost" icon="ios-cloud-upload-outline" style="width:180px;">上 传 海 报</Button>
                </Upload>
              </div>
              
            </p>
            <div slot="footer">
              <Button type="text" size="large" @click="addCancel">取消</Button>
              <Button type="primary" size="large" :loading="addLoading"  @click="addPoster">确认</Button>
            </div>
          </Modal>

        <div id="readingList">
          <!-- <h3>我是什么参数也不传的二维码</h3>
          <me-qrcode :qr-url='link1' :qr-size='200'></me-qrcode>
          <h3>我的中间显示的是logo https://hjm100.cn</h3> -->
          <!-- <me-qrcode :qr-url='link2' :qr-size='200' :qr-logo-size="40"  :qr-logo="userLogo"></me-qrcode> -->
          <!-- <h3>我的中间显示的是Text https://hjm100.cn</h3>
          <me-qrcode :qr-url='link3' :qr-size='150' :qr-text-size="16"  qr-text="你好鸿基梦"></me-qrcode> -->
      </div> 
  </div>
</template>

<script>
import meQrcode from "./me";
import RightList from "./RightList";
import MenuList from "./MenuList";
import PageAdd from "./PageAdd";
import Qrcode from "v-qrcode";
import QrcodeVue from 'qrcode.vue';
import VueQr from 'vue-qr';
import "animate.css";
import logo from '../../assets/login/logoback.png';

export default {
  props: {
    DataList: [Array, Object, JSON],
    pageSize: Number,
    numbers: Number,
    // page: Number
  },
  data() {
    return {
      spinShowImg:true,
      link1: "我是什么参数也不传的二维码",     // 二维码1
      link2: "我的中间显示的是logo ", // 二维码2
      link3: "我的中间显示的是Text ", // 二维码3
      size: 200,
      bgColor: '#000',
      fgColor: '#000',
      logo: logo,
      userLogo: "http://image.tongyoutrip.com/default/defalut_busines_headimg.jpg",
      businessUserId: "",
      modal1: false,
      qrCls: "qrcode",
      qrText: "",
      spinShow: false,
      editorContent: "",
      Title: "商品信息",
      // DataList: [],
      // pageSize: 0,
      pageNum: 1,

      auth_id: "",
      productIdList: 0,
      productId: "",
      productName: "",
      packageShow: false,
      modelIndex: false,
      poster: false,
      addLoading: false,
      PictureImg: require("../../assets/Home/a11.png"),
      imglist: "",
      ModelTitle: "警告",
      ModalText: "",
      linkImg: [
        { src: require("../../assets/Commodity/shangjia.png") },
        { src: require("../../assets/Commodity/xiajia.png") }
      ],
      page: 1,
      Size: 4,
      Listshow: false,
      TypeList: [],
      id: "",
      series: 0
    };
  },
  computed: {},
  watch: {
    page() {
      this.$emit("Page", { page: this.page, break: true });
    },
    // num() {
    //   this.page = this.numbers;
    // }
  },

  methods: {
    changer(res){
        this.Listshow=false;
    },
    closechang(res) {
      if (res) {
        this.packageShow = false;
      }
    },
    close(res) {
      this.Listshow = res;
    },
    success(text) {
      this.$Message.success(text);
    },
    pictureUrlSrc(Src) {
      return this.ImgUrl + Src + "_small.jpg";
    },
    chang(res) {
      let productId = this.DataList[res[0]].productId;
      console.log(res[1]);
      this.TypeList = [];
      let title = "";
      let type;
      var status = res[1];
      if (status == 1) {
        title = "查看二维码";
        let { productUrl } = this.DataList[res[0]];
        type = 1;
        this.TypeList.push({ title, productUrl, type, productId });
        this.Listshow = true;
      } else if (status == 2) {
        title = "新增套餐";
        type = 2;
        this.TypeList.push({ title, productId, type });
        this.Listshow = true;
      } else if (status == 3) {
        title = "定佣金";
        type = 3;
        this.TypeList.push({ title, productId, type });
        this.Listshow = true;
      } else if (status == 4) {
        this.TypeList.push({ title, type });
        this.productId = productId;
        let { status } = this.DataList[res[0]];
        this.ModelTitle = "上下架";
        this.ModalText =
          status == 1 ? "确认下架该商品吗?" : "确认上架该商品吗?";
        this.modelIndex = true;
      } else if (status == 6) {
        this.TypeList.push({ title, type });
        this.productId = productId;
        this.ModelTitle = "添加图片（比例：6 : 7.5）";
        this.getList();
        this.poster = true;
        this.addLoading = false;
      }else {
        this.TypeList.push({ title, type });
        this.productId = productId;
        this.ModelTitle = "删除商品";
        this.ModalText = "确认删除该商品吗";
        this.modelIndex = true;
      } 
    },
    Editpackage(index) {
      this.packageShow = true;
      this.productIdList = this.DataList[index].productId;
      this.series++;
    },
    ok1() {},

    //删除商品
    ok() {
      const title = "提示";
      let content = "";
      let url = "";
      if (this.ModalText == "确认删除该商品吗") {
        url = `${this.AjaxUrl}/ty_business/product/delete`;
      } else {
        url = `${this.AjaxUrl}/ty_business/product/putOrOutProduct`;
      }
      console.log(this.productId);
      this.axios
        .post(url, this.qs.stringify({ productId: this.productId, auth_id:this.auth_id }))
        .then(res => {
          if (this.ModalText == "确认删除该商品吗") {
            this.success(res.message);
            this.$emit("Page", { page: this.page, break: false });
          } else {
            content = res.message
            this.$Modal.warning({
              title: title,
              content: content,
              onOk: () => {
                this.$emit("Page", { break: true });
              }
            })  
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //产品详情 海报图片
    getList() {
       this.PictureImg = require("../../assets/Home/a11.png");
       this.spinShowImg = false;
       this.axios
        .get(`${this.AjaxUrl}/ty_business/product/getDetail`, {
          params: {
            productId: this.productId
          }
        })
        .then(res => {
          if(res.errorCode == 200){
            console.log(res.data.coverImg);
            this.spinShowImg = false;
            if(res.data.coverImg == null || res.data.coverImg == ""){
              this.PictureImg = require("../../assets/Home/a11.png");
            }else {
              this.PictureImg = this.ImgUrl + res.data.coverImg + '.jpg';
              this.imglist = res.data.coverImg;
            }
          }else{
            this.$Message.error(res.message);
          }
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    addCancel() {
      this.poster = false;
    },
    //海报弹框
    addPoster() {
        let data = {};
        data.productId = this.productId;
        data.coverImg = this.imglist;
        data.auth_id = this.auth_id;
        this.addLoading = true;
        this.axios
          .post(
            `${this.AjaxUrl}/ty_business/product/update`,
            this.qs.stringify(data)
          )
          .then(res => {
            if (res.errorCode == 200) {
              this.success(res.message);
              this.imglist = "";
              this.poster = false;
            }else{
              this.addLoading = false;
              this.$Message.error(res.message);
            }
          })
          .catch(err => {})  
    },
    //上传海报图片
    handleUpload(file) {
      this.spinShowImg = true;
      var reader = new FileReader();
      var _this = this;
      let data = new FormData();
      data.append("file", file);
      this.axios
        .post(`${this.AjaxUrl}/ty_business/upload`, data)
        .then(res => {
          if (res.errorCode == 200) {
            this.imglist = res.data;
            reader.readAsDataURL(file);
            reader.onload = function(e) {
              _this.PictureImg = this.result;
            };
            this.spinShowImg = false;
          }else{
            this.$Message.error("图片上传错误")
          }
        })
        .catch(err => {});
      return false;
    },
    cancel() {},
    // 母码二维码
    Generatemothercode() {
      // this.getUserInfo();
      const config = getCookie('token');
      this.axios
        .get(`${this.AjaxUrl}/ty_business/business/user/getMasterCode`, {})
        .then(res => {
          if (res.errorCode == 200) {
            this.qrText = res.data.info.url;
            this.modal1 = true;
          }else{
            this.$Message.error(res.message);
          }
        });
    },
    getUserInfo() {
      this.axios
        .get(`${this.AjaxUrl}/ty_business/business/user/getUserInfo`, )
        .then(res => {
          if (res.errorCode == 200) {
            this.userLogo = this.ImgUrl + res.data.headImg;
            console.log(this.userLogo);
          }else{
            this.$Message.error(res.message)
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.auth_id = this.$route.params.id;
    // this.page = this.numbers;
    // this.getUserInfo();
  },
  components: {
    RightList,
    MenuList,
    PageAdd,
    Qrcode,
    QrcodeVue,
    meQrcode,
    VueQr
  }
};
</script>

<style  lang="scss">
.CommodityTop{
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.ivu-select-dropdown{
  z-index: 13005;
}
// .code{
//   width: 100%;
// }
.code button{
  margin: 10px 0 0 20px;
}
.w-e-text-container{
  height: 350px !important;
}
.w-e-text img{
    width: 250px !important;
    height: 180px !important;   		
}
.Bj_R {
  float: right;
  line-height: 30px;
  width: 30px;
  cursor: pointer;
}

.p_p {
  width: 300px;
  height: 300px;
  background: red;
}

.Box_list > div {
  float: left;
  margin-right: 1%;
}
// .Box_list > div:nth-child(2) {
//   float: right;
// }
// .Box_list > div:nth-child(4) {
//   float: right;
// }
.Rigth_btn {
  width: 20% !important;
  border-top: 1px solid #eee !important;
  position: absolute;
  right: 0px;
  top: 0px;
  p {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
    cursor: pointer;
    background: #52c0c7;
    color: #fff;
    img {
      float: left;
      margin-top: 10px;
      margin-left: 10px;
      margin-right: 10px;
      width: 18px;
      height: 18px;
    }
  }
}
.mar8 {
  margin: 8px 0px;
  text-indent: 24px;
  
}
.CommodityBottom {
  p:nth-child(1) {
    width: 60%;
    padding-left: 24px;
    display: inline-block;
  }
  p:nth-child(2) {
    width: 39%;
    padding-right: 10px;
    display: inline-block;
  }
}
.Commoditylist {
  width: 100%;
  display: inline-block;
  position: relative;
  background-color: #fff;
  > div:nth-child(1) {
    display: inline-block;
    width: 80%;
    border: 1px solid #eee;
    > p:nth-child(1) {
      background-repeat: no-repeat;
      text-indent: 24px;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      background-position-y: 5px;
      border-bottom: 1px solid #eee;
    }
  }
}

.atrlist {
  background: #fff !important;
  color: #000 !important;
}

.CommodityBody {
  > div {
    > p {
      margin: 8px 0px;
    }
    p:nth-child(2) {
      color: #a4a4a4;
    }
  }
  > div:nth-child(1) {
    width: 60%;
    padding-left: 24px;
    display: inline-block;
  }
  > div:nth-child(2) {
    width: 39%;
    padding-right: 10px;
    text-align: right;
    display: inline-block;
  }
}

.CommImg {
  height: 140px;
  img {
    min-width: 53%;
    min-height: 140px;
    width: 140px;
    height: 140px;
    margin-left: 24px;
  }
}

.InputList {
  display: flex;
  background: #ffffff;
  div {
    flex: 1;
    margin: 4px 0;
    label {
      display: inline-block;
      width: 24%;
      text-align: right;
      // padding-right: 20px;
    }
  }
}


</style>
