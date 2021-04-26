// 사용하려면 this.$store.commit(함수명)으로 사용 가능하다.

export default {
    SET_MMBR_CART_CNT(state, mmbrCartCnt){
        state.mmbrCartCnt = mmbrCartCnt;
    }
}