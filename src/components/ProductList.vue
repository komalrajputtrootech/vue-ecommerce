<template>
    <Toast/>
    <div class="card">
    <DataView :value="latestProducts" :layout="layout" :totalRecords="totalRecords" :paginator="true" :rows="page_size" :lazy="true" @page="onPage($event)">
        <template #header>
                <div class="grid grid-nogutter">
                    <div class="col-3" style="text-align: left;float: left;">
                        <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
                    </div>
                    <div class="col-3" style="text-align: left;float: left;margin-left: 10px;">
                        <Dropdown v-model="filterCategory" :options="filterOptions" optionLabel="label" placeholder="Filter By Category" @change="filterByCategory($event)"/>
                    </div>
                    <div class="col-6" style="text-align: right">
                        <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText type="text" v-model="searchValue" placeholder="Search" @input="onSearch()"/>
                        </span>
                    </div>
                </div>
        </template>
        <template #list="slotProps" >
            <div class="col-12">
                <div class="product-list-item">
                    <img :src=slotProps.data.product_image :alt="slotProps.data.name" class="product-image"/>
                    <div class="product-list-detail">
                        <div class="product-name">{{slotProps.data.name}}</div>
                        <div class="product-description">{{slotProps.data.description}}</div>
                        <i class="pi pi-tag product-category-icon"></i>
                        <span class="product-category">{{slotProps.data.category}}</span>
                    </div>
                    <div class="product-list-action">
                        <span class="product-price">${{slotProps.data.price}}</span>
                        <Button icon="pi pi-shopping-cart" label="Add to Cart" @click="addToCart(slotProps.data.id)">Add to Cart</Button>
                    </div>
		</div>
             </div>
	</template>
	<template #grid="slotProps">
		<div class="col-12 md:col-4">
			<div class="product-grid-item card">
				<div class="product-grid-item-top">
				<div>
					<i class="pi pi-tag product-category-icon"></i>
					<span class="product-category">{{slotProps.data.category}}</span>
				</div>
				</div>
				<div class="product-grid-item-content">
					<img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.name"/>
					<div class="product-name">{{slotProps.data.name}}</div>
					<div class="product-description">{{slotProps.data.description}}</div>
				</div>
				<div class="product-grid-item-bottom">
					<span class="product-price">${{slotProps.data.price}}</span>
					<Button icon="pi pi-shopping-cart">Add to Cart</Button>
				</div>
			</div>
		</div>
	</template>
     <template #empty>No products found.</template>
    </DataView>
    </div>
</template>

<script>
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';

export default {
    name: 'ProductList',
    data(){
        return {
            latestProducts: [],
            layout: 'list',
            page_size: 2,
            totalRecords: null,
            sortKey: null,
            sortOrder: null,
            sortField: null,
            sortOptions: [
               {label: 'Price High to Low', value: '!price'},
               {label: 'Price Low to High', value: 'price'},
            ],
            filterOptions: [],
            filterCategory: null,
            current_page: 1,
            searchValue: null
        }
    },
    components: {
        DataView,
        Button,
        Dropdown,
        InputText,
        Toast
    },
    async mounted(){
        // fetching categories
	const cat_res = await this.$axios.get("products/categories")
        var categories = cat_res.data.results
        for(var i=0;i<categories.length;i++){
            this.filterOptions.push({label: categories[i].name, value: categories[i].slug})
        }
        // fetching products
        const res = await this.$axios.get("products/products/")
        this.latestProducts = res.data.results
        this.totalRecords = res.data.count
    },
    methods: {
        async productApiCall(){
            const res = await this.$axios.get("products/products/"+this.getFilterParamsString());
            this.latestProducts = res.data.results
            this.totalRecords = res.data.count
        },
        onPage(event){
            this.current_page = parseInt(event.page) + 1;
            this.productApiCall();
        },
        filterByCategory(event){
            this.filterCategory = event.value;
            this.productApiCall();
        },
        onSearch(){
            console.log(this.searchValue);
            this.productApiCall();
        },
        getFilterParamsString(){
            var params = "?page="+this.current_page;
            if(this.filterCategory != null){
                params += "&category__slug="+this.filterCategory.value
            }
            if(this.sortField != null){
                params += "&ordering="+this.sortOrder+this.sortField
            }
            if(this.searchValue != null){
                params += "&search="+this.searchValue
            }
            return params
        },
        onSortChange(event){
            const value = event.value.value;
            const sortValue = event.value;

            if (value.indexOf('!') === 0) {
                this.sortOrder = "-"
                this.sortField = value.substring(1, value.length);
                this.sortKey = sortValue;
            }
            else {
                this.sortOrder = "";
                this.sortField = value;
                this.sortKey = sortValue;
            }
            this.productApiCall();
        },
        async addToCart(product_id){
            const res = await this.$axios.get("products/products/"+product_id+"/");
            this.$store.commit("addItemToCart", res.data);
            console.log(this.$store.state.cart);
            this.$toast.add({severity:'success', summary: 'Success Message', detail:'Item added to cart !!', life: 3000});
        }
    }  
}

</script>

<style lang="scss" scoped>
.card {
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
}
.p-dropdown {
    width: 14rem;
    font-weight: normal;
}

.product-name {
	font-size: 1.5rem;
	font-weight: 700;
}

.product-description {
	margin: 0 0 1rem 0;
}

.product-category-icon {
	vertical-align: middle;
	margin-right: .5rem;
}
.product-category {
	font-weight: 600;
	vertical-align: middle;
}

::v-deep(.product-list-item) {
	display: flex;
	align-items: center;
	padding: 1rem;
	width: 100%;

	img {
		width: 200px;
                height: 200px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin-right: 2rem;
	}

	.product-list-detail {
		flex: 1 1 0;
	}

	.p-rating {
		margin: 0 0 .5rem 0;
	}

	.product-price {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: .5rem;
		align-self: flex-end;
	}

	.product-list-action {
		display: flex;
		flex-direction: column;
	}

	.p-button {
		margin-bottom: .5rem;
	}
}

::v-deep(.product-grid-item) {
	margin: .5rem;
	border: 1px solid var(--surface-border);

	.product-grid-item-top,
	.product-grid-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	img {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin: 2rem 0;
	}

	.product-grid-item-content {
		text-align: center;
	}

	.product-price {
		font-size: 1.5rem;
		font-weight: 600;
	}
}

@media screen and (max-width: 576px) {
	.product-list-item {
		flex-direction: column;
		align-items: center;

		img {
			margin: 2rem 0;
		}

		.product-list-detail {
			text-align: center;
		}

		.product-price {
			align-self: center;
		}

		.product-list-action {
			display: flex;
			flex-direction: column;
		}

		.product-list-action {
			margin-top: 2rem;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}
	}
}
</style>

