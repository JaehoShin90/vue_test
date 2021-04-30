import {
    getCartCnt
    , login
} from '../api/Product.js'


// 사용 하려면 this.$store.dispatch('함수명') 으로 사용가능하다.
export default {
    GET_MMBR_CART_CNT(context){
        var mbNo = this.state.mbNo === '' ? sessionStorage.getItem("mbNo") : this.state.mbNo;
        getCartCnt(mbNo)
        .then(response => context.commit('SET_MMBR_CART_CNT', response.data))
        .catch(error => console.log(error));
    }
    , LOGIN(context, {username, password}){
        login(username, password)
        .then(response => context.commit('LOGIN_AFTER', response))
        .catch(error => console.log(error));
    }
}