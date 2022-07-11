import { configureStore } from '@reduxjs/toolkit';
import search from './slices/filterSlice'
import cart from './slices/cartSlice'
import sneakers from './slices/itemsSlice'
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    search,
    cart,
    sneakers,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;