import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWishlistItems } from '../../axios/UserWishlist';


export const fetchWishlistItemsThunk = createAsyncThunk(
  'wishlist/fetchWishlistItems',
  async (userId) => {
      const wishlistResponse = await fetchWishlistItems(userId);
      console.log(wishlistResponse);
      return wishlistResponse;
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlistItems: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistItemsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlistItemsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("inside reducer",action.payload);
        state.wishlistItems = action.payload;
      })
      .addCase(fetchWishlistItemsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default wishlistSlice.reducer;
