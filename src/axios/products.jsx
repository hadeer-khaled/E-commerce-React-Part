import axiosInstance from "./config.js";

export const getProducts = (page, limit) => {
  
  return axiosInstance.get(`products/?page=${page}&limit=${limit}`)
    .then((response) => {
      // console.log("Data:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};
