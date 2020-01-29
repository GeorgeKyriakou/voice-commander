import axios from "axios";
import promise from "promise";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function(config) {
    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken) {
      if (config.method !== "OPTIONS") {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  function(error) {
    return promise.reject(error);
  }
);

export default axiosInstance;
