import axiosInstance from "./config.js";

export const getProducts = ({ page, limit, order, search, ...filters }) => {
  let url = `products/?page=${page}&limit=${limit}`;
  
  // Add order and search parameters if provided
  if (order) {
    url += `&order=${order}`;
  }
  if (search) {
    url += `&search=${search}`;
  }

  // Add other filters
  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      url += `&${key}=${filters[key]}`;
    }
  }

  return axiosInstance.get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};

export const getProductById = ({ product_id }) => {

  let url = `products/${product_id}`;
  
  return axiosInstance.get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};

export const addProduct = (data) => {
  let url = `products`;
  
  return axiosInstance.post(url, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding product:", error);
      throw error;
    });
};

export const updateProductById = ({ product_id, data }) => {
  let url = `products/${product_id}`;
  
  return axiosInstance.put(url, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      throw error;
    });
};

export const deleteProductById = ({ product_id }) => {
  let url = `products/${product_id}`;
  
  return axiosInstance.delete(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
      throw error;
    });
};
