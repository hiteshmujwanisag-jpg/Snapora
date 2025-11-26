import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { getItem } from "./storage";
import { BASE_URL } from "../constant/apiUrls";

const API =  axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});

API.interceptors.request.use(
  async (config) => {
    const token = await getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
