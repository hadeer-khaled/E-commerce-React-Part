import axiosInstance from "./config";

export const fetchWishlistItems = async (userId) => {
  try {
    const response = await axiosInstance.get('/wishlist/', { params: { user_id: userId } });
    if (response) {
      console.log(response.data);
      console.log(response.data[0].products);
      return response.data[0].products;
    } else {
      console.log("not found");
    }
  } catch (error) {
    console.error('Error fetching wishlist items:', error);
    throw error; // Propagate the error
  }
};

export const removeProductFromWishlist = async (userId, productId) => {
    try {
      const response = await axiosInstance.delete('/wishlist/wishlist/remove/', {
        data: {
          user_id: userId,
          product_id: productId
        }
      });
      console.log('Product removed from wishlist:', response.data);
      return response.data; // Return response data if needed
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      throw error; // Propagate the error
    }
  };
  