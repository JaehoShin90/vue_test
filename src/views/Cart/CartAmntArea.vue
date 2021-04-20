<template>
    <div id="sideArea" class="cartPriceWing">
        <div class="priceWrap vue-affix affix-top">
            <div class="inner">
                <div class="priceTitle">
                    결제예정금액
                </div>
                <div class="priceList">
                    <dl>
                        <dt>상품금액</dt>
                        <dd>{{setComma(totalAmnt.amnt)}}<span>원</span></dd>
                    </dl>
                    <dl>
                        <dt>배송비</dt>
                        <dd>0<span>원</span></dd>
                    </dl>
                    <dl>
                        <dt>상품할인금액</dt>
                        <dd>0<span>원</span></dd>
                    </dl>
                </div>
                <dl class="totalPrice">
                    <dt>총<span class="colorPrimary"> {{setComma(totalAmnt.cnt)}}</span> 건</dt>
                    <dd class="price">
                        <strong class="price colorPrimary">{{setComma(totalAmnt.amnt)}}</strong>
                        <span class="won colorPrimary">원</span>
                    </dd>
                </dl>
                <ul class="cartBtnSet">
                    <li>
                        <a href="#none" class="btnOrder">주문하기</a>
                    </li>
                    <li>
                        <a href="#none" class="btnGift">선물하기</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {
    computedMixin
}
from '../../assets/js/Common.js'
export default {
    name: "CartAmntArea"
    , props: {
        totalAmnt: Object
    }
    , mixins: [computedMixin]
}
</script>
