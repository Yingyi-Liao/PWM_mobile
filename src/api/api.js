import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../auth/AuthContext";
import { useContext } from "react";

const api = axios.create({
  baseURL: "http://CL-YL:5000/api",
});

// Request interceptor
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      await SecureStore.deleteItemAsync("jwt");
    }
    return Promise.reject(err);
  }
);

export default api;
