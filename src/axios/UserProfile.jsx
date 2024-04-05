import axiosInstance from "./config";

export const getUserById = (userId) => {
  return axiosInstance.get(`/users/user/${userId}/`);
};
export const updateUserById = (userId, updatedUserData) => {
  console.log("From updateUserById Axios", updatedUserData);
  return axiosInstance.patch(`/users/user/${userId}/`, updatedUserData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// .get("https://dummyjson.com/users/search", {
//   params: { q: "John" },
//   headers: { Auth_token: "ajdflvblfmfofifvfgref" },
// })
