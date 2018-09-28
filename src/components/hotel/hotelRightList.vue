<template>
  <div>
        <div class="Rigth_btn" >
            <p @click="pitchlist(1)"  :class="{atrlist:sousuo}" id="p1">
                <img  :src="ListImg.sousuo[0].src" alt=""  v-if="sousuo">
                <img  :src="ListImg.sousuo[1].src" alt=""  v-else>
                二维码
            </p>
            <p @click="pitchlist(3)"  :class="{atrlist:fangjian}">
                <img  :src="ListImg.bianji[0].src" alt=""  v-if="fangjian">
                <img  :src="ListImg.bianji[1].src" alt=""  v-else>
                房&nbsp;&nbsp;&nbsp;&nbsp;间
            </p>
            <p @click="pitchlist(2)"  :class="{atrlist:bianji}">
                <img  :src="ListImg.bianji[0].src" alt=""  v-if="bianji">
                <img  :src="ListImg.bianji[1].src" alt=""  v-else>
                套&nbsp;&nbsp;&nbsp;&nbsp;餐
            </p>
            <p @click="pitchlist(6)"  :class="{atrlist:tupian}">
                <img  :src="ListImg.yongjin[0].src" alt=""  v-if="tupian">
                <img  :src="ListImg.yongjin[1].src" alt=""  v-else>
                定佣金
            </p>
            <p @click="pitchlist(4)" :class="{atrlist:wenben}">
                <img  :src="ListImg.wenben[0].src" alt=""  v-if="wenben">
                <img  :src="ListImg.wenben[1].src" alt=""  v-else>
                {{shangjia}}
            </p>
            
            <p @click="pitchlist(5)" :class="{atrlist:shezhi}">
                <img  :src="ListImg.shezhi[0].src" alt=""  v-if="shezhi">
                <img  :src="ListImg.shezhi[1].src" alt=""  v-else>
                删&nbsp;&nbsp;&nbsp;&nbsp;除
            </p>
        </div>
  </div>
</template>

<script>
export default {
  props: {
    status: Number,
    mark: Number,
  },
  data() {
    return {
      bianji: true,
      fangjian: true,
      sousuo: true,
      shezhi: true,
      wenben: true,
      tupian: true,
      Identifying: [],
      shangjia: "",
      ListImg: {
        sousuo: [
          { src: require("../../assets/Commodity/sousuo.png") },
          { src: require("../../assets/Commodity/sousuo2.png") }
        ],
        bianji: [
          { src: require("../../assets/Commodity/bianji2.png") },
          { src: require("../../assets/Commodity/bianji3.png") }
        ],
        yongjin: [
          { src: require("../../assets/Commodity/yongjin.png") },
          { src: require("../../assets/Commodity/yongjin2.png") }
        ],
        wenben: [
          { src: require("../../assets/Commodity/wenben.png") },
          { src: require("../../assets/Commodity/wenben2.png") }
        ],
        shezhi: [
          { src: require("../../assets/Commodity/shezhi.png") },
          { src: require("../../assets/Commodity/shezhi2.png") }
        ]
      }
    };
  },
  watch: {
    status: function() {
      if(this.status == 1){
        this.shangjia = "下架";
      }else{
        this.shangjia = "上架";
      }
    }
  },
  methods: {
    // goF() {
    //   this.$router.push({path:'/Commoditylist/TaocanList'}) 
    // },
    pitchlist(n) {
      let Identifying = 0;
    //   let event = window.event || e;
     console.log(n); 
    //   let localName = event.target.tagName || event.srcElement.tagName;
    //   // let localName = event.toElement.localName || event.relatedTarget.localName;
    //   if (localName == "IMG") {
    //     console.log(localName);   
    //     return false;
    //   }
    //   let Text = event.target.innerText || event.srcElement.innerText;
      if (n == 1) {
        this.sousuo = false;
        this.bianji = true;
        this.fangjian = true;
        this.wenben = true;
        this.shezhi = true;
        this.tupian = true;
        Identifying = 1;
      } else if (n == 2) {
        this.sousuo = true;
        this.bianji = false;
        this.fangjian = true;
        this.wenben = true;
        this.shezhi = true;
        this.tupian = true;
        Identifying = 2;
      } else if (n == 3) {
        this.sousuo = true;
        this.bianji = true;
        this.fangjian = false;
        this.wenben = true;
        this.shezhi = true;
        this.tupian = true;
        Identifying = 3;
      } else if (n == 4) {
        Identifying = 4;
        this.sousuo = true;
        this.bianji = true;
        this.fangjian = true;
        this.wenben = false;
        this.shezhi = true;
        this.tupian = true;
      } else if (n == 5) {
        Identifying = 5;
        this.sousuo = true;
        this.bianji = true;
        this.fangjian = true;
        this.wenben = true;
        this.shezhi = false;
        this.tupian = true;
      } else if(n == 6){
        Identifying = 6;
        this.sousuo = true;
        this.bianji = true;
        this.fangjian = true;
        this.wenben = true;
        this.shezhi = true;
        this.tupian = false;
      }
      // if (Text == "二维码") {
      //   this.sousuo = false;
      //   this.bianji = true;
      //   this.fangjian = true;
      //   this.wenben = true;
      //   this.shezhi = true;
      //   this.tupian = true;
      //   Identifying = 1;
      // } else if (Text == "套    餐") {
      //   this.sousuo = true;
      //   this.bianji = false;
      //   this.fangjian = true;
      //   this.wenben = true;
      //   this.shezhi = true;
      //   this.tupian = true;
      //   Identifying = 2;
      // } else if (Text == "房    间") {
      //   this.sousuo = true;
      //   this.bianji = true;
      //   this.fangjian = false;
      //   this.wenben = true;
      //   this.shezhi = true;
      //   this.tupian = true;
      //   Identifying = 3;
      // } else if (Text == this.shangjia) {
      //   Identifying = 4;
      //   this.sousuo = true;
      //   this.bianji = true;
      //   this.fangjian = true;
      //   this.wenben = false;
      //   this.shezhi = true;
      //   this.tupian = true;
      // } else if (Text == "删    除") {
      //   Identifying = 5;
      //   this.sousuo = true;
      //   this.bianji = true;
      //   this.fangjian = true;
      //   this.wenben = true;
      //   this.shezhi = false;
      //   this.tupian = true;
      // } else if(Text == "定佣金"){
      //   Identifying = 6;
      //   this.sousuo = true;
      //   this.bianji = true;
      //   this.fangjian = true;
      //   this.wenben = true;
      //   this.shezhi = true;
      //   this.tupian = false;
      // }
      this.Identifying = [];
      this.Identifying.push(this.mark, Identifying);
      console.log(this.Identifying);
      console.log(Text);
      this.$emit("Form", this.Identifying);
    },
    sta() {
      if(this.status == 1){
        this.shangjia = "下架";
      }else{
        this.shangjia = "上架";
      }
    }
  },
  mounted() {
    this.sta();
  },
};
</script>

<style lang="scss" scoped>

</style>
