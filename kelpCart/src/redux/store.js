import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productSlice from "./slice/productSlice";
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";
import CheckoutReducer from "./slice/checkoutSlice";
// import orderReducer from "./slice/orderSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productSlice,
  filter: filterReducer,
  cart:cartReducer,
  checkout:CheckoutReducer
  // orders: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
  //middleware中介軟體 :　
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // 可序列化：false      
      serializableCheck: false,
    }),
});

export default store;
