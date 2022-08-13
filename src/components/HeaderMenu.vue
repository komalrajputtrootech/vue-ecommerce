<template>
    <Menubar :model="items"/>
</template>

<script>
import Menubar from 'primevue/menubar';
import {PrimeIcons} from 'primevue/api';

    export default{
        name: "HeaderMenu",
        data(){
            return {
                items: [
                    {label: 'Home', to: '/'},               
                    {label: 'About', to: 'about'},
                    {label: 'Cart', icon: PrimeIcons.SHOPPING_BAG, to: '/cart'},               
                ]   
            }
        },
        components: {
            Menubar
        }
    }

</script>
