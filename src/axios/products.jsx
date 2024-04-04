import axiosInstance from "./config.js";

export const getProducts = () => {
  return axiosInstance.get("products")
    .then((response) => {
      console.log("Data:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};
