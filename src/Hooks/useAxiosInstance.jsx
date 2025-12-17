import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: `https://style-decor-server-beige.vercel.app`,
});

const useAxiosInstance = () => {
  return axiosInstance;
};

export default useAxiosInstance;
