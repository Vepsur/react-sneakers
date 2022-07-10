import { configureStore } from '@reduxjs/toolkit';
import search from './slices/filterSlice'
import cart from './slices/cartSlice'
import sneakers from './slices/itemsSlice'
import favorite from './slices/favoriteSlice'
import orders from './slices/orderSlice'

export const store = configureStore({
  reducer: {
    search,
    cart,
    sneakers,
    favorite,
    orders,
  },
});