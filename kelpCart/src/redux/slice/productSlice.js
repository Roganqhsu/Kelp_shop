import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  maxPrice:0,
  minPrice:0,
}
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS: (state, action) => {
      const products = action.payload.products
      state.products = products
    },
    GET_PRICES_RANGE: (state, action) => {
      const { products } = action.payload;
      const array = [];
      products.map(
        (product)=>{
          array.push(product.price)
      })
      const max=Math.max(...array)
      const min=Math.min(...array)
      state.maxPrice = max
      state.minPrice = min
    }
  }
});

export const { STORE_PRODUCTS, GET_PRICES_RANGE } = productSlice.actions
export const selectProducts = (state) => state.product.products
export const selectMinPrice = (state) => state.product.minPrice;
export const selectMaxPrice = (state) => state.product.maxPrice;
export default productSlice.reducer