<template>
    <div class="detailWrap">
        <div class="itemController" v-if="cartList.length > 0" v-bind:class="{'displayNone':isLoading}">
            <div class="checkboxController">
                <input id="checkboxController" type="checkbox" class="cur_hand" v-model="allChk">
                <label for="checkboxController" class="cur_hand">전체선택</label>
            </div>
            <div class="deleteBtnGroup">
                <button type="button" class="deleteCartItems" @click="clkDelChk">
                    <span>선택삭제</span>
                </button>   
            </div>
        </div>
        <div class="cartSlideWrapper nonHolidays active" v-if="cartList.length > 0" v-bind:class="{'displayNone':isLoading}">
            <div class="cartSlideWrap">
                <div class="cartSlideInnerCont">
                    <div class="cartListWrapper" v-for="(tData, index) in cartList" :key="tData.trNo">
                        <div class="cartHeader">
                            <div class="checkboxSet">
                                <input :id="'cart0_' + index" :name="'cart0_' + index" type="checkbox" class="cur_hand" :value="index" v-model="vndrAllChk" @click="clkVndrAll(index)">
                                <label :for="'cart0_' + index" class="cur_hand">
                                    {{tData.trNo}}
                                    <p class="branch">
                                    </p></label>
                            </div>
                        </div>
                        <!-- 벤더사 별 상품 리스트 -->
                        <CartItemDtlList 
                            :dtlList="tData.cartList" 
                            v-bind:trNum="index + 1" 
                            v-bind:isAllChk="vndrAllChk.indexOf(index)"
                            v-on:updateCartList="updateCartList" 
                            v-on:setVndrAllchk="setVndrAllchk" 
                            v-on:setVndrTotalAmnt="setVndrTotalAmnt"
                            v-on:setVndrTotalCnt="setVndrTotalCnt"
                            :ref="'cart0_' + index"
                        >

                        </CartItemDtlList>
                        <div class="cartFooter">
                            <p>
                                {{vndrAmntInfo[index].amnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}원 +
                                배송비 0원
                                - 할인 0원
                                =
                                <span class="price">
                                    <strong>0</strong>원
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="cartListWrapper2" v-if="cartList.length == 0" v-bind:class="{'displayNone':isLoading}">
            <div class="dataNullWrap">
                <div class="dataNull cart">
                    <p>장바구니에 담긴 상품이 없어요.</p>
                </div>
            </div>
        </div>
        <Spinner v-bind:class="{'displayNone':!isLoading}"></Spinner>
    </div>
</template>

<script>
import CartItemDtlList from './CartItemDtlList'
import {CartItemArea} from '../../assets/js/CartItemArea.js'
import Spinner from '../../components/Spinner'


export default {
    name: "CartItemList" 
    , components:{
        CartItemDtlList
        , Spinner
    }
    , props: {
         totalAmnt : Object
    }
    , data : function(){
        return {
            cartList : []
            , vndrAllChk : []
            , vndrAmntInfo : []
            , isLoaing : false
        }
    }
    , mixins: [CartItemArea]
    , created() {
        this.isLoading = true;
        this.getCartList();
    }
    , computed: {
        allChk:{
            get: function(){
                if(this.vndrAllChk.length != this.cartList.length || this.cartList.length == 0){
                    return false;
                }else{
                    return true;
                }
            }
            , set:function(e){
                if(e){
                    for(var i = 0 ; i < this.cartList.length; i++){
                        if(this.vndrAllChk.indexOf(i) < 0){
                            this.$refs['cart0_' + i][0].setClkEventStack("");
                            this.vndrAllChk.push(i);
                        }
                    }
                }else{
                    this.vndrAllChk = [];
                }
            }
        }
    }
}
</script>
