import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        mbNo : "2"
        , mmbrCartCnt : 0
    }
    , getters: { // Getters 사용하려면 this.$store.getters.함수명 으로 사용이 가능하다. 
        FetchedMmbrCartCnt(state){
            return state.mmbrCartCnt;
        }
    }
    , mutations
    , actions
})