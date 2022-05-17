<template>
        <el-table
        stripe
        border
        @row-click="set_redirct_data"
        :data="tableData"
        style="width: 100%; font-size: 18px"
        >
        <el-table-column label="用户信息" align="center">

        <el-table-column stripe align="center" label="物资ID" width="240" prop='index'>

        </el-table-column>

        <el-table-column
            stripe
            align="center"
            prop="id"
            label="用户id">
        </el-table-column>
        <el-table-column
            stripe
            align="center"
            prop="user_name"
            label="用户姓名">
        </el-table-column>
        
        <el-table-column
            stripe
            align="center"
            prop="email"
            label="用户邮箱">
        </el-table-column>

        <!-- <el-table-column label="操作" align="center" prop="id">
            <template slot-scope="scope">
                <el-button size="mini" type='danger' @click="delete_goods(scope.row.id)">删除</el-button>
            </template>
        </el-table-column> -->
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
            dialogFormVisible: false,
            form: {
                goods_price: '',
                goods_type: '',
                goods_name: '',
                delivery: false,
            },
            formLabelWidth: '120px'

        }
    },
    components: {
        Card
    },
    methods: {
       getData(){
           let api = 'api/user/show_user'
           axios.get(api).then((result)=>{
           this.tableData = result.data.data
           console.log(this.tableData)
        //    console.log(this.tableData)
        })
       },
       add_goods(){
           let goods_price = this.form.goods_price
           let goods_type = this.form.goods_type
           let goods_name = this.form.goods_name
           let data = `goods_price=${goods_price}&goods_type=${goods_type}&goods_name=${goods_name}`
           let api = 'api/goods/add_goods'
           axios.post(api,data).then(res=>{
            //    console.log(res)
                this.getData()
                this.dialogFormVisible = false
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
