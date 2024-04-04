import axiosInstance from "./config";

export const getUserOrders = (userId) => {
  return axiosInstance.get(`orders/userorder/${userId}/`);
};
