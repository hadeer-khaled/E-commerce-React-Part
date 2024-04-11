import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export const baseURL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({ baseURL });

export default axiosInstance;
