<template>
    <div>
        <el-table
        stripe
        border
        @row-click="set_redirct_data"
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
            tableData: ''

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
            // console.log(result)
            this.tableData = result.data.data
           console.log(this.tableData)
        //    console.log(this.tableData)
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
