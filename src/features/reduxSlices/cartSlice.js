import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  savedItems: [],
  cartItems: [],
  quantity: 0,
  shipping: 0,
  total: 0,
};

const getItemsFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cartItems");
  return storedCart ? JSON.parse(storedCart) : defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getItemsFromLocalStorage(),
  reducers: {
    saveItem(state, action) {
      const newProduct = action.payload;
      const existingProduct = state.savedItems.find(
        (product) => product._id === newProduct._id
      );

      if (!existingProduct) {
        state.savedItems.push(newProduct);
        localStorage.setItem("cartItems", JSON.stringify(state));
      }
    },
    removeSavedItem(state, action) {
      const productId = action.payload;
      const productIndex = state.savedItems.findIndex(
        (product) => product._id === productId
      );

      if (productIndex !== -1) {
        state.savedItems.splice(productIndex, 1);
        localStorage.setItem("cartItems", JSON.stringify(state));
      }
    },
    addItem(state, action) {
      const newProduct = action.payload;
      const existingProduct = state.cartItems.find(
        (product) => product._id === newProduct._id
      );

      if (!existingProduct) {
        state.cartItems.push(newProduct);
        state.quantity = state.cartItems.length;
        state.total += newProduct.price;
        localStorage.setItem("cartItems", JSON.stringify(state));
      }
    },
    removeItem(state, action) {
      const productId = action.payload._id;
      const productIndex = state.cartItems.findIndex(
        (product) => product._id === productId
      );

      if (productIndex !== -1) {
        const deletedProduct = state.cartItems[productIndex];
        state.cartItems.splice(productIndex, 1);
        state.quantity = state.cartItems.length;
        state.total -= deletedProduct.price;
        localStorage.setItem("cartItems", JSON.stringify(state));
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.quantity = 0;
      state.total = 0;
      state.shipping = 0;
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
    clearAll(state) {
      state.cartItems = [];
      state.savedItems = [];
      state.quantity = 0;
      state.total = 0;
      state.shipping = 0;
      localStorage.removeItem("cartItems");
    },
    setShipping(state, action) {
      state.shipping = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
  },
});

export const {
  saveItem,
  removeSavedItem,
  addItem,
  removeItem,
  clearCart,
  clearAll,
  setShipping,
} = cartSlice.actions;

export default cartSlice.reducer;

// Action Creators for Returning Status
export const saveItemWithStatus = (newProduct) => (dispatch, getState) => {
  const state = getState().cartReducer;
  const existingProduct = state.savedItems.find(
    (product) => product._id === newProduct._id
  );

  if (existingProduct) {
    return { status: "Error", message: "Item already exists" };
  }

  dispatch(saveItem(newProduct));
  return { status: "Success", message: "Item saved successfully" };
};

export const removeSavedItemWithStatus = (productId) => (dispatch, getState) => {
  const state = getState().cartReducer;
  const productIndex = state.savedItems.findIndex(
    (product) => product._id === productId
  );

  if (productIndex === -1) {
    return { status: "Error", message: "Item not found" };
  }

  dispatch(removeSavedItem(productId));
  return { status: "Success", message: "Item deleted successfully" };
};

export const addItemWithStatus = (newProduct) => (dispatch, getState) => {
  const state = getState().cartReducer;
  const existingProduct = state.cartItems.find(
    (product) => product._id === newProduct._id
  );

  if (existingProduct) {
    return { status: "Error", message: "Item already exists" };
  }

  dispatch(addItem(newProduct));
  return { status: "Success", message: "Item added to cart successfully" };
};

export const removeItemWithStatus = (productId) => (dispatch, getState) => {
  const state = getState().cartReducer;
  const productIndex = state.cartItems.findIndex(
    (product) => product._id === productId
  );

  if (productIndex === -1) {
    return { status: "Error", message: "Item not found in cart" };
  }

  dispatch(removeItem({ _id: productId }));
  return { status: "Success", message: "Item removed from cart successfully" };
};

export const clearCartWithStatus = () => (dispatch) => {
  dispatch(clearCart());
  return { status: "Success", message: "Cart cleared successfully" };
};

export const clearAllWithStatus = () => (dispatch) => {
  dispatch(clearAll());
  return { status: "Success", message: "All items cleared successfully" };
};
