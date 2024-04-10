import axiosInstance from "./config";
export const getProductRatings = (productId) => {
  return axiosInstance.get(`/rating/?product_id=${productId}`);
};
export const setProductRating = (productId, UserId, rating) => {
  return axiosInstance.post(`/rating/`, {
    user_id: UserId,
    product_id: productId,
    rating: rating,
  });
};
