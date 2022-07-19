<template>
    <div class="cart">
	<CartPage/>
    </div>
</template>

<script>

import CartPage from '/src/components/CartPage.vue';

export default{
    name: 'CartView',
    components: {
        CartPage
    }
}

</script>
