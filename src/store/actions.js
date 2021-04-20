import {
    getProductList
} from '../api/Product.js'

export default {
    GET_PRODUCT_LIST(context){
        getProductList()
        .then((response) => context.commit('SET_PRODUCTLIST', response.data))
        .catch(error => console.log(error));
    }
}