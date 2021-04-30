<template>
  <div id="app">
    <Header></Header>
    <router-view name="contents"></router-view>
  </div>
</template>

<script>
import Header from './views/layout/Header'

export default {
  name: 'App'
  , components:{
    Header
  }
  , created(){
      if(this.$store.state.mbNo != "" || sessionStorage.getItem("mbNo")){
        this.$store.dispatch('GET_MMBR_CART_CNT');
      }
      
  }
}
</script>

<style>
    @import './assets/css/Common.css';
</style>