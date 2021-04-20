<template>
    <div class="paginationWrap wide">
        <div class="pagination">
            <a href="#" class="prev" @click.prevent="pageClick('이전')" :class="{off:prevOff}">
                <span class="hiddenTxt">이전</span>
            </a>
            <a href="#" v-for="(page, index) in pageLength" :key="page" @click.prevent="pageClick(index + 1)">
                {{(index + 1)}}
            </a>
            <a href="#" class="next" @click.prevent="pageClick('다음')" :class="{off:nextOff}">
                <span class="hiddenTxt">다음</span>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name : "PrdtItemPaging"
    , data : function(){
        return {
            clkPage : 1
            , prevOff : true
            , nextOff : false
        }
    }
    , props: {
        totalCount : Number
        , rowsPerPage : Number
    }
    , computed: {
        pageLength: function(){
            return Math.ceil(this.totalCount / this.rowsPerPage)
        }
    }
    , methods: {
        pageClick(clkData){
            var pageNo = 1;
            if(clkData === '이전'){
                pageNo = this.clkPage - 1;
            }else if(clkData === '다음'){
                pageNo = this.clkPage + 1;
            }else{
                pageNo = clkData;
            }
            this.clkPage = pageNo;

            if(this.clkPage == 1){
                this.prevOff = true;
                this.nextOff = false;
            }else if(this.clkPage == this.pageLength){
                this.prevOff = false;
                this.nextOff = true;
            }else{
                this.prevOff = false;
                this.nextOff = false;
            }
            this.$emit("setPageNo", this.clkPage);
        }
    }
}
</script>
