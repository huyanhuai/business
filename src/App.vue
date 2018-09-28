<template>
  <div id="app"  class="layout">
      <!-- <div  class="header"  v-show="loginend">
          <div>
              杭州同游科技有限公司
          </div>
          <div>
                <Row >
                    <Col  span="3" offset="1" >
                         <Avatar :src="headImg" />
                         <span style="margin-left:8px;">{{username}}</span>
                       
                    </Col>
                    <Col  span="2"     class="nav_list">
                        <span   @click="instance(1)" :style="{backgroundImage:nav_top.kefuzhongxin}" >客服中心</span>
                    </Col>
                    <Col  span="3" class="nav_list">
                        <span   @click="instance(2)" :style="{backgroundImage:nav_top.weixingongzhonghao}">微信公众号:同游科技</span>
                    </Col>
                    <Col  span="2"   class="nav_list">
                        <span   @click="instance(3)" :style="{backgroundImage:nav_top.tuichu}">退出</span>
                    </Col>
                    <Col push="8" span="5">
                      {{datatime}}
                    </col>
                </Row>
          </div>
      </div> -->
     <Layout style="min-width:1200px;width:100%;height:100%;">
          <Header style="height:100px;padding: 0;" v-show="loginend">
            <div  class="header">
                <div>
                    杭州同游科技有限公司
                </div>
                <div>
                      <Row >
                          <Col  span="3" offset="1" >
                              <Avatar :src="headImg" />
                              <span style="margin-left:8px;">{{username}}</span>
                            
                          </Col>
                          <Col  span="2"     class="nav_list">
                              <span   @click="instance(1)" :style="{backgroundImage:nav_top.kefuzhongxin}" >客服中心</span>
                          </Col>
                          <Col  span="3" class="nav_list">
                              <span   @click="instance(2)" :style="{backgroundImage:nav_top.weixingongzhonghao}">微信公众号:同游科技</span>
                          </Col>
                          <Col  span="2"   class="nav_list">
                              <span   @click="instance(3)" :style="{backgroundImage:nav_top.tuichu}">退出</span>
                          </Col>
                          <Col push="8" span="5">
                            {{datatime}}
                          </col>
                      </Row>
                </div>
            </div>
          </Header>
          <Layout style="height:100%;"> 
            <Sider id="ce-sider" style="background-color: rgb(82, 192, 199);height:cal(100%)"  collapsible :collapsed-width="78" v-model="isCollapsed" v-show="loginend">
                <Menu active-name="" theme="dark" width="auto" :accordion="true" :class="menuitemClasses">
                  <router-link v-for="(item,key) in menuList"  :name="item.systemAuthId" :key="key"  v-if="item.authList==''" :to="item.pcAuthUrl+'/'+item.systemAuthId">
                  <MenuItem  :name="item.systemAuthId">
                    
                      <div style="line-height:30px;">
                        <Icon type="ios-navigate"></Icon>
                          <span class="Sp_Color">
                           {{item.authName}}
                          </span>
                        </div>
                    
                  </MenuItem>
                  </router-link>
                  <!-- <MenuItem v-for="(item,key) in menuList"  :name="item.systemAuthId" :key="key" v-if="item.authList==''" >
                    <router-link :to="item.pcAuthUrl+'/'+item.systemAuthId">
                      <div style="width:150px;line-height:30px;">
                        <Icon type="ios-navigate"></Icon>
                          <span class="Sp_Color">
                           {{item.authName}}
                          </span>
                        </div>
                    </router-link>
                  </MenuItem> -->
                  <Submenu v-else  :name="item.systemAuthId">
                      <template slot="title">
                        <Icon type="magnet"></Icon>
                        {{item.authName}}
                      </template>
                      <router-link v-for="(items,key) in item.authList"  :key="key" :name="items.systemAuthId" :to="items.pcAuthUrl+'/'+items.systemAuthId">
                      <MenuItem  :name="items.systemAuthId">
                              {{items.authName}}
                      </MenuItem>
                      </router-link>
                  </Submenu>
                  
                      <!-- <router-link to="/merchants/ticketInspection">
                        <MenuItem name="1-2">
                          票务核销
                        </MenuItem>
                      </router-link>
                  <Submenu name="1">
                      <template slot="title">
                          <Icon type="ios-navigate"></Icon>
                          酒店
                      </template>
                      <router-link to="/merchants/hotel">
                        <MenuItem name="1-1">
                          酒店上新
                        </MenuItem>
                      </router-link>
                      <router-link to="/merchants/hotelInformation">
                        <MenuItem name="1-2">
                          酒店信息
                        </MenuItem>
                      </router-link>
                      <router-link to="/merchants/hotelOrder">
                        <MenuItem name="1-3">
                          酒店订单
                        </MenuItem>
                      </router-link>
                      <router-link to="/merchants/hotelTicket">
                        <MenuItem name="1-4">
                          酒店验票
                        </MenuItem>
                      </router-link>
                      <router-link to="/merchants/checkOut">
                        <MenuItem name="1-5">
                          酒店退房
                        </MenuItem>
                      </router-link>
                      <router-link to="/merchants/hotelVerification">
                        <MenuItem name="1-6">
                          酒店核销
                        </MenuItem>
                      </router-link>
                  </Submenu> -->

                    <!-- <MenuItem name="1-1">
                     <router-link to="/merchants/agency">
                        <Icon type="ios-navigate"></Icon>
                        <span class="Sp_Color">
                           代理管理
                        </span>
                        </router-link>
                    </MenuItem>
                    <MenuItem name="1-2">
                    <router-link to="/merchants/order">
                        <Icon type="printer"></Icon>
                        <span class="Sp_Color">
                             订单管理
                        </span>
                        </router-link>
                    </MenuItem>
                    <Submenu name="3" >
                    <template slot="title">
                       <Icon type="magnet"></Icon>
                        商家管理
                    </template>
                    <MenuItem name="6-1">
                        <router-link to="/merchants/merchant">商家信息</router-link>
                    </MenuItem>
                    <MenuItem name="6-2">
                         <router-link to="/merchants/changpassword">修改密码</router-link>
                    </MenuItem>
                    </Submenu>

                    <MenuItem name="1-4">
                    <router-link to="/merchants/Finance">
                      <Icon type="model-s"></Icon>
                        <span class="Sp_Color">
                            财务管理
                        </span>
                        </router-link>
                    </MenuItem>

                 <MenuItem name="1-7">
                    <router-link to="/merchants/statisticanalysis">
                        <Icon type="merge"></Icon>
                        <span class="Sp_Color">
                            统计分析
                        </span>
                        </router-link>
                    </MenuItem>
                    <Submenu name="8">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        商品管理
                    </template>
                    <MenuItem name="8-1">
                        <router-link to="/merchants/productinformation">产品信息</router-link>
                    </MenuItem>
                    <MenuItem name="8-2">
                         <router-link to="/merchants/Newproduct">产品上新</router-link>
                    </MenuItem>
                     </Submenu>
                    <MenuItem name="10-1">
                    <router-link to="/merchants/journal">
                      <Icon type="model-s"></Icon>
                        <span class="Sp_Color">
                            日志管理
                        </span>
                        </router-link>
                    </MenuItem>

                    <MenuItem name="11-1">
                    <router-link to="/merchants/role">
                      <Icon type="model-s"></Icon>
                        <span class="Sp_Color">
                            角色管理
                        </span>
                        </router-link>
                    </MenuItem>


                    <MenuItem name="12-1">
                    <router-link to="/merchants/systemmanagement">
                      <Icon type="model-s"></Icon>
                        <span class="Sp_Color">
                            系统管理
                        </span>
                        </router-link>
                    </MenuItem>

                    <MenuItem name="13-1">
                    <router-link to="/merchants/AfterSale">
                      <Icon type="model-s"></Icon>
                        <span class="Sp_Color">
                            售后管理
                        </span>
                    </router-link>
                    </MenuItem>                     -->
                </Menu>
                <div slot="trigger" style=""></div>
            </Sider>
            <Content id="co-content" style="background: '#fff';">
                <router-view  @Logins="chang"></router-view>
            </Content>
          </Layout>
      </Layout>
    </div>  
</template>
<script>
import "./css/Home.css";
import login from "./components/login/login";
import audit from "./components/login/audit"; 
import { getNowFormatDate } from "./js/public.js";
export default {
  name: "app",
  data() {
    return {
      isCollapsed: false,
      loginend: false,
      username: "",
      headImg: "",
      menuList: [],
      datatime: "",
      nav_top: {
        kefuzhongxin: `url(${require("./assets/Home/kefuzhongxin.png")})`,
        weixingongzhonghao: `url(${require("./assets/Home/weixingongzhonghao.png")})`,
        tuichu: `url(${require("./assets/Home/tuichu.png")})`
      },
      imgstyle: {
        width: "16px",
        float: "left",
        heigth: "18px"
      }
    };
  },
  watch: {
    loginend() {
      if (this.loginend) {
        console.log(this.loginend)
        this.axios
          .get(`${this.AjaxUrl}/ty_business/system/auth/getBusinessAuthByToken`,{
          params: {
            type: 2
          }
         })
          .then(res => {
            if (res.errorCode == 200) {
              console.log(res.data);
              this.menuList = res.data.list;
              this.username = res.data.userName;
              this.headImg = this.ImgUrl + res.data.headImg + "_small.jpg";
            }else if(res.errorCode == 303){
              this.loginend = false;
              deleteCookie("token");
              this.$router.push({ path: "/login" });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    $route(to, from) {  
      if(to.path == "/register" || to.path == "/ForgetPassword" || to.path == "/Auditinformation" || to.path == "/audit"){
        console.log(to);  
        console.log(from); 
      }else {
        this.routeChange();
        console.log(to);  
        console.log(from);
      }  
    } 
  },
  methods: {
    routeChange() {
      this.axios
          .get(`${this.AjaxUrl}/ty_business/system/auth/getBusinessAuthByToken`,{
          params: {
            type: 2
          }
         })
          .then(res => {
            if (res.errorCode == 200) {
              console.log(res.data);
            }else if(res.errorCode == 303){
              this.loginend = false;
              deleteCookie("token");
              this.$router.push({ path: "/login" });
            }
          })
          .catch(err => {
            console.log(err);
          });
    },
    chang(res) {
      if (res == true) {
        this.loginend = true;
        this.$router.push({ path: "/merchants" });
      } else if (res == "register") {
        this.$router.push({ path: "/register" });
      } else if (res == "ForgetPassword") {
        //this.$router.push({ path: "/ForgetPassword",query:{id:111} });
        this.$router.push({ path: "/ForgetPassword" });
      } else if (res == "login") {
        this.$router.push({ path: "/login" });
      } else if (res == false) {
        this.loginend = false;
        this.$router.push({ path: "/" });
      }
    },
    instance(type) {
      let title = "";
      let content = "";
      if (type == 1) {
        title = "客服中心";
        content = `
            <p class="content_p"><img   src="${require("./assets/Home/lianxidianhua.png")}">0571-86981889</p>
            <p class="content_p"><img   src="${require("./assets/Home/dizhi.png")}">杭州市天目山路226号网新大厦1401</p>
            <p class="content_p"><img   style="width: 18px;height: 16px; margin-top: 2px;" src="${require("./assets/Home/youxiang.png")}">tech@057135.com</p>
        `;
      } else if (type == 2) {
        title = "二维码";
        content = `
            <p style="text-align:center">
                <img  style="width:200px;" src="${require("./assets/Home/code.png")}"/>
            </p>
          `;
      } else {
        this.loginend = false;
        deleteCookie("token");
        this.$router.push({ path: "/login" });
        return false;
      }
      this.$Modal.info({
        title: title,
        content: content
      });
    }
  },
  mounted() {
    setInterval(() => {
      this.datatime = `您好！欢迎您！${getNowFormatDate()}`;
    }, 1000);
    if (getCookie("token") == "" || getCookie("token") == undefined || getCookie("token") == null) {
      this.loginend = false;
      this.$router.push({ path: "/login" });
    } else {
      this.loginend = true;
      this.$router.push({ path: "/merchants" });
      console.log(22);
    }
  },
  computed: {
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  components: {
    login
  }
};
</script>

<style  lang="scss">
#app{
  min-width: 1200px;
  background: #fff;
}
.merchants{
  height: 100%;
}
.content_p {
  margin-bottom: 8px;
  img {
    width: 16px;
    height: 18px;
    float: left;
    margin-right: 8px;
  }
}
.content_p :nth-child(3) {
  img {
    width: 18px;
    height: 16px;
  }
}
.ivu-layout.ivu-layout-has-sider > .ivu-layout, .ivu-layout.ivu-layout-has-sider > .ivu-layout-content{
  overflow-x: visible !important;
}
.ivu-layout-content{
  // min-width: 1000px;
  width: 100%;
  height: 100%;
  overflow-x: visible !important;
}

.header {
  min-width:1200px;
  width: 100%;
  background-color: #fff;
  > div:nth-child(1) {
    background-color: rgb(82, 192, 199);
    height: 60px;
    line-height: 60px;
    background-image: url("./assets/Home/logo2.png");
    background-repeat: no-repeat;
    background-position-x: 50px;
    background-position-y: 10px;
    text-indent: 120px;
    font-size: 20px;
    color: #fff;
  }
  > div:nth-child(2) {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
  }
}

.nav_list span {
  display: inline-block;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position-x: 8px;
  background-position-y: 10px;
  text-indent: 38px;
  cursor: pointer;
}
#ce-sider{
  background-color: rgb(82, 192, 199);
  height: 100%;
  overflow: auto;
}
#ce-sider::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
#ce-sider::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0);
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0);
    background: rgba(0,0,0,0.2);
}
#ce-sider::-webkit-scrollbar-track {/*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0,0,0,0);
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0);
    border-radius: 0;
    -webkit-border-radius: 0;
    background: rgba(0,0,0,0.1);
}
#co-content{
    height: 100%;
    overflow: auto;
}
#co-content::-webkit-scrollbar {/*滚动条整体样式*/
    width: 3px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
#co-content::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0);
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0);
    background: rgba(0,0,0,0.2);
}
#co-content::-webkit-scrollbar-track {/*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0,0,0,0);
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0);
    border-radius: 0;
    -webkit-border-radius: 0;
    background: rgba(0,0,0,0.1);
}
</style>
