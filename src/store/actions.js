import {
    getCartCnt
} from '../api/Product.js'


// 사용 하려면 this.$store.dispatch('함수명') 으로 사용가능하다.
export default {
    GET_MMBR_CART_CNT(context){
        getCartCnt(this.state.mbNo)
        .then(response => context.commit('SET_MMBR_CART_CNT', response.data))
        .catch(error => console.log(error));
    }
}