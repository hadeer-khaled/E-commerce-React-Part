import axiosInstance from "./config";

// axiosInstance.defaults.xsrfCookieName = "csrftoken";
// axiosInstance.defaults.xsrfHeaderName = "X-CSRFToken";
// axiosInstance.defaults.withCredentials = true;

export const getUserById = (userId) => {
  return axiosInstance.get(`/users/user/${userId}/`);
};

// .get("https://dummyjson.com/users/search", {
//   params: { q: "John" },
//   headers: { Auth_token: "ajdflvblfmfofifvfgref" },
// })
