<template>
	<div>
        <DataTable :value="cart" responsiveLayout="scroll">
            <template #header>
                <div class="table-header">
                    Cart Items
                    <Button icon="pi pi-refresh" />
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
                    {{slotProps.data.price}}
                </template>
            </Column>
            <template #footer>
                In total there are {{cart ? cart.length : 0 }} items in cart.
            </template>
        </DataTable>
	</div>
</template>


<script>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';


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
        Button
    },
    mounted(){
        this.cart = this.$store.state.cart
    }
}

</script>
