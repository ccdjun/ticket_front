<template>
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-container">
        <h3 class="login_title">注册新用户</h3>
        <el-form-item label="用户名" label-width="80px" prop="username" class="username">
            <el-input type="input" v-model='form.username' autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password" class="username">
            <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email" class="username">
            <el-input type="input" v-model="form.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item class="login_submit">
            <el-button type="primary" @click="register" class="register">注册</el-button>            
        </el-form-item>

    </el-form>
</template>

<script>

import axios from 'axios'

export default {
    name: 'register',
    data() {
        return {
            form: {

            },
            rules: {
              username: [
                  {required: true, message: '请输入用户名', tigger: 'blur'},
                  {
                      tigger: "blur"
                  }
              ],
              password: [
                  {required: true, message:'请输入密码', tigger: "blur"}
              ],
              email: [
                  {required: true, message:'请输入邮箱', tigger: "blur"}

              ]
            }
        }
    },
    methods:{
        register(){
            let api = 'api/user/register'
            let data = `username=${this.form.username}&password=${this.form.password}&email=${this.form.email}`
            axios.post(api, data).then(res=>{
                console.log(res)
                if (res.data.status==200){
                    alert('注册成功')
                    this.$router.push('/login')
                }else{
                    alert('注册失败')
                }
            })
            // this.$router.push('/login')
        }
    }
}
</script>

<style lang="less" scoped>
.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6ca;
}

.login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}

.login_submit {
    margin: 10px auto 0px auto;
}



</style>