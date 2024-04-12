import axiosInstance from "./config";

export const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/categories/');
      if (response) {
        console.log("from axios",response.data);
        return response.data;
      } else {
        console.log('Categories not found');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };

export const addCategory = async (categoryName) => {
    try {
      const response = await axiosInstance.post('/categories/add/',{
        name:categoryName
      });
      console.log('Category added:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Error adding category:', error);
      throw error; 
    }
  };
  export const deleteCategory = async (categoryId) => {
    try {
      const response = await axiosInstance.delete(`/categories/delete/${categoryId}/`);
      console.log('Category deleted:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error; 
    }
  };
  