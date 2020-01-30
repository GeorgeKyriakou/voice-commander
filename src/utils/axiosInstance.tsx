import axios from "axios";
import promise from "promise";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  function(config) {

    const accessToken = sessionStorage.getItem("accessToken");
    const grantedOn = +sessionStorage.getItem("grantedOn")!;
    const anHourInTheFuture = new Date().getTime();
    const hasExpired =
      Math.abs(grantedOn - anHourInTheFuture) / 1000 / 3600 > 1;

    if (accessToken && !hasExpired) {
      if (config.method !== "OPTIONS") {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } else {
      return promise.reject('Token has expired');  
    }
    return config;
  },
  function(error) {
    return promise.reject(error);
  }
);

export default axiosInstance;
