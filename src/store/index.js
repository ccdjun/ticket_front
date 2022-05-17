import Cookie from 'js-cookie'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
    },
    mutations:{
        setToken(state,val){
            state.token = val
            Cookie.set('token', val)        
        },
        clearToken(state) {
            state.token = ''
            Cookie.remove('token')
        },
        getToken(state)  {
            state.token = state.token || Cookie.get('token')
        }
    }
})

export default store