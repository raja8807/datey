import axios from "axios";

const API = axios.create({
  baseURL: "url", // Replace with your backend URL
  timeout: 10000,
});

// Optional: attach token if using auth
API.interceptors.request.use(async (config) => {
  const token = ""; // get from storage if needed
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
