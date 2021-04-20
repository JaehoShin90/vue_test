<template>
    <div class="container">
        <h2 class="pageTitle">
            장바구니
        </h2>
        <div class="cartWrap">
            <div class="cartContents">
                <CartItemArea 
                    v-on:setTotalAmnt="setTotalAmnt"
                    v-on:setTotalCnt="setTotalCnt"
                    v-bind:totalAmnt="totalAmnt">

                </CartItemArea>
                <CartAmntArea 
                    v-bind:totalAmnt="totalAmnt">
                </CartAmntArea>
            </div>
        </div>
    </div>    
</template>

<script>
import CartItemArea from './CartItemArea'
import CartAmntArea from './CartAmntArea'

export default {
    name: "CartCmpn"
    , components: {
        CartItemArea
        , CartAmntArea
    }
    , data: function(){
        return {
            totalAmnt : {
                amnt : 0
                , cnt : 0
            }
        }
    }
    , methods: {
        setTotalAmnt(amnt){
            this.totalAmnt.amnt += amnt;
        }
        , setTotalCnt(cnt){
            this.totalAmnt.cnt += cnt;
        }
    }
}
</script>

<style>
    @import '../../assets/css/Cart.css';
</style>