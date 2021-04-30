<template>
    <div class="headerWrapper">
        <div class="main innerContent">
            <div class="buttonArea">
                <ul>
                    <li>
                        <a class="cart" @click.prevent="moveCart()">
                            장바구니
                            <span data-v-03dd6781="" class="number on" v-bind:class="{'displayNone':isCartCntDisplayNone}">{{mmbrCartCnt}}</span>
                        </a>
                    </li>
                    <li>
                        <a @click.prevent="logout()" v-bind:style="isMmbrDisplayNone?'display:block':'display:none'">로그아웃</a>
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
        , isCartCntDisplayNone(){
            return this.$store.getters.FetchedMmbrCartCnt <= 0
        }
        , isMmbrDisplayNone(){
            return this.$store.getters.FetchedMmbr != "";
        }
    }
    , methods: {
        moveCart(){
            this.$router.push({ name: 'CartCmpn'});
        }
        , logout(){
            this.$store.commit("LOGOUT");
            sessionStorage.clear();
        }
    }
}
</script>

<style>
    @import '../../assets/css/Header.css';
</style>