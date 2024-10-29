import { createSlice } from '@reduxjs/toolkit';

const cartReducers = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart = action.payload;

      localStorage.setItem('cart', JSON.stringify(state.cart));
      return state;
    },
    removeFromCart: (state, action) => {
      const i = state.cart.findIndex((item) => item._id === action.payload);
      if (i !== -1) {
        state.cart.splice(i, 1);
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));

      return state;
    },

    updateCart: (state, action) => {
      const i = state.cart.findIndex((item) => item._id === action.payload._id);
      if (i !== -1) {
        state.cart[i].quantity = action.payload.quantity;
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));

      return state;
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCart, clearCart } =
  cartReducers.actions;

export default cartReducers.reducer;
