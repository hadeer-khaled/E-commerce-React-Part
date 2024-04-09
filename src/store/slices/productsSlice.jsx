import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getProductById } from "../../axios/products.jsx";

const initialState = {
  productList: [],
  productDetail: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const getProductsThunk = createAsyncThunk(
  "products/getProducts",
  async ({ page, limit, order, search, ...filters }) => {
    const data = await getProducts({ page, limit, order, search, ...filters });
    return data;
  }
);

export const getProductByIdThunk = createAsyncThunk(
  "products/getProductById",
  async ({ productId }) => {
    const data = await getProductById({ productId });
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.products;
        state.currentPage = action.payload.current_page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getProductByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetail = action.payload;
      })
      .addCase(getProductByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
