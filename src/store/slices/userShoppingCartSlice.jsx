import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShoppingCartItems } from '../../axios/userShoppingCart';

export const fetchShoppingCartItemsThunk = createAsyncThunk(
  'cartItem/fetchShoppingCartItems',
  async (userId) => {
    const cartResponse = await fetchShoppingCartItems(userId);
    console.log("cartResponse",cartResponse)
    return cartResponse;
  }
);

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: {
    cartItems: [],
    cartItemsCount: 0,
    totalQuantity: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingCartItemsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShoppingCartItemsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload;
        console.log("inside action", state.cartItems)
        state.cartItemsCount = action.payload.cart_items_count;
        state.totalQuantity = action.payload.total_quantity;
      })
      .addCase(fetchShoppingCartItemsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default shoppingCartSlice.reducer;
