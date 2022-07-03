<template>
  <HeaderMenu/>
  <router-view/>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu.vue';

export default{
    name: 'App',
    components: {
        HeaderMenu
    },
    data(){
        return {
            cart: []
        }
    },
    beforeCreate(){
        this.$store.commit('initializeCart')
    },
    mounted(){
        this.cart = this.$store.state.cart
    }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
