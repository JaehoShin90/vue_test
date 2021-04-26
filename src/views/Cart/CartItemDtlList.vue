<template>
    <ul>
        <li v-for="(dtl, index) in dtlList" :key="dtl.cartSn" class="col-3 withProduct hasDelete">
            <div class="cartProduct order-1 hasCheckbox">
                <input :id="'cartProduct' + trNum + '_' + (index + 1)" type="checkbox" class="cur_hand" v-model="itemChk" :value="dtl.cartSn" @click="chkClick(dtl)">
                <label :for="'cartProduct' + trNum + '_' + (index + 1)" class="blind">{{dtl.spdNm}}</label>
                <div class="productItem">
                    <div class="productThumb">
                        <a href="#">
                        <img :src="(dtl.imgJsn && dtl.imgJsn[0] ? 
                            ('https://contents.lotteon.com/itemimage' + dtl.imgJsn[0].imgRteNm + dtl.imgJsn[0].imgFileNm)
                            : ''
                        )" :alt="dtl.spdNm"></a>
                        
                    </div>
                    <div class="productData">
                        <p class="productFlag"></p>
                        <a href="#">
                            <p class="productTitle">
                                <strong>{{dtl.brdNm}}</strong>{{dtl.spdNm}}
                            </p>
                        </a>
                        <p class="productDeliveryInfo">
                            {{dtl.estmtDlvTxt}}
                        </p>
                    </div>
                </div>
            </div>

            <!-- 컴포넌트 분리 -->
            <div class="cartQty order-2">
                <div class="spinnerBox">
                    <button class="minus" @click="odQtyMinus(dtl)" :class="isMinusDisabled(dtl)">
                        -
                    </button>
                    <div class="number">
                        <input type="number" 
                            :id="'number_' + (index + 1)" 
                            :max="dtl.itmByMaxPurPsbJsn.maxPurQty" 
                            :value="dtl.odQty" 
                            @input="keyDownOdQty($event, dtl)" 
                            @keyup="keyUpOdQty($event, dtl)">
                        <label :for="'number_' + (index + 1)" class="blind">{{dtl.odQty}}</label>
                    </div>
                    <button class="plus" @click="odQtyPlus(dtl)" :class="isPlusDisabled(dtl)">
                        +
                    </button>
                </div>
                <!-- <button class="cartWish sizeMini alignLeft wishGray">
                    ♡
                </button> -->
            </div>

            <div class="cartPrice order-3"><!---->
                <p class="currentPrice">
                    <span style="display: none;">
                        <img src="//static.lotteon.com/p/order/assets/img/s_loading.gif" class="s_loading">
                    </span>
                    <strong>{{setComma(dtl.odQty * dtl.slPrc)}}</strong>원
                </p>
                <p class="priceInfo" style="display: none;">
                                
                </p>
                <button type="button" class="deleteItem" @click="clkDeleteCart(dtl)"><span class="blind">삭제하기</span></button>
            </div>
        </li>
    </ul>
</template>

<script>
import {cidlMixin} from '../../assets/js/CartItemDtlList.js'
import {
    computedMixin
}
from '../../assets/js/Common.js'

export default {
    name: "CartItemDtlList"
    , props:{
        dtlList: Array
        , trNum : Number
        , isAllChk : Number
    }
    , data : function(){
        return {
            itemChk : []
            , isItemChkFlag : false
            , clkEventStack : []
        }
    }
    , mixins: [cidlMixin, computedMixin]
    , watch: {
        itemChk: function(){
            if(this.isItemChkFlag){
                this.isItemChkFlag = false;
                this.clkEventStack = [];
                var isFullChk = this.itemChk.length == this.dtlList.length;
                this.clkEventStack.push("itemChk");
                this.$emit("setVndrAllchk", this.trNum - 1, isFullChk);
            }
        }
        , isAllChk: function(){
            if(this.clkEventStack.length == 0){
                if(this.isAllChk >= 0){
                    for(var i = 0 ; i < this.dtlList.length ; i++){
                        if(this.itemChk.indexOf(this.dtlList[i].cartSn) < 0){
                            this.itemChk.push(this.dtlList[i].cartSn);
                            // 업체별 전체 금액 계산
                            this.$emit("setVndrTotalAmnt",(this.dtlList[i].odQty * this.dtlList[i].slPrc),this.trNum - 1);
                            this.$emit("setVndrTotalCnt", 1,this.trNum - 1);
                        }
                    }
                }else{
                    this.itemChk = [];
                    this.$emit("setVndrTotalAmnt","",this.trNum - 1);
                    this.$emit("setVndrTotalCnt", "",this.trNum - 1);
                }
            }else{
                this.clkEventStack = [];
            }
        }
    }
}
</script>
