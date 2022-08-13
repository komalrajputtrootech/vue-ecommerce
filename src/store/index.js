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
             item.quantity = 1
             state.cart.push(item);
             updateLocalCart(state);
         }
         else{
             for (var i=0; i<state.cart.length; i++) {
                if (state.cart[i].id == item.id) {
                   state.cart[i].quantity += 1;
                }
             }
             updateLocalCart(state);
         }
     },
     removeItemFromCart(state, item_id){
         state.cart = state.cart.filter(i => i.id != item_id);
         updateLocalCart(state);
     },
     updateQuantity(state, item_id){
         for (var i=0; i<state.cart.length; i++) {
            if (state.cart[i].id == item_id) {
                state.cart[i].quantity -= 1;
            }
          }
          updateLocalCart(state);
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
