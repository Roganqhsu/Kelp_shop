import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistoryItem: [],
  orderTotalAmount: "",
}

const OrderHistorySlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    STORE_ORDER(state, action) {
      state.orderHistoryItem = action.payload;
    },
    ORDER_AMOUNT(state, action) {
      const array = [];
      state.orderHistoryItem.map((item) => {
        const { orderAmount } = item;
        return array.push(orderAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.orderTotalAmount = totalAmount;
    }
  }
})

export const { STORE_ORDER, ORDER_AMOUNT } = OrderHistorySlice.actions

export const selectOrderHistoryItem = (state) => state.orders.orderHistoryItem
export const selectOrderHistoryAmount = (state) => state.orders.orderTotalAmount
export default OrderHistorySlice.reducer