import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getProductById, updateProductById, deleteProductById, addProduct } from "../../axios/products.jsx";

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
  async ({ product_id }) => {
    const data = await getProductById({ product_id });
    return data;
  }
);

export const updateProductByIdThunk = createAsyncThunk(
  "products/updateProductById",
  async ({ product_id, data }) => {
    const response = await updateProductById({ product_id, data });
    return { product_id, data: response };
  }
);

export const deleteProductByIdThunk = createAsyncThunk(
  "products/deleteProductById",
  async ({ product_id }) => {
    await deleteProductById({ product_id });
    return product_id;
  }
);

export const addProductThunk = createAsyncThunk(
  "products/addProduct",
  async (productData) => {
    const data = await addProduct(productData);
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
      })
      .addCase(updateProductByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProductByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the product in the productList with the updated data
        state.productList = state.productList.map(product => {
          if (product.product_id === action.payload.product_id) {
            return { ...product, ...action.payload.data };
          }
          return product;
        });
      })
      .addCase(updateProductByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProductByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProductByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove the deleted product from the productList
        state.productList = state.productList.filter(product => product.product_id !== action.payload);
      })
      .addCase(deleteProductByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addProductThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the new product to the productList
        state.productList.push(action.payload);
      })
      .addCase(addProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
