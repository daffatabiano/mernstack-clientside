import { createSlice } from '@reduxjs/toolkit';

const calculateTotalQuantity = (cart) => {
  return cart?.reduce(
    (total, item) => Number(total) + Number(item.quantity),
    0
  );
};

const storedCart = JSON.parse(localStorage.getItem('cart'));

const cartReducers = createSlice({
  name: 'cart',
  initialState: {
    cart: storedCart || [],
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
    decreaseQuantity: (state, action) => {
      const sameItem = state.cart.find((item) => item._id === action.payload);

      if (sameItem.quantity > 1) {
        sameItem.quantity--;

        localStorage.setItem('cart', JSON.stringify(state.cart));
      } else {
        const filtered = state.cart.filter(
          (item) => item._id !== action.payload
        );

        localStorage.setItem('cart', JSON.stringify(filtered));

        state.cart = filtered;
      }

      state.getCart = calculateTotalQuantity(state.cart);

      return state;
    },
    increaseQuantity: (state, action) => {
      const sameItem = state.cart.find((item) => item._id === action.payload);

      console.log(state.cart);
      sameItem.quantity++;

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

export const { addToCart, decreaseQuantity, increaseQuantity, clearCart } =
  cartReducers.actions;

export default cartReducers.reducer;
