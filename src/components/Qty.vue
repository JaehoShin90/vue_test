<template>
    <div class="spinnerBox">
        <button class="minus">
            -
        </button>
        <div class="number">
            <input type="number" id="'number_" >
            <label for="'number_" class="blind">0</label>
        </div>
        <button class="plus">
            +
        </button>
    </div>
</template>

<script>

export default {
    name: "Qty"
    , props: {
        method : Function
    }
    , mounted() {
        this.method();
    }
}
</script>
