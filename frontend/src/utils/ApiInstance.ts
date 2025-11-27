import { BASE_URL } from "@/constant/ApiUrls";
import axios from "axios";

export const API =  axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});