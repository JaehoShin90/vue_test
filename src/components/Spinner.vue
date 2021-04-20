<template>
    <div>
        <div class="spinner">
            <div class="area">

            </div>
            <BeatLoader></BeatLoader>
        </div>
    </div>
</template>

<script>
import BeatLoader from 'vue-spinner/src/BeatLoader'

export default {
    name : "Spinner"
    , components:{
        BeatLoader
    }
}
</script>


<style>
    @import '../assets/css/Common.css';
</style>