<template>
    <div class="tabArea">
        <div class="scrollArea">
            <ul>
                <li v-for="cate in cateList" :key="cate.val">
                    <button class="tab" @click="setParentCate(cate.val)">
                        <span class="icon">
                            <img :src="cate.img">
                        </span>
                        <span class="text">{{cate.title}}</span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>


export default {
    name : "PrdtCate"
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
    , data: function() {
        return {
            cateList: [
                {title:"스킨케어", val:22276, img:"https://contents.lotteon.com/display/dshop/22276/PF6293D4093EFDF4F3F6FB6550350FE1E41EE8C9EC1DED58A3C784DF16490F48F/file"}
                ,{title:"베이스메이크업", val:22279, img:"https://contents.lotteon.com/display/dshop/22279/PDEC5B6822486CB8A5A5D29194A3515F89F1BD71CF38DCBC24E9A19FE7F14AF89/file"}
                ,{title:"색조메이크업", val:22280, img:"https://contents.lotteon.com/display/dshop/22280/P41A356C8680A3D4CB1825B5AC1AD82BFF37203BFBE3F9935A0212E899211851E/file"}
                ,{title:"선케어", val:22282, img:"https://contents.lotteon.com/display/dshop/22282/PF99455EE030503AAEC3D0794F5BDF4A4243E94AA36B339521AE7D290299449E5/file"}
                ,{title:"바디케어", val:22284, img:"https://contents.lotteon.com/display/dshop/22284/P702F709F33906D4249E62CAECCB7717B0A5EE20E1AC60EFBD826E434A4D4CF4D/file"}
                ,{title:"헤어케어", val:22286, img:"https://contents.lotteon.com/display/dshop/22286/P405530B15223D89A4C037BA527822C4AB842D69AE26A86E5C70C1BE71C7C7AA1/file"}
                ,{title:"클렌징", val:22296, img:"https://contents.lotteon.com/display/dshop/22296/P3F3DC68024FC027AC0FF7629D4095D0B581155CEC0C1BDB46AE4E8B5270E4BF9/file"}
                ,{title:"향수", val:22289, img:"https://contents.lotteon.com/display/dshop/22289/P20495AE75B7780F677A9CB7EE0532441543425EC91D4018CFBB04049BF5C2A89/file"}
            ]
        }
    }
    , methods: {
        setParentCate(cataIdx){
            this.$emit("setParentCate",cataIdx);
        }
    }
}
</script>
