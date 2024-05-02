// axiosInstance.js

import axios from "axios";
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: "http://18.224.166.225:8000",
  withCredentials: true,
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
  },
});

export default axiosInstance;
