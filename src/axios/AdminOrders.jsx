import axiosInstance from "./config";
export const getAllOrders = () => {
  return axiosInstance.get(`orders/`);
};
