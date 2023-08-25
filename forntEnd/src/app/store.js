import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../pages/Product/ProductSlice";
import authReducer from "../pages/auth/authSlice";
import cartReducer from "../pages/Cart/CartSlice";
import orderReducer from "../pages/Order/orderSlice";
import userReducer from "../pages/User/userSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
