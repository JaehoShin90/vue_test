<template>
    <div class="headerWrapper">
        <div class="main innerContent">
            <div class="buttonArea">
                <ul>
                    <li>
                        <a href="/Cart" class="cart">
                            장바구니
                            <span data-v-03dd6781="" class="number on" v-bind:class="{'displayNone':isDisplayNone}">{{mmbrCartCnt}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header"
    , computed:{
        mmbrCartCnt(){
            return this.$store.getters.FetchedMmbrCartCnt;
        }
        , isDisplayNone(){
            return this.$store.getters.FetchedMmbrCartCnt <= 0
        }
    }
}
</script>

<style>
    @import '../../assets/css/Header.css';
</style>