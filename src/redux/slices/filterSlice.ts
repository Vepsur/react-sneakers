import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FilterSliceState {
  value: string;
  searchValue: string;
}

const initialState: FilterSliceState = {
  value: '',
  searchValue: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeSearchInput(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    cleanseSearchInput(state) {
      state.value = '';
      state.searchValue = '';
    },
    getSearchInput(state) {
      state.searchValue = state.value;
      console.log(1);
    },
  },
});

export const { changeSearchInput, cleanseSearchInput, getSearchInput } = filterSlice.actions;

export default filterSlice.reducer;