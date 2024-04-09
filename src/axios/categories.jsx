import axiosInstance from "./config.js";

export const getCategories = ({ page, limit, order, search, ...filters }) => {
  let url = `categories/?page=${page}&limit=${limit}`;
  
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

export const getCategoryById = ({ categoryId }) => {
  let url = `categories/${categoryId}`;
  
  return axiosInstance.get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data by Id:", error);
      throw error;
    });
};
