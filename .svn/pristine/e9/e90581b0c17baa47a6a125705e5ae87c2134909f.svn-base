<template>
    <div>
        <Toptitle :Title="Title" />
        <div>
            <Row class="ticketList">
                <Col span="8">
                    <label for="">核销类型</label>
                    <Select  v-model="ticketType" style="width: 70%">
                        <Option  key="1" value="1">入住</Option>
                        <Option  key="2" value="2">退房</Option>
                    </Select>
                </Col>
                <Col span="8">
                    <label for="">订单号</label>
                    <Input v-model="orderNo" placeholder="请输入订单号" style="width: 250px"></Input>
                </Col>
                <Col span="8"> 
                    <label for="">酒店名称</label>
                    <Input v-model="hotelName" placeholder="请输入酒店名称" style="width: 250px"></Input>
                </Col>
            </Row>
            <div style="text-align: center;margin:10px 0;">
                <Button type="success" @click="grabble">搜&nbsp;&nbsp;&nbsp;&nbsp;索</Button>
            </div>
            <div>
                <div class="ticketList">
                    <Table style="margin:0 auto;" border :loading="loading" :columns="columns1" :data="tableData"></Table>
                    <div style="textAlign:right;margin-top:10px">
                        <Page :total.sync="total" :current.sync="pageNum" :pageSize="pageSize"  show-elevator></Page>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Toptitle from "./../Toptitle";
import { getDate,getDateTime0, datetime} from "../../js/public";
export default {
    components: {
        Toptitle,
    },
    data() {
        return {
            Title: "核销记录",
            mobile: "",
            modal1: false,
            loading: false,
            orderNo: "",
            cityList: [],
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: null,
            ticketType: "",
            orderNo: "",
            hotelName: "",
            columns1: [
                {
                    title: "核销类型",
                    key: "ticketType",
                    align: "center",
                    render(h, params){
                        if (params.row.ticketType == "1") {
                            return "入住";
                        }else if(params.row.ticketType == "2"){
                            return "退房";
                        }
                     }
                },
                {
                    title: "订单号",
                    key: "orderNo",
                    align: "center",
                },
                {
                    title: "酒店名称",
                    key: "hotelName",
                    align: "center"
                },
                {
                    title: "房间名称",
                    key: "roomName",
                    align: "center",
                },
                {
                    title: "套餐名称",
                    key: "comboName",
                    align: "center",
                },
                {
                    title: "房间数量",
                    key: "roomSum",
                    align: "center"
                },
                {
                    title: "姓名",
                    key: "realname",
                    align: "center"
                },
                {
                    title: "手机号",
                    key: "mobile",
                    align: "center"
                },
                {
                    title: "核销时间",
                    key: "ticketTime",
                    align: "center",
                    render(h, params) {
                        return getDateTime0(params.row.ticketTime);
                    }
                },
            ]
        }
    },
    watch: {
        "pageNum": {
            handler: function(val, oldVal) {
                this.first();
            },
            deep: true
        }
    },
    methods: {
        grabble() {
            this.pageNum = 1;
            this.first();
        },
        first() {
            this.loading = true;
            let data = {};
            data.ticketType = this.ticketType;
            data.orderNo = this.orderNo;
            data.hotelName = this.hotelName;
            data.pageNum = this.pageNum;
            this.axios
                .get(`${this.AjaxUrl}/ty_business/hotel/ticket/record/getList`, {
                    params: data
                })
                .then(res => {
                    if (res.errorCode == 200) {
                        this.tableData = res.data.list;
                        this.total = res.data.total;
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

    },
    mounted () {
        this.first();
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

