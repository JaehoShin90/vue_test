<template>
    <div class="content">
        <PrdtCate 
            v-bind:gVal="gVal" 
            v-on:setParentCate="setCate"
        >
        </PrdtCate>
        <PrdtSort 
            v-bind:gVal="gVal" 
            v-bind:totalCnt="prdtApiData.totalCount" 
            v-on:setSortTypeCd="setSortTypeCd"
        >

        </PrdtSort>
        <div class = "list-wrap" 
            v-bind:class="{'displayNone':isLoading}" 
            v-lazy-container="{selector:'img'}">
            <ul>
                <li v-for="tData in prdtApiData.dataList" :key="tData.spdNo">
                    <PrdtItem 
                        v-bind:gVal="gVal" 
                        v-bind:tData="tData" 
                        v-on:setMbCartCnt="setMbCartCnt"
                    >
                    </PrdtItem>
                </li>
            </ul>
        </div>
        <PrdtItemPaging 
            v-bind:totalCount="prdtApiData.totalCount" 
            v-bind:rowsPerPage="prdtApiData.rowsPerPage" 
            v-on:setPageNo="setPageNo" 
            v-bind:class="{'displayNone':isLoading}"
        >
        

        </PrdtItemPaging>
        <Spinner v-bind:class="{'displayNone':!isLoading}"></Spinner>
    </div>
</template>

<script>
import PrdtCate from './PrdtCate'
import PrdtSort from './PrdtSort'
import PrdtItem from './PrdtItem'
import PrdtItemPaging from './PrdtItemPaging'
import Spinner from '../../components/Spinner'
import {
    getProductList
    , getCartCnt
} from '../../api/Product.js'

export default {
    nampe: "PrdtCmpn"
    , components:{
        PrdtCate
        , PrdtSort
        , PrdtItem
        , PrdtItemPaging
        , Spinner
    }
    , data: function(){
        return {
            prdtApiData : {
                totalCount : 0
                , pageNo : 1
                , rowsPerPage : 60
                , startIndex : 0
                , dataList : []
            }
            , gVal : {
                mbCartCnt : 0
                , selCateID : "CAT22276"
                , rowsPerPage : 60
                , pageNo : 1
                , dshopNo : 22276
                , pdSortCd : "01"
            }
            , isLoading : false
        }
    }
    , created(){
        this.srchList();
    }
    , methods: {
        setLoading(isLoading){
            this.isLoading = isLoading
        }
        , setCate(cateIdx){
            this.gVal.dshopNo = cateIdx;
            this.gVal.selCateID = "CAT" + cateIdx;
            this.srchList();
        }
        , srchList(){
            this.setLoading(true);
            getProductList(this.gVal.rowsPerPage, this.gVal.pageNo, this.gVal.dshopNo, this.gVal.pdSortCd)
            .then((response) => {
                this.prdtApiData = (response.data && response.data.catePdList && response.data.catePdList.dataList ? response.data.catePdList : {})
                this.setLoading(false);
            })
            .catch(error => this.$log.error(error));
        }
        , setMbCartCnt(){
            getCartCnt({mbNo : this.$store.mbNo})
            .then((response) => this.gVal.mbCartCnt = response.data[0])
            .catch(error => this.$log.error(error));
        }
        , setSortTypeCd(sortTypeCd){
            this.gVal.pdSortCd = sortTypeCd;
            this.srchList();
        }
        , setPageNo(pageNo){
            this.gVal.pageNo = pageNo;
            this.srchList();
        }
    }
}
</script>

<style>
    @import '../../assets/css/ProductMain.css';
</style>