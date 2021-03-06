 const getDate = (shijianchuo) => {
   var time;
   if (shijianchuo == undefined) {
     time = new Date();
   } else {
     time = new Date(shijianchuo);
   }
   var y = time.getFullYear();
   var m = time.getMonth() + 1;
   var d = time.getDate();
   if(m < 10){
     m = '0' + m
   }
   if(d < 10){
    d = '0' + d
  }
   var h = time.getHours();
   var mm = time.getMinutes();
   var s = time.getSeconds();
   return y + '-' + m + '-' + d
 }
//  日期+时分
const dataTime = (shijianchuo) => {
  var time;
  if (shijianchuo == undefined) {
    time = new Date();
  } else {
    time = new Date(shijianchuo);
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  if(m < 10){
    m = '0' + m
  }
  if(d < 10){
   d = '0' + d
 }
  var h = time.getHours();
  var mm = time.getMinutes();
  if(h < 10){
    h = '0' + h
  }
  if(mm < 10){
    mm = '0' + mm
  }
  return y + '-' + m + '-' + d + " " + h + ":" + mm
}

 const getDateTime = (shijianchuo) => {
  var time;
  if (shijianchuo == undefined) {
    time = new Date();
  } else {
    time = new Date(shijianchuo);
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var z = "23:59:59.999";
  if(m < 10){
    m = '0' + m
  }
  if(d < 10){
   d = '0' + d
 }
  return y + '-' + m + '-' + d + " " + z
}
const getDateTime0 = (shijianchuo) => {
  var time;
  if (shijianchuo == undefined) {
    time = new Date();
  } else {
    time = new Date(shijianchuo);
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  if(m < 10){
    m = '0' + m
  }
  if(d < 10){
   d = '0' + d
 }
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + m + '-' + d + " " + h + ":" + mm + ":" + s
}
const shm = (shijianchuo) => {
  var time;
  if (shijianchuo == undefined) {
    time = new Date();
  } else {
    time = new Date(shijianchuo);
  }
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  if(h < 10){
    h = '0' + h
  }
  if(mm < 10){
    mm = '0' + mm
  }
  if(s < 10){
   s = '0' + s
 }
  return h + ":" + mm + ":" + s
}

 const hhssmm = (time) => {
   var str = time.split(":");
   var h,mm,s;
   h = str[0];
   mm = str[1];
   s = str[2];
  //   var time1 = new Date();
  //  var h = time1.getHours();
  //  var mm = time1.getMinutes();
  //  var s = time1.getSeconds();
   return h + ':' + mm + ':' + s
 }

 const add0 = (m) => {
   return m < 10 ? '0' + m : m
 };


 function getNowFormatDate() {
   var str = "星期";
   var week = new Date().getDay();
   switch (week) {
     case 0:
       str += "日";
       break;
     case 1:
       str += "一";
       break;
     case 2:
       str += "二";
       break;
     case 3:
       str += "三";
       break;
     case 4:
       str += "四";
       break;
     case 5:
       str += "五";
       break;
     case 6:
       str += "六";
       break;
   }
   var date = new Date();
   var seperator1 = "-";
   var seperator2 = ":";
   var month = date.getMonth() + 1;
   var strDate = date.getDate();
   if (month >= 1 && month <= 9) {
     month = "0" + month;
   }
   if (strDate >= 0 && strDate <= 9) {
     strDate = "0" + strDate;
   }
   var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
     "           " + str + "              " + date.getHours() + seperator2 + date.getMinutes();

   return currentdate;
 }

 function withinErrorMargin(left, right) {
   return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
 }

 //减法计算
 const accSub = (arg1,arg2) => {
  var r1,r2,m,n;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2));
  //last modify by deeka
  //动态控制精度长度
  n=(r1>=r2)?r1:r2;
  return ((arg1*m-arg2*m)/m).toFixed(n);
}
//加法计算
const accAdd = (arg1,arg2) => {
 var r1,r2,m;
 try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
 try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
 m=Math.pow(10,Math.max(r1,r2));
 return (arg1*m+arg2*m)/m;
}

const datetime = (shijianchuo) => {
  var time;
  if (shijianchuo == undefined) {
    time = new Date();
  } else {
    time = new Date(shijianchuo);
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '/' + m + '/' + d
}

 export {
   getDate,
   add0,
   AjaxUrl,
   getNowFormatDate,
   withinErrorMargin,
   hhssmm,
   getDateTime,
   getDateTime0,
   accSub,
   accAdd,
   datetime,
   shm,
   dataTime
 }
