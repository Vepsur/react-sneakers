import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSneakers = createAsyncThunk(
  'sneakers/fetchSneakersStatus',
  async (search) => {
    const { data } = await axios.get(`https://629f57ac8b939d3dc2959500.mockapi.io/items${search}`);
    return data;
  }
);

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
  firstRender: true,
};

export const sneakersSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchSneakers.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchSneakers.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
      state.firstRender = false;
    },
    [fetchSneakers.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },

});

export const { setItems } = sneakersSlice.actions;

export default sneakersSlice.reducer;