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

        </el-table-column>
            <el-table-column
            stripe
            align="center"
            prop="target"
            label="目的地"
            >
        </el-table-column>

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
    
    </div>
    
</template>

<script>
import Card from '../components/Card'
import axios from 'axios'


export default {
    data() {
        return {
            tableData: '',
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
            console.log(this.tableData)
        })
       },
       delete_order(order_id){
           let api = 'api/order/delete_order'
           console.log(order_id)
           axios.post(api, `order_id=${order_id}`).then(res=>{
               console.log(res)
               this.getData()
           })

       },

    },
    mounted(){
        this.getData()
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
