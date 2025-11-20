import axios from "axios";
import { getToken, clearToken } from "../auth/token";

const instance = axios.create({
  baseURL: "https://poolgameapi.com/api/v2",
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    if (!config.headers) {
      config.headers = {}; // initialize if missing
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      clearToken();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default instance;
