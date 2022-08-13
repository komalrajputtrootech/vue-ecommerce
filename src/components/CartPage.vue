<template>
        <Toast/>
	<div style="margin-top: 20px;">
        <DataTable :value="cart" responsiveLayout="scroll">
            <template #header>
                <div class="table-header">
                    <span style="text-align:left;">Cart Items</span>
                </div>
            </template>
            <Column field="name" header="Name"></Column>
            <Column header="Image">
                <template #body="slotProps">
                    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.product_image" class="product-image" />
                </template>
            </Column>
            <Column field="price" header="Price">
                <template #body="slotProps">
                    &#x20B9;{{slotProps.data.price}}
                </template>
            </Column>
            <Column field="quantity" header="Quantity">
                <template #body="slotProps">
                     <InputNumber v-model="slotProps.data.quantity" :min="1" :allowEmpty="false"  showButtons @input="updateQuantity()"/>
                </template>
            </Column>
            <Column header="Total">
                <template #body="slotProps">
                     &#x20B9;{{ subTotal(slotProps.data) }}
                </template>
            </Column>
            <Column header="Actions">
                <template #body="slotProps">
                     <Button label="Remove" @click=removeItemFromCart(slotProps.data.id) class="p-button-secondary" />
                </template>
            </Column>
            <template #footer>
                Total : &#x20B9;{{ total }} <br>
            </template>
            <template #empty>No items in the cart.</template>
        </DataTable>
	</div>
</template>


<script>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Toast from 'primevue/toast';

export default{
    name: 'CartList',
    data(){
        return {
            cart: []
        }
    },
    components: {
        DataTable,
        Column,
        Button,
        InputNumber,
        Toast
    },
    mounted(){
        this.cart = this.$store.state.cart
    },
    computed: {
        subTotal(){
            return item => item.quantity * item.price
        },
        total() {
            return this.cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        }
    },
    methods: {
        removeItemFromCart(product_id){
            this.$store.commit("removeItemFromCart", product_id);
            this.$toast.add({severity:"success", detail:"Item removed from cart", life: 3000});
            this.cart = this.$store.state.cart
            //this.$router.go(this.$router.currentRoute);
        },
        updateQuantity(product_id){
            this.$store.commit("updateQuantity", product_id);
            this.cart = this.$store.state.cart
        }
    }
}
</script>
