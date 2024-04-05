import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../../axios/products.jsx";

const initialState = {
  productList: [],
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
      const products = await getProducts();
      return products;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default productSlice.reducer;
