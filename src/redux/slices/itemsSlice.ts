import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export type Item = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface ItemsSliceState {
  items: Item[];
  itemsRespStatus: Status;
}

export const fetchSneakers = createAsyncThunk<Item[], string>(
  'sneakers/fetchSneakersStatus',
  async (search) => {
    const { data } = await axios.get<Item[]>(`https://629f57ac8b939d3dc2959500.mockapi.io/items${search}`);

    return data;
  }
)

const initialState: ItemsSliceState = {
  items: [],
  itemsRespStatus: Status.LOADING,
}

export const sneakersSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSneakers.pending, (state) => {
      state.itemsRespStatus = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchSneakers.fulfilled, (state, action) => {
      state.items = action.payload;
      state.itemsRespStatus = Status.SUCCESS;
    });

    builder.addCase(fetchSneakers.rejected, (state) => {
      state.itemsRespStatus = Status.ERROR;
      state.items = [];
    });
  }
})

export const { setItems } = sneakersSlice.actions;

export default sneakersSlice.reducer;