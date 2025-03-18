import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

const initialData =
  // null;
  {
    user: null,
    token: null,
  };

const getDataFromLocalStorage = () => {
  // localStorage.setItem("user", JSON.stringify(initialData));
  try {
    return JSON.parse(localStorage.getItem("user")) || initialData;
  } catch (err) {
    console.error("Failed to parse Local Storage data:", err);
    return initialData;
  }
};

const initialState = getDataFromLocalStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(state));
    },
    dataUpdate: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginUser, logoutUser, dataUpdate } = userSlice.actions;

export default userSlice.reducer;
