<template>
    <Menubar :model="items"/>
</template>

<script>
import Menubar from 'primevue/menubar';

    export default{
        name: "HeaderMenu",
        data(){
            return {
                items: [
                    {label: 'Home', to: '/'},               
                    {label: 'About', to: 'about'},
                    {label: 'Cart', to: '/cart'},               
                ]   
            }
        },
        components: {
            Menubar
        }
    }

</script>
