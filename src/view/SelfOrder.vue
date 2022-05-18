<template>
    <div>
        <el-table stripe border :data="tableData" style="width: 100%" height="550" >
        <el-table-column label="订单信息" align="center">

        <el-table-column
            stripe
            align="center"
            label="序号"
           >
           <template slot-scope="scope">
            <p>{{ scope.$index +1 }}</p>
        </template>
        </el-table-column>
            
        <el-table-column
            stripe
            align="center"
            prop="user_name"
            label="用户姓名"
            >
        </el-table-column>

        <el-table-column
            stripe
            align="center"
            prop="email"
            label="用户邮箱"
            >
        </el-table-column>

        <el-table-column
            stripe
            align="center"
            prop="source"
            label="出发地"
            >
        </el-table-column>

        <el-table-column
            stripe
            align="center"
            prop="target"
            label="目的地"
            >
        </el-table-column>

        <el-table-column
        stripe
        align="center"
        prop="order_status"
        label="是否抢到票"
        >
            <template slot-scope="scope">
                <div v-if="scope.row.order_status==1">
                    <p>已抢到</p>
                </div>      
                <div v-if="scope.row.order_status==0">
                    <p>未抢到</p>
                </div>            
            </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type='danger' @click="delete_order(scope.row.id)">取消</el-button>
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
            tableData: '',
            chartPie: null,
            p_data: '',
            xData: ['湖北', '武汉', '长沙', 'Thu', 'Fri', 'Sat', 'Sun'] ,//横坐标
            yData: [23, 24, 18, 25,], //数据
            myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
        }
    },
    components: {
        Card
    },
    methods: {
       getData(){
           const id = this.$store.state.token.split('||')[0]
           let api = `api/order/show_self_order?user_id=${id}`
           axios.get(api).then((result)=>{
           this.tableData = result.data.data
        })
       },
       delete_order(order_id){
           let api = 'api/order/delete_order'
           axios.post(api, `order_id=${order_id}`).then(res=>{
               this.getData()
               console.log(res)
           })
       },
       get_p_Data(){
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
         initEcharts() {
            // 基本柱状图
            const option = {
                xAxis: {
                data: this.xData
                },
                yAxis: {},
                series: [
                {
                    type: "bar", //形状为柱状图
                    data: this.yData
                }
                ]
            };
            const myChart = echarts.init(document.getElementById("mychart"));
            myChart.setOption(option);
            //随着屏幕大小调节图表
            window.addEventListener("resize", () => {
                myChart.resize();
            });
            }
    },
    mounted(){
        this.getData();
        this.get_p_Data();
        // this.initEcharts();
    }
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
