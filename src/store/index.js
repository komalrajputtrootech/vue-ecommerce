/* eslint-disable */
import { createStore } from 'vuex'

export default createStore({
  state: {
     cart: []
  },
  getters: {
  },
  mutations: {
     initializeCart(state){
         if(window.localStorage.getItem('cart') == null){
             window.localStorage.setItem('cart', JSON.stringify(state.cart));
         }
         else{
             state.cart = JSON.parse(window.localStorage.getItem('cart'))
         }
     },
     addItemToCart(state, item){
         const exists = state.cart.filter(i => i.id === item.id);
         if(exists.length == 0){
             state.cart.push(item);
             updateLocalCart(state);
         }
     },
     removeItemFromCart(state, item){
         const exists = state.cart.filter(i => i.id === item.id);
         if(exists.length == 0){
             state.cart.push(item);
             updateLocalCart(state);
         }
     }
  },
  actions: {
  },
  modules: {
  }
})

function updateLocalCart(state){
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
}
