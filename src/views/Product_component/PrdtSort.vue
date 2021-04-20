<template>
    <div class="sortListArea">
        <div class="total">
            총 <span>{{(totalCnt > 999 ? "999+" : totalCnt)}}</span> 개
        </div>
        <div class="rightSet">
            <div class="boradCheckList">
                <ul>
                    <li v-for="(pdscl, index) in pdSortCdList" :key="pdscl.val" :value="pdscl.val">
                        <input type="radio" :id="pdscl.val" name="selectBoard" :value="pdscl.val" v-if="index == 0" checked="checked">
                        <input type="radio" :id="pdscl.val" name="selectBoard" :value="pdscl.val" v-else>
                        <label :for="pdscl.val" @click="clkSort(pdscl)">{{pdscl.title}}</label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PrdtSort"
    , props:{
        gVal : {
            mbCartCnt : Number
            , selCateID : String
            , rowsPerPage : Number
            , pageNo : Number
            , dshopNo : Number
            , pdSortCd : String
        }
        , totalCnt : Number
    }
    , data : function(){
        return {
            pdSortCdList: [
                {title:"판매량순", val:"01"}
                , {title:"최근 등록순", val:"02"}
                , {title:"낮은 가격순", val:"03"}
                , {title:"높은 가격순", val:"04"}
            ]
        }
    }
    , methods: {
        clkSort(data){
            this.$emit("setSortTypeCd", data.val);
        }
    }
}
</script>
