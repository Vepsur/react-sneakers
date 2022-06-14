import { configureStore } from '@reduxjs/toolkit';
import search from './slices/filterSlice'
import cart from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    search,
    cart,
  },
});