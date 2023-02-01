import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  shippingAddress:{},
  billingAddress:{},
}
const CheckoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS(state, action) {
      state.shippingAddress = action.payload

    },
    SAVE_BILLING_ADDRESS(state, action) {
      console.log(action.payload);
      state.billingAddress = action.payload
    }
  }
})

export const {
  SAVE_SHIPPING_ADDRESS,
  SAVE_BILLING_ADDRESS
} = CheckoutSlice.actions;

export const  selectShippingAddress  = (state) => state.checkout.shippingAddress;
export const  selectBillingAddress  = (state) => state.checkout.billingAddress;

export default CheckoutSlice.reducer
