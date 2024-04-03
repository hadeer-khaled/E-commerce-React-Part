import axiosInstance from "./config";

export const getUserById = (userId) => {
  return axiosInstance.get(`/users/user/${userId}/`);
};
// export const updateUserById = (userId) => {
//   return axiosInstance.patch(`/users/user/${userId}/`, {
//     // params: updatedUserData,
//     params: { first_name: "Hesham" },
//   });
// };

export const updateUserById = (userId, updatedUserData) => {
  return axiosInstance.patch(`/users/user/${userId}/`, updatedUserData);
};

// console.log(
//   `From updateUserById Axios: userId : ${userId} , updatedUserData: ${JSON.stringify(
//     updatedUserData
//   )} `
// );

// .get("https://dummyjson.com/users/search", {
//   params: { q: "John" },
//   headers: { Auth_token: "ajdflvblfmfofifvfgref" },
// })
