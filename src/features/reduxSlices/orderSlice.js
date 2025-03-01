import { createSlice } from "@reduxjs/toolkit";

// Default initial data if Local Storage is empty
const initialData = {
  orders: [],
};

const getDataFromLocalStorage = () => {
  try {
    // Replace 'yourDataKey' with the key name used in Local Storage
    return JSON.parse(localStorage.getItem("order")) || initialData;
  } catch (err) {
    console.error("Failed to parse Local Storage data:", err);
    return initialData;
  }
};

// Initial state for the slice
const initialState = {
  // Replace 'data' with your desired state property name
  data: getDataFromLocalStorage(),
};

const orderSlice = createSlice({
  // Replace 'yourSliceName' with a descriptive name for your slice
  name: "order",
  initialState,
  reducers: {
    // Add your actions here
    setOrders: (state, action) => {
      state.data.orders = [...state.data.orders, action.payload];
      localStorage.setItem("order", JSON.stringify(state.data));
    },
  },
});

// Export the actions created by the slice
export const { setOrders } = orderSlice.actions;

export default orderSlice.reducer;
