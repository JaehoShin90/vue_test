<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './views/layout/Header'

export default {
  name: 'App'
  , components:{
    Header
  }
}
</script>

<style>
    @import './assets/css/Common.css';
</style>