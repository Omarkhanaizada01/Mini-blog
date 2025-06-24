import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://mini-blog-us65.onrender.com",
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

