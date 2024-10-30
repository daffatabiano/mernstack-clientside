import { createSlice } from '@reduxjs/toolkit';

const calculateTotalQuantity = (cart) => {
  return cart?.reduce((total, item) => total + item.quantity, 0);
};

const storedCart = JSON.parse(localStorage.getItem('cart'));

const cartReducers = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    getCart: calculateTotalQuantity(storedCart),
  },
  reducers: {
    addToCart: (state, action) => {
      const cart = state.cart;

      // if item already exists in cart
      if (cart.some((item) => item._id === action.payload._id)) {
        // increment quantity
        const i = cart.findIndex((item) => item._id === action.payload._id);
        cart[i].quantity += action.payload.quantity;
      } else {
        // add new item
        cart.push(action.payload);
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));

      state.getCart = calculateTotalQuantity(state.cart);

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

    totalCart: (state) => {
      let total = 0;
      state.cart.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total;
    },
  },
});

export const { addToCart, removeFromCart, updateCart, clearCart } =
  cartReducers.actions;

export default cartReducers.reducer;