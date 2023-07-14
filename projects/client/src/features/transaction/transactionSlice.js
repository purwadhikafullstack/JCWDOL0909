import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "order",
  initialState: {
    orderId: null,
    transactionDate: "",
    totalPrice: 0,
  },
  reducers: {
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    setTransactionDate: (state, action) => {
      state.transactionDate = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    resetTransaction: (state) => {
      state.orderId = null;
      state.transactionDate = "";
      state.totalPrice = 0;
    },
  },
});

export const {
  setOrderId,
  setTransactionDate,
  setTotalPrice,
  resetTransaction,
} = transactionSlice.actions;
export default transactionSlice.reducer;
