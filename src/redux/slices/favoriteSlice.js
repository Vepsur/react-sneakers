import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setTotalPrice } from "./cartSlice";


export const fetchFavorite = createAsyncThunk(
  'favorite/fetchStatus',
  async () => {
    const { data } = await axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/favorites');
    return data;
  }
);

export const fetchAddToFavorite = createAsyncThunk(
  'favorite/fetchAddStatus',
  async (item) => {
    await axios.post(`https://629f57ac8b939d3dc2959500.mockapi.io/favorites`, item);
  }
);

export const fetchDeleteFromFavorite = createAsyncThunk(
  'favorite/fetchDeleteStatus',
  async (item) => {
    await axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/favorites/${item.id}`);
  }
);

const initialState = {
  favorite: [],
  status: 'loading',
  deleteStatus: 'loading',
  addStatus: 'loading',
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavorite(state, action) {
      state.favorite = action.payload;
    },
    addToFavorite(state, action) {
      state.favorite.push(action.payload);
    },
    deleteFromFavorite(state, action) {
      state.favorite = state.favorite.filter(obj => obj.title !== action.payload.title);
    },
  },
  extraReducers: {
    [fetchFavorite.pending]: (state) => {
      state.status = 'loading';
      state.favorite = [];
    },
    [fetchFavorite.fulfilled]: (state, action) => {
      state.favorite = action.payload;
      state.status = 'success';
    },
    [fetchFavorite.rejected]: (state) => {
      state.status = 'error';
      alert('Ошибка получения избранного');
      state.favorite = [];
    },
    //-------------------add-------------------
    [fetchAddToFavorite.pending]: (state) => {
      state.addStatus = 'loading';
    },
    [fetchAddToFavorite.fulfilled]: (state) => {
      state.addStatus = 'success';
    },
    [fetchAddToFavorite.rejected]: (state) => {
      state.addStatus = 'error';
      alert('Ошибка добавления в избранное');
      state.favorite = [];
    },
    //------------------delete------------------
    [fetchDeleteFromFavorite.pending]: (state) => {
      state.deleteStatus = 'loading';
    },
    [fetchDeleteFromFavorite.fulfilled]: (state) => {
      state.deleteStatus = 'success';
    },
    [fetchDeleteFromFavorite.rejected]: (state) => {
      state.deleteStatus = 'error';
      alert('Ошибка удаления из избранного');
      state.favorite = [];
    },
  },
});

export const { setFavorite, addToFavorite, deleteFromFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;