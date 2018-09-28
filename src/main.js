// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import "./css/index.less";
import QrcodeVue from 'qrcode.vue';
import './calendar/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
import vueEventCalendar from 'vue-event-calendar'


// import wangeditor from 'wangeditor';
// console.log(wangeditor)
//左侧菜单

//注册
const audit = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/login/audit')
const login = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/login/login')
const register = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/login/register')
const ForgetPassword = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/login/ForgetPassword.vue')
const Auditinformation = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/login/Auditinformation.vue')
//商家
const order = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/order')
const merchant = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/merchant')
const agency = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/agency')
const Finance = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/Finance')
const commodity = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/commodity')
const agentcommission = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/agentcommission')
const professionalwork = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/professionalwork')
const statisticanalysis = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/statisticanalysis')
const productinformation = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/productinformation')
const E_order = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/verification/E_order.vue')
const e_ticket = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/verification/e_ticket.vue')
const verification_order = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/verification/order.vue')
const verification = () =>
  import ( /* webpackChunkName: "group-foo" */ './components/verification/verification.vue')

const journal = () =>
  import ('./components/journal.vue')

const role = () =>
  import ('./components/role.vue')

const systemmanagement = () =>
  import ('./components/systemmanagement.vue')

const changpassword = () =>
  import ('./components/changpassword.vue')

const index = () =>
  import ('./components/index.vue')

const AfterSale = () =>
  import ('./components/AfterSale.vue')

const Newproduct = () =>
  import ('./components/Newproduct.vue')

const ticket = () =>
  import ('./components/ticket.vue')

const MerchantAccount = () =>
import ('./components/MerchantAccount.vue')

const ticketInspection = () =>
import ('./components/ticketInspection.vue')

//酒店
const hotel = () =>
import ('./components/hotel/hotel.vue')

const hotelInformation = () =>
import ('./components/hotel/hotelInformation.vue')

const hotelOrder = () =>
import ('./components/hotel/hotelOrder.vue')

const hotelTicket = () =>
import ('./components/hotel/hotelTicket.vue')

const checkOut = () =>
import ('./components/hotel/checkOut.vue')

const hotelVerification = () =>
import ('./components/hotel/hotelVerification.vue')


Vue.prototype.axios = axios;
//正式
Vue.prototype.AjaxUrl = 'http://api_business.tongyoutrip.com';
Vue.prototype.ImgUrl = 'http://image.tongyoutrip.com';

// Vue.prototype.WebSocket = 'http://api_business.tongyoutrip.com';

//测试
// Vue.prototype.AjaxUrl = 'http://192.168.0.16:8090';
// Vue.prototype.ImgUrl = 'http://192.168.0.16:9000';


// Vue.prototype.AjaxUrl = 'http://192.168.0.17:8090';
// Vue.prototype.ImgUrl = 'http://192.168.0.17:8010';
// Vue.prototype.WebSocket = '192.168.0.17:8090';

// Vue.prototype.AjaxUrl = 'http://192.168.0.192:8090';
let qs = require('qs');
Vue.prototype.qs = qs;

Vue.prototype.token = "";


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (getCookie('token') == "") {

  } else {
    if (config.data == undefined) {
      config.data = "";
    }
    config.headers.token = getCookie('token');
  }
  if (config.method === 'post') {
      // config.data = qs.stringify(config.data);
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.data.errorCode == 303){
    deleteCookie("token");
  //   router.replace({
  //     path: '/',
  //     query: {redirect: router.currentRoute.fullPath}
  // })
    // this.$router.push({ path: "/" });
  }
  console.log(response.data.errorCode);
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  console.log(error)
  
  return Promise.reject(error);
});


Vue.use(iView)
Vue.use(VueRouter)
// Vue.use(wangeditor)
const Ticket = {
  template: `
  <div class="Ticket">
      404
  </div> `
}


const merchants = {
  template: `
  <div class="merchants">
    <router-view></router-view>
  </div> `
}

const routes = [{
    path: '/',
    // redirect: '/login'
    // name: 'login',
    component: login,
    beforeEnter: (to, from, next) => {
      deleteCookie("token");
      next();
    }
  },
  {
    path: '/audit',
    name: 'audit',
    component: audit,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    // beforeEnter: (to, from, next) => {
    //   deleteCookie("token");
    //   next();
    // }
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/ForgetPassword',
    name: 'ForgetPassword',
    component: ForgetPassword
  },
  {
    path: '/Auditinformation',
    name: 'Auditinformation',
    component: Auditinformation
  },
  //404
  {
    path: '*',
    name: 'Ticket',
    component: Ticket
  },
  //商家  merchant  Newproduct
  {
    path: '/merchants/',
    component: merchants,
    children: [{
        path: '/',
        component: index
      }, {
        path: 'AfterSale/:id',
        component: AfterSale
      }, {
        path: 'Newproduct/:id',
        component: Newproduct
      }, {
        path: 'changpassword/:id',
        component: changpassword
      }, {
        path: 'agency/:id',
        component: agency
      }, {
        path: 'order/:id',
        component: order
      },
      {
        path: 'merchant/:id',
        component: merchant
      },
      {
        path: 'Finance/:id',
        component: Finance
      },
      {
        path: 'commodity/:id',
        component: commodity
      },
      {
        path: 'statisticanalysis/:id',
        component: statisticanalysis
      },
      {
        path: 'productinformation/:id',
        component: productinformation,
      }, {
        path: 'journal/:id',
        component: journal
      }, {
        path: 'role/:id',
        component: role
      }, {
        path: 'systemmanagement/:id',
        component: systemmanagement
      }, {
        path: "E_order",
        component: E_order
      },
      {
        path: "e_ticket",
        component: e_ticket
      },
      {
        path: "verification_order",
        component: verification_order
      },
      {
        path: "verifications",
        component: verification
      },
      {
        path: "ticket/:id",
        component: ticket
      },
      {
        path: "MerchantAccount/:id",
        component: MerchantAccount
      },
      {
        path: "ticketInspection/:id",
        component: ticketInspection
      },
      {
        path: "hotel/:id",
        component: hotel
      },
      {
        path: "hotelInformation/:id",
        component: hotelInformation
      },
      {
        path: "hotelOrder/:id",
        component: hotelOrder
      },
      {
        path: "hotelTicket/:id",
        component: hotelTicket
      },
      {
        path: "checkOut/:id",
        component: checkOut
      },
      {
        path: "hotelVerification/:id",
        component: hotelVerification
      }
    ]
  },
];

const router = new VueRouter({
  routes
});

Vue.use(vueEventCalendar, {locale: 'en', weekStartOn: 1})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: {
    App
  }
})
