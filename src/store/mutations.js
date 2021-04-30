import router from '../routes/index.js'
// 사용하려면 this.$store.commit(함수명)으로 사용 가능하다.

export default {
    SET_MMBR_CART_CNT(state, mmbrCartCnt){
        state.mmbrCartCnt = mmbrCartCnt;
    }
    , LOGIN_AFTER(state, resData){
        if(resData.status == "200" && resData.data.token){
            // document.cookie = "token=" + resData.data.token + "; path=/ ";
            sessionStorage.setItem("token", resData.data.token);
            sessionStorage.setItem("mbNo", JSON.parse(resData.config.data).userId);
            // document.cookie = "token=; expires=Thu, 01 Jan 1999 00:00:10 GMT;"
            state.mbNo = JSON.parse(resData.config.data).userId;
            this.dispatch('GET_MMBR_CART_CNT');
            router.router.push({ name: 'PrdtCmpn'});
        }
    }
    , LOGOUT(state){
        state.mbNo = "";
        state.mmbrCartCnt = 0;
        router.router.push({ name: 'Login'});
    }
}