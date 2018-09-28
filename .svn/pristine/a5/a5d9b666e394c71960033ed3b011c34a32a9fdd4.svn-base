<template>
    <div class="hotelTicket">
        <Toptitle :Title="Title" />
        <Row>
            <Col span="8">&nbsp;</Col>
            <Col span="8">
                <label for="">验票码</label>
                <Input v-model="mobile" placeholder="请输入验票码" style="width: 60%"></Input>
                <Button type="success" @click="grabble">查询</Button>
            </Col>
            <Col span="8"> &nbsp;</Col>
        </Row>
        <div class="ticketList">
            <Table style="margin:0 auto;" border :loading="loading" :columns="TableTop" :data="tableData"></Table>
            <!-- <Table style="margin:0 auto;" border :columns="columns1" :data="tableData"></Table> -->
        </div>

        <Modal
        v-model="modal1"
        title="验票"
         @on-cancel="cancel">
        <div>
            <label for="">验票码：</label>
            <Input v-model="checkCode" placeholder="请输入验票码" style="width: 250px"></Input>
        </div>
        <div slot="footer">
            <Button type="text" size="large" @click="cancel">取消</Button>
            <Button type="primary" size="large" :loading="addLoading" @click="ok">确认</Button>
        </div>
    </Modal>
    </div>
</template>
<script>
import Toptitle from "./Toptitle";
import { getDate, datetime} from "../js/public.js";
export default {
    components: {
        Toptitle,
    },
    data() {
        return {
            Title: "票务核销",
            mobile: "",
            checkCode: "",
            loading: false,
            addLoading: false,
            modal1: false,
            orderNo: "",
            cityList: [],
            tableData: [],
            TableTop: [
                {
                    title: "订单号",
                    key: "orderNo",
                    align: "center",
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
                    title: "购买数量",
                    key: "buySum",
                    align: "center",
                },
                {
                    title: "验票码",
                    key: "checkCode",
                    align: "center",
                },
                {
                    title: "电子票状态",
                    key: "status",
                    align: "center",
                    render: (h, params) => {
                        if (params.row.status == 0) {
                            return "初始/未验票";
                        } else if(params.row.status == 1) {
                            return "已验票"
                        } else if(params.row.status == 2) {
                            return "已取消"
                        }
                    }
                },
                {
                    title: "支付方式",
                    key: "payType",
                    align: "center",
                    render: (h, params) => {
                        if (params.row.payType == "ALIPAY") {
                            return "App支付宝支付";
                        } else if(params.row.payType == "WECHAT"){
                            return "微信支付";
                        } else if(params.row.payType == "UNIONPAY"){
                            return "银联支付"
                        } else if(params.row.payType == "WECHAT_PUBLIC"){
                            return "公众号"
                        } else if(params.row.payType == "ACTIVITY"){
                            return "活动"
                        }
                    }
                },
                {
                    title: "支付金额",
                    key: "payAmount",
                    align: "center",
                    render(h, params) {
                        return params.row.payAmount + "元";
                    }
                },
                {
                    title: "真实姓名",
                    key: "realname",
                    align: "center"
                },
                {
                    title: "联系人手机号",
                    key: "customerMobile",
                    align: "center"
                },
                {
                    title: "操作",
                    key: "action",
                    align: "center",
                    fixed: "right",
                    width: 100,
                    render: (h, params) => {
                        let text = "";
                        let disabled = false;
                        console.log(params.row.playTimeStart);
                        console.log(this.currentdate);
                        if(params.row.status == 1) {
                           disabled = true;
                            text = "验票";
                        }else if(params.row.status == 0){
                            disabled = false;
                            text = "验票";
                        
                            if(params.row.playTimeType == 1){
                                if(this.currentdate >= params.row.playTimeStart && this.currentdate <= params.row.playTimeEnd){
                                    disabled = false;
                                    text = "验票";
                                }else if(this.currentdate < params.row.playTimeStart){
                                    disabled = true;
                                    text = "未到期";
                                }else if(this.currentdate > params.row.playTimeEnd){
                                    disabled = true;
                                    text = "已过期";
                                }
                            } else if(params.row.playTimeType == 2) {
                                if(this.currentdate == params.row.arriveTime) {
                                    disabled = false;
                                    text = "验票";
                                }else if(this.currentdate < params.row.arriveTime){
                                    disabled = true;
                                    text = "未到期";
                                } else if(this.currentdate > params.row.arriveTime){
                                    disabled = true;
                                    text = "已过期";
                                }
                            } else if(params.row.playTimeType == 0) {
                                disabled = false;
                                text = "验票";
                            }
                        }
                    return h("div", [
                        h(
                        "Button",
                        {
                            props: {
                            type: "primary",
                            size: "small",
                            disabled: disabled
                            },
                            style: {
                            margin: "3px 5px 3px 0",
                            },
                            on: {
                            click: () => {
                                this.ticketcheck(params.row.orderNo,params.index)
                            }
                            }
                        },
                        text
                        ),
                    ]);
                    }
                }
            ],
            pageNum: 1,
            pageSize: 10,
            total: null,
            currentdate: ""
        }
    },
    watch: {
    },
    methods: {
        grabble() {
            // this.modal1 = true;
            this.tableData = [];
            this.loading = true;
            this.axios
                .get(`${this.AjaxUrl}/ty_business/order/ticket/queryByCheckCode`, {
                    params: {
                    check_code: this.mobile
                    }
                })
                .then(res => {
                    if (res.errorCode == 200) {
                        this.$Message.success(res.message);
                        this.tableData.push(res.data);
                        this.loading = false;
                    }else{
                        this.$Message.error(res.message);
                        this.loading = false;
                        console.log(res.errorCode)  
                    }
                })
                .catch(err => {});
        },
        ticketcheck(orderNo,index) {
            this.modal1 = true;
            this.orderNo = orderNo;
            this.checkCode = this.tableData[index].checkCode;
        },
        ok() {
            this.addLoading = true;
            const title = '提示';
            const content = '<h3>验票成功</h3>';
            let data = {};
            if(this.checkCode == "") {
                this.$Message.error("请输入验票码");
                return false;
            }
            data.order_no = this.orderNo;
            data.check_code = this.checkCode;
            this.axios
                .post(
                `${this.AjaxUrl}/ty_business/order/ticket/checkCodeTicket`,
                this.qs.stringify(data)
                )
                .then(res => {
                    if(res.errorCode == 200){
                        this.modal1 = false;
                        this.addLoading = false;
                        this.$Modal.success({
                            title: title,
                            content: content
                        });
                        this.tableData = [];
                        this.grabble();
                        // this.$Message.success(res.message);
                    }else{
                        this.addLoading = false;
                        this.$Message.error(res.message);
                    }
                })
                .catch(err => { 
                    this.addLoading = false;
                    console.log(err);
                });
        },
        cancel() {
            this.modal1 = false;
        },
        // 获取当天时间
        getNowFormatDate() {
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
            this.currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
            console.log(Date.parse(this.currentdate));
            return this.currentdate = Date.parse(this.currentdate);
        },
    },
    mounted () {
        this.getNowFormatDate();
        this.axios
        .get(`${this.AjaxUrl}/ty_business/general/getDictByCode`, {
            params: {
                dictCode: "TY_ORDER_STATUS"
            }
        })
        .then(res => {
            if (res.errorCode == 200) {
            this.cityList = res.data;
            }
            this.cityList.unshift({ systemDictId: " ", dictExplain: "全部" ,dictValue: " "});
            console.log(this.cityList);
        })
        .catch(err => {});
    }
}
</script>
<style>
.ticketList{
    margin-top: 10px;
    padding: 0px 20px;
}
.ivu-table-wrapper{
    /* max-width: 1100px; */
}
</style>

