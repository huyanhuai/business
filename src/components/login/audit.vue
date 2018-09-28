<template>
<div class="login">
        <div class="login_top"  >
            <img src="../../assets/login/logotop.png" alt="" class="login_top" >
        </div>
        <div class="auditPic">
            <img src="../../assets/login/background3.png" alt=""   width="100%" height="600px">
            <!-- <h2 class="back" @click="backed">返&nbsp;回&nbsp;登&nbsp;录</h2> -->
        </div>  
</div>
</template>
<script>
    export default {
        data() {
        },
        methods: {
            backed() {
                // this.$router.push({ path: "/login" });
            }
        },
        mounted() {
            // deleteCookie("token");
            this.$router.push({ path: "/audit" });
        }
    }
</script>

<style  lang="scss" scoped>
.login {
  width: 100%;
  .login_top {
    height: 70px;
    width: 100%;
    // background-image: url("../../assets/login/logotop.png");
    // background-size: 100% 70px;
  }
}
.auditPic{
    position: relative;
}
.back{
    width: 80px;
    font-family: "Microsoft YaHei";
    text-align: center;
    color: #D4EEF1;
    position: absolute;
    bottom: 20%;
    left: 50%;
    margin-left: -40px;
    cursor: pointer;
}
.back:hover{
    color: #fff;
}
</style>
