import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartOpened(state, action) {
      action.payload ? state.value = true : state.value = false;
    },
  }
})

export const { setCartOpened } = cartSlice.actions;

export default cartSlice.reducer;