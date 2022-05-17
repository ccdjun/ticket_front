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
        @row-click="set_redirct_data"
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
            label="余票数量">
        </el-table-column>
        
        <el-table-column
            stripe
            align="center"
            prop="goods.goods_num"
            label="操作">
            <template slot-scope="scope">
                <el-button size="mini" type='primary' @click="buy_ticket(scope.row.id)">买票</el-button>
                <el-button size="mini" type='danger' @click="lock_ticket(scope.row.id)">抢票</el-button>
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
            isShow: false,
            tableData: '',
            dialogFormVisible: false,
            form: {
                source: '',
                target: '',
                num: '',
                delivery: false,
            },
            formLabelWidth: '120px',
            esdata:''

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
           axios.post(api,data).then(res=>{
                if (res.data.status==200){
                    alert('已经提交任务请在订单页面查看')
                    this.getData()
                }else{
                    alert('抢票失败')
                }
           })
       },
       },
       submit_ticket(){
           let api = 'api/order/    '
           const source = this.form.source
           const target = this.form.target
           const num = this.form.num
           const data = `source=${source}&target=${target}&num=${num}`
           axios.post(api,data).then(res=>{
               console.log(res)
               this.dialogFormVisible = false
               this.getData()
           })
       },
       userStatus(){
            const key = this.$store.state.token.split('||')[1]
            if(key == 1){
                this.isShow = true
            }
        },
    mounted(){
        this.getData(),
        this.userStatus()
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



</style>
