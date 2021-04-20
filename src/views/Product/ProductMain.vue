<template>
    <div class="content">
        <div>
            <label>mbNo</label>
            <input type="text" v-model="mbNo"/>
            <label>카테고리</label>
            <select v-model="dshopNo">
                <option v-for="cate in cateList" :key="cate.val" :value="cate.val">{{cate.title}}</option>
            </select>
            <label>노출상품수</label>
            <input type="text" v-model="rowsPerPage"/>
            <label>페이지넘버</label>
            <input type="text" v-model="pageNo"/>

            <label>정렬조건</label>
            <select v-model="pdSortCd">
                <option v-for="psc in pdSortCdList" :key="psc.val" :value="psc.val">{{psc.title}}</option>
            </select>
            <button @click="srchList">조회</button>
            <br>
            <label>현재 회원의 장바구니 수 : {{mbCartCnt}}</label>
        </div>
        <productCate></productCate>
        <div class = "list-wrap">
            <ul>
                <li v-for="tData in prdtList" :key="tData.pdNo">
                    <div class="item">
                        <div class="thumb"><!-- 이미지 영역 -->
                            <a :href="'https://www.lotteon.com/p/product/bundle/' + tData.pdNo" class="block" v-if="tData.slTypCd == 'BNDL'">
                                <img :alt="tData.spdNm" lazy="loaded" class="lazyImg lazy" 
                                data-origin="" 
                                :src="tData.imgFullUrl + '/dims/resizef/360x360'" 
                                :data-src="tData.imgFullUrl + '/dims/resizef/360x360'" >

                                <div class="emblemArea" style="display:none">
                                    <img alt="emblume" lazy="loaded" class="lazyImg lazy" data-origin="" 
                                    src="https://contents.lotteon.com/display/embl/P36FAC689197D40BCB171DAE8F85277BCAA8647486716B171A8B53D47BC4FD3AD/file" 
                                    data-src="https://contents.lotteon.com/display/embl/P36FAC689197D40BCB171DAE8F85277BCAA8647486716B171A8B53D47BC4FD3AD/file">
                                </div>
                            </a>
                            <a :href="'https://www.lotteon.com/p/product/' + tData.pdNo + '?sitmNo=' + tData.sitmNo" class="block" v-else-if="tData.slTypCd == 'GNRL'">
                                <img :alt="tData.spdNm" lazy="loaded" class="lazyImg lazy" 
                                data-origin="" 
                                :src="tData.imgFullUrl + '/dims/resizef/360x360'" 
                                :data-src="tData.imgFullUrl + '/dims/resizef/360x360'" >

                                <div class="emblemArea" style="display:none">
                                    <img alt="emblume" lazy="loaded" class="lazyImg lazy" data-origin="" 
                                    src="https://contents.lotteon.com/display/embl/P36FAC689197D40BCB171DAE8F85277BCAA8647486716B171A8B53D47BC4FD3AD/file" 
                                    data-src="https://contents.lotteon.com/display/embl/P36FAC689197D40BCB171DAE8F85277BCAA8647486716B171A8B53D47BC4FD3AD/file">
                                </div>
                            </a>
                            <button class="cart" @click="setCart(tData)">
                            </button>

                        </div>
                        <a class="block"> <!-- 상품 텍스트 영역 -->
                           <div class="info flag">
                               <!-- 뱃지 노출 영역(flag 값으로 구분(@) DD:바로배송, FD:무료배송) -->
                               <ul class="flagArea">
                                   <li v-if="tData.flag == 'FD'" class="flag blue">무료배송</li>
                                   <li v-else-if="tData.flag =='DD'" class="flag darkRed">바로배송</li>
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
                                       {{(tData.mmSlQty > 9999 ? '1만+':tData.mmSlQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}}개 구매
                                    </span>
                                </div><!-- 평점 및 판매수 영역 -->

                               <div class="price">
                                   <div v-if="tData.dcVal > 0">
                                       <span class="sale">{{tData.dcVal}}%</span>
                                       <span class="real">{{tData.slPrc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}<em >원</em></span>
                                    </div>
                                    <div>
                                        <strong class="final">{{tData.frstFvrPrc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}<span >원</span></strong>
                                    </div>
                                    <div>
                                    </div>
                                </div><!-- 금액 및 할인율 영역 -->
                            </div> 
                        </a>
                    </div>
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
import ProductCate from './ProductCate.vue'
import {
    getProductList
    , setCartInfo
    , getCartCnt
} from '../../api/Product.js'

export default {
    name: "ProductList"
    , components:{
        ProductCate
    }
    , data: function(){
        return {
            mbNo : 2
            , prdtList : []
            , selCateID : "CAT22276"
            , rowsPerPage : 10
            , pageNo : 1
            , dshopNo : 22276
            , cateList: [
                {title:"스킨케어", val:22276}
                ,{title:"베이스메이크업", val:22279}
                ,{title:"색조메이크업", val:22280}
                ,{title:"선케어", val:22282}
                ,{title:"바디케어", val:22284}
                ,{title:"헤어케어", val:22286}
                ,{title:"클렌징", val:22296}
                ,{title:"향수", val:22289}
            ]
            , pdSortCd : "01"
            , pdSortCdList: [
                {title:"판매량순", val:"01"}
                , {title:"최근 등록순", val:"02"}
                , {title:"낮은 가격순", val:"03"}
                , {title:"높은 가격순", val:"04"}
            ]
            , mbCartCnt : 0
        }
    }
    , created(){
        this.srchList();
        this.getCartCnt();
    }
    , methods: {
        srchList(){
            getProductList(this.rowsPerPage, this.pageNo, this.dshopNo, this.pdSortCd)
            .then((response) => this.prdtList = (response.data && response.data.catePdList && response.data.catePdList.dataList ? response.data.catePdList.dataList : []))
            .catch(error => console.log(error));
        }
        , setCart(data){
            var cartData = [
                {
                    "trNo" : data.trNo
                    , "lrtrNo" : data.lrtrNo
                    , "pdNm" : data.spdNm
                    , "pdNo" : data.pdNo
                    , "mbNo" : this.mbNo
                    , "spdNo" : data.spdNo
                    , "slTypCd" : data.slTypCd
                    , "slPrc" : data.slPrc
                    , "dcAmt" : data.frstFvrPrc
                    , "odQty" : 1
                    , "imgFullUrl" : data.imgFullUrl
                }
            ]
            setCartInfo(cartData)
            // .then(confirm("장바구니를 저장하였습니다. 바로 확인하시겠습니까?"))
            .then(() => {
                console.log("저장완료");
                this.getCartCnt();
            })
            .catch(error => console.log(error));
        }
        , getCartCnt(){
            getCartCnt({mbNo:this.mbNo})
            .then((response) => this.mbCartCnt = response.data[0])
            .catch(error => console.log(error));
        }
    }
    , watch:{
        mbNo: function(){
            this.getCartCnt();
        }
    }
}
</script>

<style>
    @import '../../assets/css/ProductMain.css';
</style>