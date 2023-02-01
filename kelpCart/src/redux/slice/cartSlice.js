import { createSlice } from "@reduxjs/toolkit";

// 初始值
const initialState = {
  cartItem:
    localStorage.getItem("cartItem") ?
      JSON.parse(localStorage.getItem("cartItem")) :
      [''],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL:''
}

// 設定reducers
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItem.findIndex(
        (item) => (item.id === action.payload.id)
      );
      console.log(productIndex);
      // 已經有一個同樣的商品在購物車了
      if (productIndex >= 0) {

        state.cartItem[productIndex].cartQuantity += 1;

      } else {
        const temProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItem.push(temProduct);
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));

    },
    // 減少商品數量
    DECREASE_CART(state, action) {
      const productIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      )
      if (state.cartItem[productIndex].cartQuantity > 1) {
        state.cartItem[productIndex].cartQuantity -= 1
        console.log(state.cartItem[productIndex].cartQuantity);
      } else if (state.cartItem[productIndex].cartQuantity === 1) {
        const newStateCartItem = state.cartItem.filter(
          (item) => item.id !== action.payload.id
        )
        console.log(JSON.stringify(newStateCartItem));
        state.cartItem = newStateCartItem
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem))
    },
    // 刪除商品
    // RemoveFromCart
    REMOVE_FROM_CART(state, action) {
      const newStateCartItem = state.cartItem.filter(
        (item) => (item.id !== action.payload.id)
      );
      state.cartItem = newStateCartItem;
      localStorage.setItem("cart", JSON.stringify(state.cartItem))
    },
    // 清空購物車
    CLEAR_CART(state, action) {
      state.cartItem = [];
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem))
    },
    // 計算總金額
    CALCULATE_SUBTOTAL(state, action) {
      const array = [];
      state.cartItem.map(
        (item) => {
          const { price, cartQuantity } = item
          const cartItemPrice = price * cartQuantity
          return array.push(cartItemPrice)
        }
      )
      const totalPrice=array.reduce((acc, cur) => {
        return acc + cur
      })
      state.cartTotalAmount=totalPrice;
    },
    // 計算商品數量
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const quantityArray = [];
      state.cartItem.map(
        (item) => {
          const {  cartQuantity } = item;
          const quantity=cartQuantity
          quantityArray.push(quantity);
          
        }
      )
      const totalQuantity= quantityArray.reduce((acc, cur) => {
        return acc + cur
      })
      state.cartTotalQuantity=totalQuantity;
    },
    // 取得網址
    SAVE_URL(state, action) {
      state.previousURL=action.payload
      console.log(state.previousURL);
    }
  }
})

// 送出reducers

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL
} = cartSlice.actions;
export const selectCartItems = (state) => (state.cart.cartItem)
export const selectCartTotalQuantity = (state) => (state.cart.cartTotalQuantity);
export const selectCartTotalAmount = (state) => (state.cart.cartTotalAmount);
export const selectPreviousURL =(state)=>(state.cart.previousURL)

export default cartSlice.reducer;
