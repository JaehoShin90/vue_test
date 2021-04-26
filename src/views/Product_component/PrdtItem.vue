<template>
    <div class="item">
        <div class="thumb"><!-- 이미지 영역 -->
            <a :href="'https://www.lotteon.com/p/product/bundle/' + tData.pdNo" class="block" v-if="tData.slTypCd == 'BNDL'">
                <img :alt="tData.spdNm" lazy="loaded"
                data-origin="" 
                :src="tData.imgFullUrl + '/dims/resizef/360x360'" 
                :data-src="tData.imgFullUrl + '/dims/resizef/360x360'" 
                >

                <!-- <div class="emblemArea" style="display:none">
                    <img alt="emblume" lazy="loaded" class="lazyImg lazy" data-origin="" 
                    src="https://contents.lotteon.c/display/embl/P36FAC689197D40BCB171DAE8F85277BCAA8647486716B171A8B53D47BC4FD3AD/file" 
                    data-src="https://contents.lotteon.com/display/embl/P36FAC689197D40BCB171DAE8F85277BCAA8647486716B171A8B53D47BC4FD3AD/file">
                </div> -->
            </a>
            <a :href="'https://www.lotteon.com/p/product/' + tData.pdNo + '?sitmNo=' + tData.sitmNo" class="block" v-else-if="tData.slTypCd == 'GNRL'">
                <img :alt="tData.spdNm" lazy="loaded"
                data-origin="" 
                :src="tData.imgFullUrl + '/dims/resizef/360x360'" 
                :data-src="tData.imgFullUrl + '/dims/resizef/360x360'"
                >

                <!-- <div class="emblemArea" style="display:none">
                    <img alt="emblume" lazy="loaded" class="lazyImg lazy" data-origin="" 
                    src="https://contents.lotteon.com/display/embl/P36FAC689197D40BCB171DAE8F85277BCAA8647486716B171A8B53D47BC4FD3AD/file" 
                    data-src="https://contents.lotteon.com/display/embl/P36FAC689197D40BCB171DAE8F85277BCAA8647486716B171A8B53D47BC4FD3AD/file">
                </div> -->
            </a>
            <button class="cart" @click="setCart(tData)">
            </button>

        </div>
        <a class="block"> <!-- 상품 텍스트 영역 -->
            <div class="info flag">
                <!-- 뱃지 노출 영역(flag 값으로 구분(@) DD:바로배송, FD:무료배송) -->
                <ul class="flagArea">
                    <li v-if="tData.flag.indexOf('DD') > -1" class="flag darkRed">바로배송</li>
                    <li v-if="tData.flag.indexOf('FD') > -1" class="flag blue">무료배송</li>
                </ul>
                <div class="title block-with-text">
                    <strong>{{tData.brdNm}}</strong><!-- brdNm -->
                    {{tData.spdNm}}
                </div><!-- 상품명 노출 영역 -->

                <div class="evaluation" v-if="tData.rvCnt != null || tData.mmSlQty != null">
                    <span class="rating" v-if="tData.rvCnt != null">
                        {{tData.stscrAvgScr}}({{(tData.rvCnt > 999 ? '999+' : tData.rvCnt)}})
                        </span>
                    <span class="monthlySold" v-if="tData.mmSlQty != null">
                        {{(tData.mmSlQty > 9999 ? '1만+':setComma(tData.mmSlQty))}}개 구매
                    </span>
                </div><!-- 평점 및 판매수 영역 -->

                <div class="price">
                    <div v-if="tData.dcVal > 0">
                        <span class="sale">{{tData.dcVal}}%</span>
                        <span class="real">{{setComma(tData.slPrc)}}<em >원</em></span>
                    </div>
                    <div>
                        <strong class="final">{{setComma(tData.frstFvrPrc)}}<span >원</span></strong>
                    </div>
                    <div>
                    </div>
                </div><!-- 금액 및 할인율 영역 -->
            </div> 
        </a>
    </div>
</template>


<script>
import {
    setCartInfo
} from '../../api/Product.js'
import {
    computedMixin
}
from '../../assets/js/Common.js'

export default {
    name: "prdtItem"
    , props:{
        gVal : {
            mbCartCnt : Number
            , selCateID : String
            , rowsPerPage : Number
            , pageNo : Number
            , dshopNo : Number
            , pdSortCd : String
        }
        , tData : Object
    }
    , mixins: [computedMixin]
    , methods: {
        setCart(data){
            // trNo, lrtrNo 삭제 예정. Webclient 사용하여 저장.
            var cartData = [
                {
                    "mbNo" : this.$store.state.mbNo
                    , "spdNo" : data.spdNo
                    , "sitmNo" : data.sitmNo
                    , "odQty" : 1
                }
            ]
            setCartInfo(cartData)
            .then((response) => {
                if(response.data[0] === -1){
                    alert("장바구니에 담을 수 없는 상품입니다.");
                }else{
                    alert("장바구니 저장완료");
                    this.$store.dispatch('GET_MMBR_CART_CNT');
                }
            })
            .catch(error => this.$log.error(error));
        }
    }
}
</script>
