import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, getCategoryById } from "../../axios/categories.jsx";

const initialState = {
  categoryList: [],
  categoryDetail: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const getCategoriesThunk = createAsyncThunk(
  "categories/getCategories",
  async ({ page, limit, order, search, ...filters }) => {
    console.log("Categoriessss=======================================================================");
    const data = await getCategories({ page, limit, order, search, ...filters });
    return data;
  }
  );
  
  export const getCategoryByIdThunk = createAsyncThunk(
    "categories/getCategoryById",
    async ({ categoryId }) => {
      const data = await getCategoryById({ categoryId });
    return data;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload.categories;
        state.currentPage = action.payload.current_page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getCategoryByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategoryByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryDetail = action.payload;
      })
      .addCase(getCategoryByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
