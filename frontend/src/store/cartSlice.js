// frontend/src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      // Update state
      state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
      state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      // Update state
      state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
      state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;