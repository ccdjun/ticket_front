<template>
    <div>
        <div class="page" v-show="isShow">
            <el-button type="success" @click="dialogFormVisible = true">新增车程信息</el-button>
            <el-dialog title="新增车程信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="始发地" :label-width="formLabelWidth">
                    <el-input v-model="form.source" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="目的地" :label-width="formLabelWidth">
                    <el-input v-model="form.target" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="余票数量" :label-width="formLabelWidth">
                    <el-input v-model="form.num" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出发时间" :label-width="formLabelWidth">
                    <el-input v-model="form.begin" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="到达时间" :label-width="formLabelWidth">
                    <el-input v-model="form.end" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit_ticket">确 定</el-button>
            </div>
            </el-dialog>
        </div>
        <el-table
        stripe
        border
        :data="tableData"
        style="width: 100% ; font-size: 18px"
        >
        <el-table-column label="车票信息" align="center">

        <el-table-column
            stripe
            align="center"
            prop="index"
            label="序号"
            width="180">
        </el-table-column>
        <el-table-column
            stripe
            align="center"
            prop="source"
            label="出发点"
            width="240">
        </el-table-column>
            <el-table-column
            stripe
            align="center"
            prop="target"
            label="目的地"
            width="240">
        </el-table-column>
        <el-table-column
            stripe
            align="center"
            prop="num"
            label="余票数量"
            width="200">
        
        </el-table-column>

        <el-table-column
            stripe
            align="center"
            prop="begin"
            label="出发时间"
            width="200">
        
        </el-table-column>

        <el-table-column
            stripe
            align="center"
            prop="end"
            label="到达时间"
            width="200">
        
        </el-table-column>
        
        <el-table-column
            stripe
            align="center"
            prop="num"
            label="修改余票"
            width="100"
            v-if="isShow">
            
            <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.num"/>
            </template>
        </el-table-column>

        <el-table-column
            stripe
            align="center"
            prop="goods.goods_num"
            width="200"
            label="操作">
            <template slot-scope="scope">
                <el-button size="mini" type='primary' v-if="scope.row.num>0" @click="buy_ticket(scope.row.id)">买票</el-button>
                <el-button v-if="scope.row.num==0" size="mini" type='danger' @click="lock_ticket(scope.row.id)">抢票</el-button>
                <el-button size="mini" type='warning' v-show="isShow" @click="modify(scope.row.id, scope.row.num)">修改余票</el-button>
            </template>
        </el-table-column>
        
    
        </el-table-column>
        </el-table>
        <div class="page" id="mychart" :style="myChartStyle"></div>


    </div>
</template>

<script>
import Card from '../components/Card'
import axios from 'axios'
import * as echarts from 'echarts';



export default {
    data() {
        return {
            isShow: false,
            tableData: '',
            dialogFormVisible: false,
            form: {
                source: '',
                target: '',
                num: '',
                begin: '',
                end: '',
                delivery: false,
            },
            formLabelWidth: '120px',
            isShow: false,
            chartPie: null,
            myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
        }
    },
    components: {
        Card
    },
    methods: {
       getData(){
           let api = 'api/order/show_ticket'
           axios.get(api).then((result)=>{
           this.tableData = result.data.ticket_info
           console.log(result)
        })
       },
       buy_ticket(ticket){
           const user_id = this.$store.state.token.split('||')[0]
           let api = 'api/order/grab_tickets'
           const data = `user_id=${user_id}&ticket_id=${ticket}`
           axios.post(api,data).then(res=>{
                if (res.data.status==200){
                    this.getData()
                }else{
                    alert('买票失败')
                }
           })
       },
       lock_ticket(ticket){
           const user_id = this.$store.state.token.split('||')[0]
           const email = this.$store.state.token.split('||')[2]
           let api = 'api/order/lock_order'
           const data = `user_id=${user_id}&ticket_id=${ticket}&email=${email}`
           alert('已经提交任务请在订单页面查看')
           axios.post(api,data).then(res=>{
                if (res.data.status==200){
                    this.getData()
                }else{
                    alert('抢票失败')
                }
           })
       },
       submit_ticket(){
           let api = 'api/order/add_ticket'
           const source = this.form.source
           const target = this.form.target
           const num = this.form.num
           const end = this.form.end
           const begin = this.form.begin

           const data = `source=${source}&target=${target}&num=${num}&begin=${begin}&end=${end}`
           axios.post(api,data).then(res=>{
               console.log(res)
               this.dialogFormVisible = false
               this.getData()
           })
       },
       cc(){
            const key = this.$store.state.token.split('||')[0]
            const api = `api/user/show_user_status?user_id=${key}`
            axios.get(api).then(res => {
                if(res.data.user_status == 1){
                    this.isShow = true
                    console.log(res)
                }
            })
       },
       modify(id,num){
           if(num < 0){
               alert('请输入正数')
               return
           }
           const api = 'api/order/modify_num'
           const data = `ticket_id=${id}&num=${num}`
            axios.post(api, data).then(res =>{
                if (res.data.status == 200){
                    this.getData()
                }else{
                    alert('修改失败')
                }
            })
       },
       DrawData(){
            let api = 'api/order/bi'
            axios.get(api).then(res=>{
                const yData = [...res.data.data.num]
                const xData = [...res.data.data.city]
                const option = {
                    title: { text: '车票数据分析' ,left:'center'},
                    xAxis: {
                        data: xData
                    },
                    yAxis: {},
                    series: [
                    {
                        name: '大数据分析',
                        type: "bar", //形状为柱状图
                        data: yData,
                        barWidth: 40,
                        // barGap: "0%", // 两个柱子之间的距离相对于柱条宽度的百分比;
                        // barCategoryGap: "40%", // 每侧空余的距离相对于柱条宽度的百分比
                        itemStyle: {
                            normal: {
                                color:function(){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                            },
                    },
                }
                ]
            };
            const myChart = echarts.init(document.getElementById("mychart"));
            myChart.setOption(option);
            //随着屏幕大小调节图表
            window.addEventListener("resize", () => {
                myChart.resize();
            });
            })
        },
    },
    mounted(){
        this.getData(),
        this.cc(),
        this.DrawData()
    },
}
</script>

<style>
.list-item {
    display: inline-block;
    margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
    transition: all 1s;
}

.list-enter,
.list-leave-to
{
    opacity: 0;
    transform: translateY(30px);
}
.train{
    min-height: 600px;
}
.loadingBox{
    text-align: center;
    margin-top:20px;
    margin-bottom:20px;
}
.el-pagination {
    text-align: center;
    /* font-size: 20px; */
}

.comment {
    text-align: center
}

.page {
    background: white;
}




</style>
