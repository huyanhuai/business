<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click="PreMonth(myDate,false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li">{{dateTop}}</li>
        <li @click="NextMonth(myDate,false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <div class="wh_content wh_contentW">
        <div class="wh_content_item" v-for="tag in textTop" style="height:40px;">
          <div class="wh_top_tag">
            {{tag}}
          </div>
        </div>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(item,index) in list" @click="clickDay(item,index)">
          <div class="wh_item_date" v-bind:class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{dayhui:item.huise==true},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday},{wh_chose_day:item.chooseDay},setClass(item)]">
            {{item.id}} 
          </div>
          <div class="wh_item_repertory" v-bind:class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{dayhui:item.huise==true},{wh_want_dayhide:item.dayHide}]">
            <p> 库存:<span style="color:red;" v-if="list[index].panduan == true" > {{item.repertory}}</span><span v-else> {{item.repertory}}</span></p> 
            <p>价格：<span style="color:red;" v-if="list[index].priceColor == true">{{item.price}}</span> <span v-else>{{item.price}}</span></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import timeUtil from './calendar';
import {datetime} from './../../js/public.js'
export default {
  data() {
    return {
      textTop: ['一', '二', '三', '四', '五', '六', '日'],
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: '',
      kucun: [],
      panduan: false,
      median: null,
      id: null,
      today: [],
    };
  },
  props: {
    repertory: Number,
    repertoryNums: String,
    time: String,
    price: Number,
    oneDayPrice: [Array, Object, JSON],
    repertoryList: [Array, Object, JSON],
    priceDate: [Array, Object, JSON],
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    // agoDayHide: { type: String, default: `0` },
    // futureDayHide: { type: String, default: `2554387200` }
  },
  created() {
    this.myDate = new Date();
  },
  methods: {
    setClass(data) {
      let obj = {};
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    clickDay: function (item, index) {
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date);
      }
      if (item.otherMonth !== 'nowMonth') { 
        item.otherMonth === 'preMonth'
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date);
      }
      // if(this.time != ""){
        // this.list[index].panduan = true;
        // this.median = this.repertory;
      // }
    },
    ChoseMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = new Date(date);
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    PreMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth');
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    NextMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth');
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    forMatArgs: function () {
      let markDate = this.markDate;
      
      for (let i = 0; i < markDate.length; i++) {
        markDate[i] = timeUtil.dateFormat(markDate[i]);
      }
      let markDateMore = this.markDateMore;
      for (let i = 0; i < markDateMore.length; i++) {
        markDateMore[i].date = timeUtil.dateFormat(markDateMore[i].date);
      }
      return [markDate, markDateMore];
    },
    todaydate: function () {
        let time = new Date();
        this.today.push(time.getFullYear());
        this.today.push(time.getMonth() + 1);
        return this.today
    },
    getList: function (date, chooseDay, isChosedDay = true) {
      this.todaydate();
      console.log(this.oneDayPrice);
      const [markDate, markDateMore] = this.forMatArgs();
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      let arr = timeUtil.getMonthList(this.myDate);
      for (let i = 0; i < arr.length; i++) {
        let markClassName = '';
        let k = arr[i];
        k.price = this.price;
        k.repertory = this.repertory;
        k.panduan = false;
        k.chooseDay = false;
        k.priceColor = false;
        const nowTime = k.date;
        if(this.oneDayPrice.length > 0) {
          for(let h = 0; h<this.oneDayPrice.length; h++){
            if(nowTime == datetime(this.oneDayPrice[h].settingDate)){
              k.price = this.oneDayPrice[h].salePrice;
              k.priceColor = true;
              console.log(k.price);
              console.log(this.oneDayPrice[h].salePrice);
            }
          }
        }
        
        // console.log(this.repertoryList.length)
        if(this.repertoryList.length > 0 ){
          for(let j = 0; j < this.repertoryList.length; j++){
              if(nowTime == datetime(this.repertoryList[j].rdate)){
                console.log(datetime(this.repertoryList[j].rdate));
                k.repertory = this.repertoryList[j].repertory;
                console.log(k.repertory);
                k.panduan = true;           
              }else{
                // k.repertory = this.repertory;
                // k.panduan = false;
              }
          }
        }
        const t = new Date(nowTime).getTime() / 1000;
        //看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || '';
          }
        }
        
        //标记选中某些天 设置class
        k.markClassName = markClassName;
        k.isMark = markDate.indexOf(nowTime) > -1;
        //无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
        if (k.isToday) {
          this.$emit('isToday', nowTime);
        }
         let str = nowTime.split("/");
        
        // 当天之前变灰
       
        if(k.isToday == true) {
          this.id = k.id;
        }
        if(this.today[0] >= str[0] && this.today[1] == str[1]) {
          if(k.id < this.id) {
            k.huise = true;
          }else {
            k.huise = false;
          }
        } else if(this.today[0] >= str[0] && this.today[1] > str[1]) {
          k.huise = true;
        } else if(this.today[0] < str[0]){
          k.huise = false;
        }
        // 特价时间
        // console.log(this.priceDate);
        if(this.priceDate.length > 0) {
          let startDate = datetime(this.priceDate[0]).split("/");
          let endDate = datetime(this.priceDate[1]).split("/");
          if(startDate[0] >= str[0] && startDate[1] == str[1]) {
            if(k.id < startDate[2]) {
              k.huise = true;
            }else {
              k.huise = false;
            }
          }else if(startDate[0] >= str[0] && startDate[1] > str[1]){
            k.huise = true;
          } else if(startDate[0] < str[0]){
            k.huise = false;
          }
          
          if(endDate[0] >= str[0] && endDate[1] == str[1]) {
            if(k.id > endDate[2]) {
              k.huise = true;
            }
          }else if(endDate[0] >= str[0] && endDate[1] < str[1] ){
            k.huise = true;
          }
        }


        let flag = !k.dayHide && k.otherMonth === 'nowMonth';
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit('choseDay', nowTime);
          this.historyChose.push(nowTime);
          k.chooseDay = true;
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime && !chooseDay && flag
        ) {
          k.chooseDay = true;
        }
      }
      this.list = arr;
      console.log(this.list);
    }
  },
  mounted() {
    this.getList(this.myDate);
    console.log(this.price);
  },
  watch: {
    // time: function() {
    //   this.time = this.time.split("-").join("/");
    //   // if(this.time != ""){
    //   //   this.panduan = true;
    //   // }
    //   console.log(this.time);
    // },
    oneDayPrice: function() {
      this.getList(this.myDate);
    },
    price: function() {
      this.getList(this.myDate);
      console.log(this.price);
      console.log(this.priceDate);
    },
    repertoryList: function() {
      this.getList(this.myDate);
      console.log(this.priceDate);
    },
    markDate(val, oldVal) {
      this.getList(this.myDate);
    },
    markDateMore(val, oldVal) {
      this.getList(this.myDate);
    },
    agoDayHide(val, oldVal) {
      this.agoDayHide = parseInt(val);
      this.getList(this.myDate);
    },
    futureDayHide(val, oldVal) {
      this.futureDayHide = parseInt(val);
      this.getList(this.myDate);
    }
  }
};
</script>
<style>
@media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background-color: #77DDFF;
    cursor: pointer;
    border-radius: 100px;
  }
}
* {
  margin: 0;
  padding: 0;
}

.wh_container {
  min-width: 500px;
  margin: auto;
}

li {
  list-style-type: none;
}
.wh_top_changge {
  display: flex;
  background-color: #29B7F1;
}
.wh_contentW{
  background-color: #29B7F1;
}

.wh_top_changge li {
  cursor: pointer;
  display: flex;
  color: #fff;
  font-size: 18px;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 47px;
}

.wh_top_changge .wh_content_li {
  cursor: auto;
  flex: 2.5;
}
.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  /* background-color: #0fc37c; */
  background-color: #fff;
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}

.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  min-width: 500px; 
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 16px;
}

.wh_content_item,
wh_content_item_tag {
  font-size: 15px;
  width: 14%;
  text-align: center;
  color: #000;
  position: relative;
}
.wh_content_item {
  height: 70px;
}

.wh_top_tag {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_item_date {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wh_item_repertory{
  font-size: 11px;
}

.wh_jiantou1 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  transform: rotate(45deg);
}
.wh_content_item > .wh_isMark {
  margin: auto;
  border-radius: 100px;
  background: blue;
  z-index: 2;
}
.wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
}
.wh_content_item .dayhui {
  color: #bfbfbf;
}
.wh_content_item .wh_want_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_isToday {
  background: yellow;
  border-radius: 100px;
}
.wh_content_item .wh_chose_day {
  background-color: #29B7F1;
  border-radius: 100px;
}
</style>