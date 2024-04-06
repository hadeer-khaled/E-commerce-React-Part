import axiosInstance from "./config";

export const fetchShoppingCartItems = async (userId) => {
  try {
    const response = await axiosInstance.get('/cartItem/view-cart/', { params: { user_id: userId } });
    if (response) {
      console.log(response.data);
      return response.data;
    } else {
      console.log("not found");
    }
  } catch (error) {
    console.error('Error fetching shopping cart items:', error);
    throw error; 
  }
};
