<template>
    <div class="TopBar">
        <mu-appbar title="12306抢票系统">
            <mu-icon-button icon="menu" slot="left" @click="toggle(true)" />
        </mu-appbar>
        <mu-drawer :open="open" :docked="docked" @close="toggle()">
            <mu-appbar title="菜单" >
                <mu-icon-button icon="close" slot="right" @click="toggle()" />
            </mu-appbar>
            <mu-list  @itemClick="docked ? '' : toggle()">
                <mu-list-item title="车票信息" to="/">
                    <mu-icon slot="right" value="home"/>
                </mu-list-item>            
            </mu-list>

            <mu-list  @itemClick="docked ? '' : toggle()">
                <mu-list-item title="搜索车票" to="/search">
                    <mu-icon slot="right" value="search"/>
                </mu-list-item>          
            </mu-list>

            <mu-list  @itemClick="docked ? '' : toggle()" v-show="show_status.isshow">
                <mu-list-item title="用户信息" to="/userlist">
                    <mu-icon slot="right" value="users"/>
                </mu-list-item>          
            </mu-list>
            <mu-list  @itemClick="docked ? '' : toggle()"  v-show="show_status.isshow">
                <mu-list-item title="订单信息" to="/order">
                    <mu-icon slot="right" value="orders"/>
                </mu-list-item>          
            </mu-list>
            <mu-list  @itemClick="docked ? '' : toggle()">
                <mu-list-item title="个人订单" to="/selforder">
                    <mu-icon slot="right" value="selforder"/>
                </mu-list-item>          
            </mu-list>
            <mu-list  @itemClick="docked ? '' : toggle()">
                <mu-list-item title="个人信息" to="/self">
                    <mu-icon slot="right" value="self"/>
                </mu-list-item>          
            </mu-list>
            <mu-list  @itemClick="docked ? '' : toggle()">
                <mu-list-item title="退出" @click="logout">
                    <mu-icon slot="right" value="logout"/>
                </mu-list-item>          
            </mu-list>
            <mu-divider />
        </mu-drawer>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "TopBar",
    data() {
        return {
            open: false,
            docked: true,
            show_status: {
                isshow: false
            }
        }
    },
    methods: {
        toggle(flag) {
            this.open = !this.open
            this.docked = !flag
        },
        logout() {
            this.$store.commit('clearToken')
            this.$store.commit('clearStatus')
            this.$router.push('/login')

        },
        userStatus(){
            const key = this.$store.state.token.split('||')[0]
            const api = `api/user/show_user_status?user_id=${key}`
            axios.get(api).then(res => {
                if(res.data.user_status == 1){
                    this.show_status.isshow = true
                }
            })
            
            // if(key == 1){
            //     this.show_status.isshow = true
            // }
        }
    },
    mounted(){
        this.userStatus()
    },
}
</script>
