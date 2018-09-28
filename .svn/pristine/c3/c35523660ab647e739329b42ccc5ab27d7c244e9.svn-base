<template>
    <div>
        <Toptitle :Title="Title" />
        <div>
            <Row>
                <Col span="8">&nbsp;</Col>
                <Col span="8">
                    <label for="">手机号</label>
                    <Input v-model="mobile" placeholder="请输入手机号" style="width: 60%"></Input>
                    <Button type="success" @click="grabble">搜索</Button>
                </Col>
                <Col span="8"> &nbsp;</Col>
            </Row>
            <div>
            <div class="ticketList">
                <Table style="margin:0 auto;" border :loading="loading" :columns="columns1" :data="tableData"></Table>
            </div>
                <Modal
                    v-model="modal1"
                    title="退房"
                    @on-cancel="cancel">
                    <div class="tickeClass">
                        <label for="">订单号</label>
                        <Input style="width: 70%" v-model="orderNo"></Input>
                    </div>
                    <div class="tickeClass">
                        <label for="">退房数量</label>
                        <Input style="width: 70%" v-model="roomSum"></Input>
                    </div>
                    <div v-if="timeShow == true">
                        <h3>选择退房时间：</h3>
                        <CheckboxGroup v-model="fruit">
                            <Checkbox v-for="(item,index) in outTimeList" :key="index" :label="item"></Checkbox>
                        </CheckboxGroup>
                    </div>
                    
                    <div slot="footer">
                        <Button type="text" size="large" @click="cancel">取消</Button>
                        <Button type="primary" size="large" :loading="addLoading" @click="ok">确认</Button>
                    </div>
                </Modal>
            </div>
        </div>
    </div>
</template>
<script>
import Toptitle from "./../Toptitle";
import { getDate,getDateTime0} from "../../js/public";
export default {
    components: {
        Toptitle,
    },
    data() {
        return {
            Title: "酒店退房",
            mobile: "",
            datePicker: "",
            modal1: false,
            loading: false,
            addLoading: false,
            refundAmount: "",
            currentdate: "",
            timeShow: false,
            fruit: [],
            orderNo: "",
            roomSum: "",
            outTimeList: [],
            cityList: [],
            timeList: [],
            tableData: [],
            columns1: [
                 {
                    title: "订单号",
                    key: "orderNo",
                    align: "center",
                    width: 100,
                    fixed: "left",
                },
                {
                    title: "酒店名称",
                    key: "hotelName",
                    width: 100,
                    align: "center"
                },
                {
                    title: "房间名称",
                    key: "roomName",
                    width: 100,
                    align: "center",
                },
                {
                    title: "预定房间数量",
                    key: "roomSum",
                    width: 100,
                    align: "center"
                },
                {
                    title: "订单类型",
                    key: "orderType",
                    width: 100,
                    align: "center",
                    render(h, params){
                        if (params.row.orderType == "HOTEL") {
                        return "酒店";
                        }
                    }
                },
                {
                    title: "订单金额",
                    key: "orderPrice",
                    width: 100,
                    align: "center",
                    render(h, params) {
                        return params.row.orderPrice + "元";
                    }
                },
                {
                    title: "订单状态",
                    key: "status",
                    width: 100,
                    align: "center",
                    render: (h, params) => {
                        for (let i of this.cityList) {
                        if (i.dictValue == params.row.status) {
                            return i.dictExplain;
                        }
                        }
                    }
                },
                {
                    title: "支付方式",
                    key: "payType",
                    width: 100,
                    align: "center",
                    render(h, params) {
                        if (params.row.payType == "ALIPAY") {
                        return "App支付宝支付";
                        } else if(params.row.payType == "WECHAT"){
                        return "微信支付";
                        } else if(params.row.payType == "UNIONPAY"){
                        return "银联支付"
                        }
                    }
                },
                {
                    title: "支付金额",
                    key: "payAmount",
                    width: 100,
                    align: "center",
                    render(h, params) {
                        return params.row.payAmount + "元";
                    }
                },
                {
                    title: "支付时间",
                    key: "payTime",
                    width: 100,
                    align: "center",
                    render(h, params) {
                        return getDate(params.row.payTime);
                    }
                },
                {
                    title: "真实姓名",
                    key: "realname",
                    width: 100,
                    align: "center"
                },
                {
                    title: "联系人手机号",
                    key: "customerMobile",
                    width: 100,
                    align: "center"
                },
                {
                    title: "下单用户手机号",
                    key: "mobile",
                    width: 100,
                    align: "center"
                },
                {
                    title: "用户姓名",
                    key: "userName",
                    width: 100,
                    align: "center"
                },
                {
                    title: "入住时间",
                    key: "startDate",
                    width: 100,
                    align: "center",
                    render(h, params) {
                        return getDate(params.row.startDate);
                    }
                },
                {
                    title: "退房时间",
                    key: "endDate",
                    width: 100,
                    align: "center",
                    render(h, params) {
                        return getDate(params.row.endDate);
                    }
                },
                {
                    title: "床型",
                    key: "bedType",
                    width: 100,
                    align: "center",
                },
                {
                    title: "套餐名称",
                    key: "comboName",
                    width: 100,
                    align: "center",
                },
                {
                    title: "操作",
                    key: "action",
                    align: "center",
                    fixed: "right",
                    width: 100,
                    render: (h, params) => {
                        let disabled = false;
                        if (params.row.status == "TY_ORDER_STATUS") {
                            disabled = true;   
                        }else{
                            disabled = false;
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
                                    this.checkOut(params.index)
                                }
                            }
                        },
                        "退房"
                        ),
                    ]);
                    }
                }
            ]
        }
    },
    methods: {
        grabble() {
            // var endTime = "2018-07-15 00:00:00";
            // this.getNowFormatDate();
            // this.comptime(this.currentdate,endTime);
            if(this.mobile == "") {
                this.$Message.error("请输入手机号");
                return false;
            }
            this.loading = true;
            this.axios
                .get(`${this.AjaxUrl}/ty_business/order/getHotelOrderDetail`, {
                    params: {
                        mobile: this.mobile,
                        status: "TICKET_SUCCESS"
                    }
                })
                .then(res => {
                    if (res.errorCode == 200) {
                        this.tableData = res.data;
                        this.loading = false;
                    }else{
                        this.loading = false;
                        console.log(res.errorCode)
                    }
                })
                .catch(err => {
                    this.loading = false;
                });
        },
        comptime(beginTime,endTime) {
            var beginTimes = beginTime.substring(0, 10).split('-');
            var endTimes = endTime.substring(0, 10).split('-');

            beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
            endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
            var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
            console.log(a);
            if (a <= 0) {
                this.timeShow = false;
                this.fruit = [];
            } else if (a > 0) {
                this.timeShow = true;
                let b = Date.parse(endTime) - Date.parse(beginTime);
                console.log(b);
                let c= b/3600/1000/24;
                console.log(Math.floor(c));
                let t = [];
                let d = Date.parse(beginTime);
                for(let i = 0; i<c; i++){
                    t.push(d);
                    d = d + 86400000;
                }
                console.log(getDate(d));
                for(let j = 0; j<t.length; j++) {
                    this.outTimeList.push(getDate(t[j]));
                }
                console.log(this.outTimeList);
            } 
        },
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
            this.currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + date.getHours() + seperator2 + date.getMinutes()
                    + seperator2 + date.getSeconds();
            return console.log(this.currentdate);
        },
        // 退房弹框
        checkOut(index) {
            this.modal1 = true;
            this.outTimeList = [];
            this.fruit = [];
            this.orderNo = "";
            this.roomSum = "";
            this.timeList = this.tableData[index];
            this.orderNo = this.tableData[index].orderNo;
            this.roomSum = this.tableData[index].roomSum;
            let endDay = getDate(this.timeList.endDate) + " " +"00:00:00";
            var to = "2018-07-25 00:00:00";
            this.comptime(this.currentdate,endDay);
        },
        cancel() {
            this.modal1 = false;
        },
        ok() {
            const title = '提示';
            const content = '<h3>退房成功</h3>';
            let data = {};
            if(this.orderNo == "") {
                this.$Message.error("请输入订单号");
                return false;
            }
            if(this.roomSum == "") {
                this.$Message.error("请输入退房数量");
                return false;
            }
            this.addLoading = true;
            data.orderNo = this.orderNo;
            data.roomSum = this.roomSum;
            data.refundDate = this.fruit.join(",");
            this.axios
                .post(
                `${this.AjaxUrl}/ty_business/order/hotel/refund`,
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
                        this.grabble();
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
.tickeClass{
    margin: 5px 0;
}
.tickeClass label{
    display: inline-block;
    width: 80px;
}
</style>

