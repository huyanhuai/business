<template>
    <div class="hotelTicket">
        <Toptitle :Title="Title" />
         <!-- <Tabs value="name1" style="width:95%;margin:0 auto;">
            <TabPane label="验票" name="name1"> -->
                <Row>
                    <Col span="8">&nbsp;</Col>
                    <Col span="8">
                        <label for="">手机号</label>
                        <Input v-model="mobile" placeholder="请输入手机号" style="width: 60%"></Input>
                        <Button type="success" @click="grabble">搜索</Button>
                    </Col>
                    <Col span="8"> &nbsp;</Col>
                </Row>
                <div class="ticketList">
                    <Table style="margin:0 auto;" border :loading="loading" :columns="columns1" :data="tableData"></Table>
                </div>
            <!-- </TabPane>
        </Tabs> -->

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
import Toptitle from "./../Toptitle";
import { getDate} from "../../js/public";
export default {
    components: {
        Toptitle,
    },
    data() {
        return {
            Title: "酒店验票",
            mobile: "",
            checkCode: "",
            loading: false,
            addLoading: false,
            modal1: false,
            orderNo: "",
            cityList: [],
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
                    title: "预定房间数量",
                    key: "roomSum",
                    width: 100,
                    align: "center"
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
                    return h("div", [
                        h(
                        "Button",
                        {
                            props: {
                            type: "primary",
                            size: "small"
                            },
                            style: {
                            margin: "3px 5px 3px 0",
                            },
                            on: {
                            click: () => {
                                this.ticketcheck(params.row.orderNo)
                            }
                            }
                        },
                        "验票"
                        ),
                    ]);
                    }
                }
            ],
            pageNum: 1,
            pageSize: 10,
            total: null,
            orderNo: null,
        }
    },
    methods: {
        grabble() {
            if(this.mobile == "") {
                this.$Message.error("请输入手机号");
                return false;
            }
            this.loading = true;
            this.axios
                .get(`${this.AjaxUrl}/ty_business/order/getHotelOrderDetail`, {
                    params: {
                        mobile: this.mobile,
                        status: "PAY_SUCCESS"
                    }
                })
                .then(res => {
                    if (res.errorCode == 200) {
                        this.tableData = res.data;
                        this.loading = false;
                    }else{
                        console.log(res.errorCode)
                    }
                })
                .catch(err => {});
        },
        ticketcheck(orderNo) {
            this.checkCode = "";
            this.modal1 = true;
            this.orderNo = orderNo;
        },
        ok() {
            this.addLoading = true;
            const title = '提示';
            const content = '<h3>验票成功</h3>';
            let data = {};
            if(this.checkCode == "") {
                this.$Message.error("请输入验票码");
                this.addLoading = false;
                return false;
            }
            data.orderNo = this.orderNo;
            data.checkCode = this.checkCode;
            this.axios
                .post(
                `${this.AjaxUrl}/ty_business/order/ticket/checkHotelTicket`,
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
                        this.checkList();
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
    },
    mounted () {
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
    /* padding: 0px 20px; */
}
.ivu-table-wrapper{
    /* max-width: 1100px; */
}
</style>

