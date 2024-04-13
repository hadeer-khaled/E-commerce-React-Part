import axiosInstance from "./config";


export const userLogin = (values) => {
  return axiosInstance.post("/users/login/", values);
};

export const userLogout = () => {
  return axiosInstance.post("/users/logout/", { withCredentials: true });
};

export const userRegister = (values) => {
  return axiosInstance.post("/users/register/", values);
};
