import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export const baseURL = import.meta.env.VITE_BASE_URL

const axiosInstance = axios.create({ baseURL });

export default axiosInstance;
