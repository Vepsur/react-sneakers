import { configureStore } from '@reduxjs/toolkit';
import search from './slices/filterSlice'
import cart from './slices/cartSlice'
import sneakers from './slices/itemsSlice'

export const store = configureStore({
  reducer: {
    search,
    cart,
    sneakers,
  },
});