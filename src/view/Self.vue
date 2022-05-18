<template>
    <div>
        <div class="page" v-show="isShow">
            <el-button type="success" @click="dialogFormVisible = true">修改信息</el-button>
            <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.new_username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" :label-width="formLabelWidth">
                    <el-input v-model="form.new_password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.new_email" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit_info">提交</el-button>
            </div>
            </el-dialog>
        </div>
        <el-table
        stripe
        border
        :data="tableData"
        style="width: 100%; font-size: 18px"
        >
        <el-table-column label="个人信息" align="center">

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
                new_username:'',
                new_password:'',
                new_email: '',
                delivery: false,

            },
            formLabelWidth: '120px',
            isShow: true,

        }
    },
    components: {
        Card
    },
    methods: {
       getData(){
           const id = this.$store.state.token.split('||')[0]
           let api = `api/user/show_self?user_id=${id}`
           axios.get(api).then((result)=>{
            this.tableData = result.data.data
            this.form.new_username = this.tableData[0].user_name
            this.form.new_email = this.tableData[0].email
        })
       },
       submit_info(){
        const id = this.$store.state.token.split('||')[0]
        let api = 'api/user/modify'
        const data = `id=${id}&username=${this.form.new_username}&password=${this.form.new_password}&email=${this.form.new_email}`
        axios.post(api, data).then(res=> {
            console.log(res)
            this.getData()
            this.dialogFormVisible = false

        })

       }
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
