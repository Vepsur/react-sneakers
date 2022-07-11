import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartSliceState = {
  value: boolean;
}

const initialState: CartSliceState = {
  value: false,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartOpened(state, action: PayloadAction<boolean>) {
      action.payload ? state.value = true : state.value = false;
      action.payload ? document.body.style.overflow = 'hidden' : document.body.style.overflow = '';
    },
  }
})

export const { setCartOpened } = cartSlice.actions;

export default cartSlice.reducer;