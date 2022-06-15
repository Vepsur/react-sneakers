import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
  searchValue: '',
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
      state.searchValue = '';
    },
    getSearchInput(state) {
      state.searchValue = state.value;
    },
  },
});

export const { changeSearchInput, cleanseSearchInput, getSearchInput } = filterSlice.actions;

export default filterSlice.reducer;