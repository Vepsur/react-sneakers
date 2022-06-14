import { configureStore } from '@reduxjs/toolkit';
import search from './slices/filterSlice'

export const store = configureStore({
  reducer: {
    search,
  },
});