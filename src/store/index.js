import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        mbNo : "2"
        , producList: []
    }
    , getters: {
        FetchedProducList(state){
            return state.producList;
        }
    }
    , mutations
    , actions
})