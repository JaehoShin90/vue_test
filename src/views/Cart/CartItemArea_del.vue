<template>
    <div class="detailWrap">
        <div class="itemController">
            <div class="checkboxController">
                <input id="checkboxController" type="checkbox" class="cur_hand">
                <label for="checkboxController" class="cur_hand">전체선택</label>
            </div>
            <div class="deleteBtnGroup">
                <button type="button" class="deleteCartItems">
                    <span>선택삭제</span>
                </button>
            </div>
        </div>
        <div class="cartSlideWrapper nonHolidays active">
            <div class="cartSlideWrap">
                <CartItemList>

                </CartItemList>
            </div>
        </div>
    </div>
</template>

<script>
import CartItemList from './CartItemList'


export default {
    name: "CartItem"
    , components: {
        CartItemList
    }
}
</script>
