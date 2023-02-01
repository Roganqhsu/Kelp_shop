import { createSlice } from "@reduxjs/toolkit"
// 初始值
const initialState = {
  filteredProducts: []
}
//  
const filterSlice = createSlice(
  {
    name: "filter",
    initialState: initialState,
    reducers: {
      FILTER_BY_SEARCH: (state, action) => {
        const { products, search } = action.payload
        const temProducts = products.filter(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        state.filteredProducts = temProducts
      },
      SORT_PRODUCT: (state, action) => {
        const { products, sort } = action.payload
        let temProducts = [];
        if (sort === "Latest") {
          temProducts = products;
        }
        if (sort === "Highest Price") {
          temProducts = products.slice().sort(
            (a, b) => {
              return (
                b.price - a.price
              )
            }
          )
        }
        if (sort === "Lowest Price") {
          temProducts = products.slice().sort(
            (a, b) => {
              return (
                a.price - b.price
              )
            }
          )
        }
        if (sort === "A - Z") {
          temProducts = products.slice().sort(
            (a, b) => {
              return (
                a.name.localeCompare(b.name)
              )
            }
          )
        }
        if (sort === "Z - A") {
          temProducts = products.slice().sort(
            (a, b) => {
              return (
                b.name.localeCompare(a.name)
              )
            }
          )
        }
        state.filteredProducts = temProducts
      },
      // 搜尋種類
      FILTER_BY_CATEGORY: (state, action) => {
        const { products, category } = action.payload
        let temProducts = [];
        if (category == "All") {
          temProducts = products
        }
        if (category != "All") {
          temProducts = products.filter(
            (product) => (
              product.category === category
            )
          )
        }
        state.filteredProducts = temProducts
      },
      // 搜尋品牌
      FILTER_BY_BRAND: (state, action) => {
        const { products, brand } = action.payload
        let temProducts = [];
        if (brand == "All") {
          temProducts = products
        } else {
          temProducts = products.filter(
            (product) => product.brand === brand
          )
        }
        state.filteredProducts = temProducts
      },
      // 依價格搜尋
      FILTER_BY_PRICE: (state, action) => {
        const { products, price } = action.payload;
        let temProducts=[];
        temProducts=products.filter(product => product.price<= price)
        state.filteredProducts = temProducts
      }
    }
  }
)

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCT,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE
} = filterSlice.actions;
export const selectFilterProducts = (state) => state.filter.filteredProducts
export default filterSlice.reducer;