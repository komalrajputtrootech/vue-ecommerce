<template>
    <Menubar :model="items"/>
    <router-link to="/about">About</router-link> |
    <router-link to="/cart">Cart</router-link>
</template>

<script>
import Menubar from 'primevue/menubar';

    export default{
        name: "HeaderMenu",
        data(){
            return {
                items: [
                    {label: 'Home'},               
                    {label: 'About'},
                    {label: 'Cart'},               
                ]   
            }
        },
        components: {
            Menubar
        }
    }

</script>
