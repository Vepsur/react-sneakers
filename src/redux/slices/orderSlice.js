import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  value: false,
  orders: [],
  lastOrderId: null,
  status: 'loading',
  createStatus: 'null',
  cancelStatus: 'null',
  completeStatus: 'null',
}

export const fetchOrders = createAsyncThunk(
  'orders/fetchStatus',
  async () => {
    const { data } = await axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/orders');
    return data;
  }
);

export const fetchCreateOrder = createAsyncThunk(
  'orders/fetchCreateStatus',
  async (items, thunkAPI) => {
    const { data } = await axios.post(`https://629f57ac8b939d3dc2959500.mockapi.io/orders`, { "items": items });
    thunkAPI.dispatch(setLastOrderId(data.id))
  }
);

export const fetchCancelOrder = createAsyncThunk(
  'orders/fetchCancelStatus',
  async (item) => {
    await axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/orders/${item.id}`);
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    addToOrders(state, action) {
      state.orders.push(action.payload);
    },
    deleteFromOrders(state, action) {
      state.orders = state.orders.filter(obj => obj.id !== action.payload.id);
    },
    setCompleteStatus(state, action) {
      state.completeStatus = action.payload;
    },
    setLastOrderId(state, action) {
      state.lastOrderId = action.payload;
    },
  },
  extraReducers: {
    [fetchOrders.pending]: (state) => {
      state.status = 'loading';
      state.orders = [];
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
      state.status = 'success';
    },
    [fetchOrders.rejected]: (state) => {
      state.status = 'error';
      state.orders = [];
      alert('Произошла ошибка при загрузке страницы заказов. Пожалуйста, обновите страницу или повторите позже.');
      console.log('Eror on load orders page');
    },
    //--------------create---------------
    [fetchCreateOrder.pending]: (state) => {
      state.createStatus = 'loading';
    },
    [fetchCreateOrder.fulfilled]: (state) => {
      state.createStatus = 'success';
    },
    [fetchCreateOrder.rejected]: (state) => {
      state.createStatus = 'error';
      state.completeStatus = 'error';
    },
    //---------------cancel----------------
    [fetchCancelOrder.pending]: (state) => {
      state.cancelStatus = 'loading';
    },
    [fetchCancelOrder.fulfilled]: (state) => {
      state.cancelStatus = 'success';
    },
    [fetchCancelOrder.rejected]: (state) => {
      state.cancelStatus = 'error';
    },
  },
})

export const { setOrders, addToOrders, deleteFromOrders, setCompleteStatus, setLastOrderId } = ordersSlice.actions;

export default ordersSlice.reducer;