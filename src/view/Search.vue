<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="出发地">
                <el-input v-model="formInline.source" placeholder="出发地"></el-input>
            </el-form-item>
            <el-form-item label="目的地">
                <el-input v-model="formInline.target" placeholder="目的地"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
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
            label="序号"
           >
           <template slot-scope="scope">
            <p>{{ scope.$index +1 }}</p>
            </template>
        </el-table-column>
        
        <el-table-column
            stripe
            align="center"
            prop="source"
            label="出发点"
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
            label="余票数量">
        </el-table-column>
    
        </el-table-column>
        </el-table>
    </div>
    
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        tableData: '',
        formInline: {
          source: '',
          target: '',
        }
      }
    },
    methods: {
      search() {
        let api = 'api/order/search?' + `source=${this.formInline.source}&target=${this.formInline.target}`
        axios.get(api).then(res=>{
            this.tableData = res.data.data
        })
        
      }
    }
  }
</script>