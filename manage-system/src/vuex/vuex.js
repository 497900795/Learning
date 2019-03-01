import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//id表示当前登录人员的编号，-1表示无人登录
const store = new Vuex.Store({
    state: {
        id: -1
    }
})

export default store