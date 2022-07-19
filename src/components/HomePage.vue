<template>
  <HeaderMenu/>
  <ProductList/>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu.vue'
import ProductList from '@/components/ProductList.vue'

export default {
  name: 'HomePage',
  data(){
    return {
      items: [
        {label: 'Home'},
        {label: 'About'},
        {label: 'Cart'}
      ]
    }
  },
  components: {
    HeaderMenu,
    ProductList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
