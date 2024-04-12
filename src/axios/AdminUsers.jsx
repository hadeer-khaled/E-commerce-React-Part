import axiosInstance from "./config";

export const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users/showUsers/');
      if (response) {
        console.log("from axios",response.data);
        return response.data;
      } else {
        console.log('Users not found');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };


  
  export const deleteUser = async (userId) => {
    try {
      const response = await axiosInstance.delete(`/users/deleteUsers/${userId}/`);
      console.log('User deleted:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error; 
    }
  };
  