import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/reduxSlices/userSlice";
import cartReducer from "./features/reduxSlices/cartSlice";
import orderReducer from "./features/reduxSlices/orderSlice";

export const reduxConfig = configureStore({
  reducer: {
    userReducer: userReducer,
    cartReducer: cartReducer,
    orderReducer: orderReducer,
  },
});
