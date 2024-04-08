import axiosInstance from "./config";
export const getAllOrders = () => {
  return axiosInstance.get(`orders/`);
};
export const getOrderItems = (orderId) => {
  return axiosInstance.get(`orders/order/${orderId}/order_items`);
};

// getOrderItems(1)
//   .then((response) => {
//     const orders = response.data;
//     console.log("Orders items:", orders);
//   })
//   .catch((error) => {
//     console.error("Error fetching orders:", error);
//   });
