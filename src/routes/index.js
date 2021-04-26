import Vue from 'vue'
import VueRouter from 'vue-router'
import Product from '../views/Product/ProductMain'
import PrdtCmpn from '../views/Product_component/PrdtCmpn'
import CartCmpn from '../views/Cart/CartCmpn'

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history'
    , routes: [
            {path: '/Product', name: 'Product', components: {contents : Product}}
        , {path: '/PrdtCmpn', name: 'PrdtCmpn', components: {contents : PrdtCmpn}}
        , {path: '/Cart', name: 'CartCmpn', components: {contents : CartCmpn}}
    ]
})