import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  opened: false,
  cart: [],
  status: 'loading',
  addStatus: 'loading',
  deleteStatus: 'loading',
  totalPrice: 0,
}

export const fetchCart = createAsyncThunk(
  'cart/fetchStatus',
  async () => {
    const { data } = await axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/cartItems');
    return data;
  }
);

export const fetchAddToCart = createAsyncThunk(
  'cart/fetchAddStatus',
  async (item) => {
    await axios.post(`https://629f57ac8b939d3dc2959500.mockapi.io/cartItems`, item);
  }
);

export const fetchDeleteFromCart = createAsyncThunk(
  'cart/fetchDeleteStatus',
  async (item) => {
    await axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/cartItems/${item.id}`);
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartOpened(state, action) {
      action.payload ? state.opened = true : state.opened = false;
    },
    setCart(state, action) {
      state.cart = action.payload;
    },
    addToCart(state, action) {
      state.cart.push(action.payload);
      state.cleanStatus = 'not_empty';
    },
    deleteFromCart(state, action) {
      state.cart = state.cart.filter(obj => obj.title !== action.payload.title);
    },
    setTotalPrice(state) {
      state.totalPrice = state.cart.reduce((sum, obj) => obj.price + sum, 0);
    },
    cleaneCart(state) {
      state.cart = [];
      state.cleanStatus = 'empty';
    },
  },
  extraReducers: {
    [fetchCart.pending]: (state) => {
      state.status = 'loading';
      state.cart = [];
    },
    [fetchCart.fulfilled]: (state, action) => {
      state.cart = action.payload;
      state.totalPrice = state.cart.reduce((sum, obj) => obj.price + sum, 0);
      state.status = 'success';
    },
    [fetchCart.rejected]: (state) => {
      state.status = 'error';
      state.cart = [];
    },
    //--------------add---------------
    [fetchAddToCart.pending]: (state) => {
      state.addStatus = 'loading';
    },
    [fetchAddToCart.fulfilled]: (state) => {
      state.addStatus = 'success';
    },
    [fetchAddToCart.rejected]: (state) => {
      state.addStatus = 'error';
      state.cart = [];
    },
    //---------------delete----------------
    [fetchDeleteFromCart.pending]: (state) => {
      state.deleteStatus = 'loading';
    },
    [fetchDeleteFromCart.fulfilled]: (state) => {
      state.deleteStatus = 'success';
    },
    [fetchDeleteFromCart.rejected]: (state) => {
      state.deleteStatus = 'error';
      state.cart = [];
    },
  },
})

export const { setCart, setCartOpened, setTotalPrice, cleaneCart, addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;