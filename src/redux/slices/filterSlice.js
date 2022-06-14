import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeSearchInput(state, action) {
      state.value = action.payload;
    },
    cleanseSearchInput(state) {
      state.value = '';
    },
  },
});

export const { changeSearchInput, cleanseSearchInput } = filterSlice.actions;

export default filterSlice.reducer;